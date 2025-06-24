import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
  PaperClipIcon,
  CurrencyDollarIcon,
  BoltIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Virtual Deal Room Platform
          </h1>
          <p className="text-xl sm:text-2xl mb-10 opacity-90">
            Secure, real-time negotiations for buyers and sellers with document sharing and payment integration
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white text-indigo-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center justify-center"
            >
              Get Started <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => navigate('/demo')}
              className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Live Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Powerful Deal Management</h2>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Everything you need to negotiate, collaborate, and close deals securely
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Real-time Negotiation</h3>
            <p className="text-gray-600">
              Communicate instantly with counterparties through our integrated chat system with read receipts and typing indicators.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <LockClosedIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Bank-grade Security</h3>
            <p className="text-gray-600">
              End-to-end encrypted document sharing with permission controls and audit trails for all activities.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <PaperClipIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Document Vault</h3>
            <p className="text-gray-600">
              Securely upload, organize, and share due diligence materials with version control and watermarking.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <CurrencyDollarIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Payment Integration</h3>
            <p className="text-gray-600">
              Optionally close deals with integrated payments through Stripe or Razorpay with escrow services available.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <BoltIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Instant Notifications</h3>
            <p className="text-gray-600">
              Get real-time alerts for deal activity, messages, and document updates across all your devices.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">NDA Protection</h3>
            <p className="text-gray-600">
              Built-in NDA templates and e-signature capabilities to protect sensitive discussions and documents.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to transform your deal process?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join leading companies who are closing deals faster and more securely with our platform.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 inline-flex items-center"
          >
            Create Free Account <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
          <p className="mt-4 text-gray-600">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Virtual Deal Room</h3>
            <p className="text-gray-400">
              Secure platform for modern deal negotiations and closings.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Virtual Deal Room. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;