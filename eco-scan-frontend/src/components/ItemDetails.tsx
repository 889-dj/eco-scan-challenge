import React from 'react';
import { Droplets, Leaf, Recycle } from 'lucide-react';

interface ItemDetailsProps {
  item: {
    name: string;
    carbonScore: number;
    waterUsage: number;
    recyclable: boolean;
    ecoPoints: number;
    imageUrl?: string;
  };
}

export default function ItemDetails({ item }: ItemDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{item.name}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-500">Carbon Score</p>
              <p className="font-semibold text-gray-900">{item.carbonScore} kg CO₂</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Water Usage</p>
              <p className="font-semibold text-gray-900">{item.waterUsage}L</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Recycle className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-500">Recyclable</p>
              <p className="font-semibold text-gray-900">
                {item.recyclable ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 flex items-center justify-center">
              <span className="text-lg">🌟</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Eco Points</p>
              <p className="font-semibold text-gray-900">{item.ecoPoints} points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}