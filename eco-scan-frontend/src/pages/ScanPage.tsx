import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ItemDetails from '../components/ItemDetails';

interface ScanResult {
  name: string;
  carbonScore: number;
  waterUsage: number;
  recyclable: boolean;
  ecoPoints: number;
  imageUrl?: string;
}

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setLoading(true);

    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append('file', file);

      // Send the image to the API
      const response = await fetch('http://localhost:5001/api/scan', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image and fetch scan results');
      }

      // Parse the response
      const data = await response.json();

      // Update the scan result
      setScanResult({
        name: data.name || 'Unknown Item',
        carbonScore: data.carbonScore || 0,
        waterUsage: data.waterUsage || 0,
        recyclable: data.recyclable || false,
        ecoPoints: data.ecoPoints || 0,
        imageUrl: data.imageUrl || URL.createObjectURL(file), // Use uploaded image URL
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to fetch scan results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Scan Your Clothing
        </h2>
        <ImageUploader onImageUpload={handleImageUpload} />
        {loading && <p className="text-blue-500 mt-4">Uploading image...</p>}
      </section>

      {scanResult && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Scan Results
          </h2>
          <ItemDetails item={scanResult} />
        </section>
      )}
    </div>
  );
}
