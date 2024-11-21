import React from 'react';
import { History, TrendingDown, Coins, Award } from 'lucide-react';

interface ScanHistoryItem {
  id: string;
  name: string;
  date: string;
  carbonSaved: number;
  moneySaved: number;
  imageUrl: string;
  ecoPoints: number;
}

export default function ScanHistory() {
  // Mock data - in production this would come from an API
  const scanHistory: ScanHistoryItem[] = [
    {
      id: '1',
      name: 'Organic Cotton T-Shirt',
      date: '2024-03-15',
      carbonSaved: 2.5,
      moneySaved: 250,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800',
      ecoPoints: 50
    },
    {
      id: '2',
      name: 'Recycled Denim Jeans',
      date: '2024-03-14',
      carbonSaved: 4.2,
      moneySaved: 500,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800',
      ecoPoints: 75
    },
    {
      id: '3',
      name: 'Sustainable Wool Sweater',
      date: '2024-03-13',
      carbonSaved: 3.8,
      moneySaved: 600,
      imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800',
      ecoPoints: 65
    }
  ];

  const totalImpact = {
    carbonSaved: scanHistory.reduce((sum, item) => sum + item.carbonSaved, 0),
    moneySaved: scanHistory.reduce((sum, item) => sum + item.moneySaved, 0),
    totalPoints: scanHistory.reduce((sum, item) => sum + item.ecoPoints, 0)
  };

  return (
    <div className="space-y-8">
      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Total Carbon Saved</p>
              <p className="text-3xl font-bold mt-2">{totalImpact.carbonSaved.toFixed(1)} kg</p>
            </div>
            <TrendingDown className="h-10 w-10 text-emerald-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Savings</p>
              <p className="text-3xl font-bold mt-2">₹{totalImpact.moneySaved}</p>
            </div>
            <Coins className="h-10 w-10 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Eco Points</p>
              <p className="text-3xl font-bold mt-2">{totalImpact.totalPoints} pts</p>
            </div>
            <Award className="h-10 w-10 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Scan History */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-900">Scan History</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {scanHistory.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500">Carbon Saved</p>
                    <p className="font-semibold text-emerald-600">{item.carbonSaved} kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Money Saved</p>
                    <p className="font-semibold text-blue-600">₹{item.moneySaved}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Eco Points</p>
                    <p className="font-semibold text-purple-600">{item.ecoPoints} pts</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}