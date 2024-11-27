import React, { useState } from 'react';
import { Search, Upload, User, ShoppingCart, Menu, LogOut } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './auth/AuthModal';
import UploadForm from './upload/UploadForm';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { data: user } = useUser();
  const { logout } = useAuth();

  return (
    <>
      <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                AlgoMarket
              </span>
            </div>

            <div className="hidden md:flex items-center flex-1 mx-8">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search algorithms..."
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {user.role === 'developer' && (
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                      <Upload size={20} />
                      <span>Upload</span>
                    </button>
                  )}
                  <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                    <ShoppingCart size={20} />
                  </button>
                  <div className="relative group">
                    <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                      <User size={20} />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                      <div className="px-4 py-2 text-sm text-gray-700">
                        {user.name}
                      </div>
                      <button
                        onClick={logout}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Sign in
                </button>
              )}
            </div>

            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      {isUploadModalOpen && <UploadForm onClose={() => setIsUploadModalOpen(false)} />}
    </>
  );
}