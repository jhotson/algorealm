import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import Stripe from 'stripe';

const app = express();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'your_stripe_key');

app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// User routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2),
      role: z.enum(['developer', 'customer']),
    });

    const { email, password, name, role } = schema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret'
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret'
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Algorithm routes
app.get('/api/algorithms', async (req, res) => {
  try {
    const algorithms = await prisma.algorithm.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json(algorithms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/algorithms', authenticateToken, async (req, res) => {
  try {
    const schema = z.object({
      title: z.string().min(3),
      description: z.string().min(10),
      price: z.number().positive(),
      category: z.string(),
      language: z.string(),
      complexity: z.string(),
      type: z.enum(['sale', 'lease', 'subscription']),
      tags: z.array(z.string()),
    });

    const algorithmData = schema.parse(req.body);
    
    const algorithm = await prisma.algorithm.create({
      data: {
        ...algorithmData,
        authorId: req.user.id,
      },
    });

    res.json(algorithm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Purchase routes
app.post('/api/purchase', authenticateToken, async (req, res) => {
  try {
    const { algorithmId, type } = req.body;
    
    const algorithm = await prisma.algorithm.findUnique({
      where: { id: algorithmId },
      include: { author: true },
    });

    if (!algorithm) {
      return res.status(404).json({ error: 'Algorithm not found' });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: algorithm.price * 100, // Stripe expects amounts in cents
      currency: 'usd',
      metadata: {
        algorithmId,
        buyerId: req.user.id,
        type,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});