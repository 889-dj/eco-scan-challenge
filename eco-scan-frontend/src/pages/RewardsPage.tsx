import Offers from '../components/Offers';

export default function RewardsPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Your Eco Rewards
      </h2>
      <Offers />
    </div>
  );
}