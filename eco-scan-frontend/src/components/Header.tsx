import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">EcoScan</h1>
          </NavLink>
          
          <nav className="flex space-x-6">
            <NavLink
              to="/scan"
              className={({ isActive }) =>
                `text-gray-600 hover:text-emerald-600 transition-colors ${
                  isActive ? 'text-emerald-600 font-medium' : ''
                }`
              }
            >
              Scan Item
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `text-gray-600 hover:text-emerald-600 transition-colors ${
                  isActive ? 'text-emerald-600 font-medium' : ''
                }`
              }
            >
              History
            </NavLink>
            <NavLink
              to="/rewards"
              className={({ isActive }) =>
                `text-gray-600 hover:text-emerald-600 transition-colors ${
                  isActive ? 'text-emerald-600 font-medium' : ''
                }`
              }
            >
              Rewards
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}