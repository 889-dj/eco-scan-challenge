import React, { useState } from 'react';
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

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setScanResult({
        name: "Cotton T-Shirt",
        carbonScore: 2.5,
        waterUsage: 2700,
        recyclable: true,
        ecoPoints: 50,
        imageUrl: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Scan Your Clothing
        </h2>
        <ImageUploader onImageUpload={handleImageUpload} />
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