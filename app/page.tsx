'use client'

import { useState, useMemo } from 'react'

interface Car {
  id: number
  brand: string
  model: string
  year: number
  price: number
  image: string
  priceHistory: { date: string; price: number }[]
}

const luxuryCars: Car[] = [
  {
    id: 1,
    brand: 'Rolls-Royce',
    model: 'Phantom',
    year: 2024,
    price: 460000,
    image: '🚗',
    priceHistory: [
      { date: '2024-01', price: 455000 },
      { date: '2024-06', price: 458000 },
      { date: '2024-11', price: 460000 },
    ],
  },
  {
    id: 2,
    brand: 'Bentley',
    model: 'Continental GT',
    year: 2024,
    price: 230000,
    image: '🚙',
    priceHistory: [
      { date: '2024-01', price: 225000 },
      { date: '2024-06', price: 228000 },
      { date: '2024-11', price: 230000 },
    ],
  },
  {
    id: 3,
    brand: 'Ferrari',
    model: '296 GTB',
    year: 2024,
    price: 320000,
    image: '🏎️',
    priceHistory: [
      { date: '2024-01', price: 310000 },
      { date: '2024-06', price: 315000 },
      { date: '2024-11', price: 320000 },
    ],
  },
  {
    id: 4,
    brand: 'Lamborghini',
    model: 'Huracan',
    year: 2024,
    price: 270000,
    image: '🏁',
    priceHistory: [
      { date: '2024-01', price: 265000 },
      { date: '2024-06', price: 268000 },
      { date: '2024-11', price: 270000 },
    ],
  },
  {
    id: 5,
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    price: 230000,
    image: '🚗',
    priceHistory: [
      { date: '2024-01', price: 225000 },
      { date: '2024-06', price: 228000 },
      { date: '2024-11', price: 230000 },
    ],
  },
  {
    id: 6,
    brand: 'McLaren',
    model: '720S',
    year: 2024,
    price: 310000,
    image: '🏎️',
    priceHistory: [
      { date: '2024-01', price: 305000 },
      { date: '2024-06', price: 308000 },
      { date: '2024-11', price: 310000 },
    ],
  },
  {
    id: 7,
    brand: 'Aston Martin',
    model: 'DB12',
    year: 2024,
    price: 245000,
    image: '🚙',
    priceHistory: [
      { date: '2024-01', price: 240000 },
      { date: '2024-06', price: 243000 },
      { date: '2024-11', price: 245000 },
    ],
  },
  {
    id: 8,
    brand: 'Mercedes-Benz',
    model: 'AMG GT Black Series',
    year: 2024,
    price: 335000,
    image: '🏁',
    priceHistory: [
      { date: '2024-01', price: 330000 },
      { date: '2024-06', price: 333000 },
      { date: '2024-11', price: 335000 },
    ],
  },
  {
    id: 9,
    brand: 'BMW',
    model: 'M8 Competition',
    year: 2024,
    price: 145000,
    image: '🚗',
    priceHistory: [
      { date: '2024-01', price: 140000 },
      { date: '2024-06', price: 143000 },
      { date: '2024-11', price: 145000 },
    ],
  },
  {
    id: 10,
    brand: 'Audi',
    model: 'R8 V10 Performance',
    year: 2024,
    price: 180000,
    image: '🏎️',
    priceHistory: [
      { date: '2024-01', price: 175000 },
      { date: '2024-06', price: 178000 },
      { date: '2024-11', price: 180000 },
    ],
  },
  {
    id: 11,
    brand: 'Bugatti',
    model: 'Chiron',
    year: 2024,
    price: 3300000,
    image: '🏁',
    priceHistory: [
      { date: '2024-01', price: 3200000 },
      { date: '2024-06', price: 3250000 },
      { date: '2024-11', price: 3300000 },
    ],
  },
  {
    id: 12,
    brand: 'Pagani',
    model: 'Huayra',
    year: 2024,
    price: 2800000,
    image: '🚗',
    priceHistory: [
      { date: '2024-01', price: 2750000 },
      { date: '2024-06', price: 2775000 },
      { date: '2024-11', price: 2800000 },
    ],
  },
  {
    id: 13,
    brand: 'Koenigsegg',
    model: 'Jesko',
    year: 2024,
    price: 3000000,
    image: '🏎️',
    priceHistory: [
      { date: '2024-01', price: 2900000 },
      { date: '2024-06', price: 2950000 },
      { date: '2024-11', price: 3000000 },
    ],
  },
  {
    id: 14,
    brand: 'Maserati',
    model: 'MC20',
    year: 2024,
    price: 230000,
    image: '🚙',
    priceHistory: [
      { date: '2024-01', price: 225000 },
      { date: '2024-06', price: 228000 },
      { date: '2024-11', price: 230000 },
    ],
  },
  {
    id: 15,
    brand: 'Lexus',
    model: 'LC 500',
    year: 2024,
    price: 105000,
    image: '🚗',
    priceHistory: [
      { date: '2024-01', price: 102000 },
      { date: '2024-06', price: 104000 },
      { date: '2024-11', price: 105000 },
    ],
  },
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'brand'>('price-desc')
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  const filteredAndSortedCars = useMemo(() => {
    let filtered = luxuryCars.filter(
      (car) =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    )

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'brand':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand))
        break
    }

    return filtered
  }, [searchTerm, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const calculatePriceChange = (car: Car) => {
    if (car.priceHistory.length < 2) return 0
    const oldPrice = car.priceHistory[0].price
    const newPrice = car.price
    return ((newPrice - oldPrice) / oldPrice) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            🏎️ Luxury Car Price Tracker
          </h1>
          <p className="text-xl text-slate-300">
            Track premium vehicles over $100,000
          </p>
        </header>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by brand or model..."
            className="flex-1 px-6 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-6 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="brand">Brand: A to Z</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredAndSortedCars.map((car) => {
            const priceChange = calculatePriceChange(car)
            return (
              <div
                key={car.id}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-700 hover:border-blue-500"
                onClick={() => setSelectedCar(car)}
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{car.image}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {car.brand}
                  </h3>
                  <p className="text-slate-400 mb-4">{car.model}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-green-400">
                      {formatPrice(car.price)}
                    </span>
                    <span className="text-sm text-slate-400">{car.year}</span>
                  </div>
                  {priceChange !== 0 && (
                    <div
                      className={`mt-3 text-sm ${
                        priceChange > 0 ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {priceChange > 0 ? '↑' : '↓'}{' '}
                      {Math.abs(priceChange).toFixed(1)}% this year
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filteredAndSortedCars.length === 0 && (
          <div className="text-center text-slate-400 text-xl py-12">
            No cars found matching your search.
          </div>
        )}

        {selectedCar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCar(null)}
          >
            <div
              className="bg-slate-800 rounded-xl p-8 max-w-2xl w-full border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {selectedCar.brand} {selectedCar.model}
                  </h2>
                  <p className="text-slate-400">{selectedCar.year} Model</p>
                </div>
                <button
                  className="text-slate-400 hover:text-white text-2xl"
                  onClick={() => setSelectedCar(null)}
                >
                  ×
                </button>
              </div>

              <div className="text-6xl mb-6 text-center">
                {selectedCar.image}
              </div>

              <div className="mb-6">
                <div className="text-sm text-slate-400 mb-2">Current Price</div>
                <div className="text-5xl font-bold text-green-400">
                  {formatPrice(selectedCar.price)}
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Price History
                </h3>
                <div className="space-y-3">
                  {selectedCar.priceHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-slate-400">{entry.date}</span>
                      <span className="text-white font-semibold">
                        {formatPrice(entry.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                onClick={() => setSelectedCar(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
