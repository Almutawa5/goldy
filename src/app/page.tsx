'use client';
import { useState } from 'react';
import { 
  ScaleIcon, 
  CalculatorIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

export default function GoldCalculator() {
  const [goldPrice, setGoldPrice] = useState<number>(0);
  const [piecePrice, setPiecePrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState(false);

  // Calculations
  const calculate = () => {
    setIsCalculated(true);
  };

  const tax = piecePrice * 0.10;
  const priceWithoutTax = piecePrice - tax;
  const goldPriceWithoutManufacturing = goldPrice * weight;
  const totalManufacturingPrice = priceWithoutTax - goldPriceWithoutManufacturing;
  const manufacturingPricePerGram = weight > 0 ? totalManufacturingPrice / weight : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-amber-600 p-6 text-white">
            <div className="flex items-center justify-center space-x-3">
              <CalculatorIcon className="h-8 w-8" />
              <h1 className="text-3xl font-bold">حاسبة الذهب</h1>
            </div>
          </div>

          <div className="p-8 space-y-8" dir="rtl">
            {/* Input Fields */}
            <div className="space-y-6">
              <InputField
                icon={<CurrencyDollarIcon className="h-5 w-5 text-amber-600" />}
                label="سعر الذهب اليوم"
                value={goldPrice}
                onChange={(e) => setGoldPrice(Number(e.target.value))}
                unit="د.ب"
              />

              <InputField
                icon={<ArrowTrendingUpIcon className="h-5 w-5 text-amber-600" />}
                label="سعر القطعة"
                value={piecePrice}
                onChange={(e) => setPiecePrice(Number(e.target.value))}
                unit="د.ب"
              />

              <InputField
                icon={<ScaleIcon className="h-5 w-5 text-amber-600" />}
                label="الوزن"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                unit="جرام"
              />

              <button
                onClick={calculate}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
              >
                <SparklesIcon className="h-5 w-5" />
                <span>احسب</span>
              </button>
            </div>

            {/* Results Section */}
            {isCalculated && (
              <div className="space-y-4 animate-fade-in">
                <ResultCard label="سعر الضريبة (10%)" value={tax} />
                <ResultCard label="سعر القطعة بدون ضريبة" value={priceWithoutTax} />
                <ResultCard label="سعر الذهب بدون مصنعية" value={goldPriceWithoutManufacturing} />
                <ResultCard label="سعر المصنعية الإجمالي" value={totalManufacturingPrice} />
                <ResultCard label="سعر المصنعية للجرام" value={manufacturingPricePerGram} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
}

function InputField({ icon, label, value, onChange, unit }: InputFieldProps) {
  return (
    <div className="relative">
      <label className="block text-amber-800 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 pl-3 flex items-center pr-3">
          {icon}
        </div>
        <input
          type="number"
          className="w-full pl-3 pr-12 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
          value={value || ''}
          onChange={onChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <span className="text-gray-500">{unit}</span>
        </div>
      </div>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: number;
}

function ResultCard({ label, value }: ResultCardProps) {
  return (
    <div className="bg-amber-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <span className="font-bold text-amber-900">{label}</span>
        <span className="text-amber-800 font-semibold">{value.toFixed(3)} د.ب</span>
      </div>
    </div>
  );
}