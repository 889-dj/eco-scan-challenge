import React, { useEffect, useState } from 'react';
import { Tag, ArrowRight, Leaf } from 'lucide-react';

interface Offer {
  id: number;
  title: string;
  description: string;
  pointsCost: number;
  carbonScore: number;
  discount: string;
}

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 1,
      title: "Eco-friendly Store Discount",
      description: "Get 20% off on sustainable fashion items",
      pointsCost: 500,
      carbonScore: 0, // Placeholder for dynamic data
      discount: "20% OFF",
    },
    {
      id: 2,
      title: "Recycling Bonus",
      description: "Double points on your next recycled item scan",
      pointsCost: 300,
      carbonScore: 0, // Placeholder for dynamic data
      discount: "2X POINTS",
    },
    {
      id: 3,
      title: "Premium Brand Voucher",
      description: "₹1000 off on sustainable premium brands",
      pointsCost: 1000,
      carbonScore: 0, // Placeholder for dynamic data
      discount: "₹1000 OFF",
    },
  ]);

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/offers`);
        if (!response.ok) {
          throw new Error('Failed to fetch offer data');
        }

        const fetchedData = await response.json();

        // Update offers array with fetched data
        const updatedOffers = offers.map((offer, index) => {
          const fetchedOffer = fetchedData[index]; // Assuming the backend returns data in the same order
          return {
            ...offer,
            carbonScore: fetchedOffer.carbonSaved || offer.carbonScore, // Update carbonScore
            pointsCost: fetchedOffer.rewardPoints || offer.pointsCost, // Update pointsCost
          };
        });

        setOffers(updatedOffers);
      } catch (error:any) {
        console.error('Error fetching offer data:', error.message);
      }
    };

    fetchOfferData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Available Rewards</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Tag className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {offer.title}
                  </h3>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {offer.discount}
                </span>
              </div>

              <p className="mt-2 text-gray-600">{offer.description}</p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-emerald-700">
                    <Leaf className="h-4 w-4" />
                    <span>Carbon Impact:</span>
                  </div>
                  <span className="font-medium text-emerald-700">
                    {offer.carbonScore} kg CO₂
                  </span>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-sm text-gray-500">
                    {offer.pointsCost} points required
                  </span>
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors">
                    Redeem
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
