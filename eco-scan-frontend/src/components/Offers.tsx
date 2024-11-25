/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Tag, ArrowRight, Leaf } from 'lucide-react';
import {Toaster,toast} from 'react-hot-toast';

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
      carbonScore: 20,
      discount: "20% OFF",
    },
    {
      id: 2,
      title: "Recycling Bonus",
      description: "Double points on your next recycled item scan",
      pointsCost: 300,
      carbonScore: 75,
      discount: "2X POINTS",
    },
    {
      id: 3,
      title: "Premium Brand Voucher",
      description: "₹1000 off on sustainable premium brands",
      pointsCost: 1000,
      carbonScore: 40, // Placeholder for dynamic data
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
        console.log("fetched data",fetchedData)

        // Update offers array with fetched data
        const updatedOffers = offers.map((offer) => {
          // const fetchedOffer = fetchedData[index];
          return {
            ...offer,
            carbonScore: offer.carbonScore, 
            pointsCost: offer.pointsCost, 
          };
        });

        setOffers(updatedOffers);
      } catch (error:any) {
        console.error('Error fetching offer data:', error.message);
      }
    };

    fetchOfferData();
  }, []);

  
  const redeemOffer = async (offerId: number) => {
    try {
      const response = await fetch(`http://localhost:5001/api/offers/redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offerId }),
      });

      const data = await response.json();
      // console.log(data)

      if (response.ok) {
        toast.success(data.message || 'Offer redeemed successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error(data.message || 'Failed to redeem offer.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      toast.error('An error occurred while redeeming the offer.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Error redeeming offer:', error.message);
    }
  };


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
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                  onClick={() => redeemOffer(offer.id)}>
                    Redeem
                    <Toaster/>
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
