export const availableProperties = [
  { id: 'studio', name: 'Studio Apartment', type: 'apartment' as const, price: 100000, monthlyMortgage: 600, appreciation: 2 },
  { id: '1bed', name: '1 Bedroom Apartment', type: 'apartment' as const, price: 150000, monthlyMortgage: 900, appreciation: 2.5 },
  { id: '2bed', name: '2 Bedroom Apartment', type: 'apartment' as const, price: 200000, monthlyMortgage: 1200, appreciation: 3 },
  { id: 'starter-house', name: 'Starter House', type: 'house' as const, price: 300000, monthlyMortgage: 1800, appreciation: 3.5 },
  { id: 'family-house', name: 'Family House', type: 'house' as const, price: 500000, monthlyMortgage: 3000, appreciation: 4 },
  { id: 'luxury-condo', name: 'Luxury Condo', type: 'condo' as const, price: 800000, monthlyMortgage: 4800, appreciation: 4.5 },
  { id: 'mansion', name: 'Mansion', type: 'mansion' as const, price: 2000000, monthlyMortgage: 12000, appreciation: 5 },
];

export const rentOptions = [
  { name: 'Shared Room', monthly: 400 },
  { name: 'Studio', monthly: 800 },
  { name: '1 Bedroom', monthly: 1200 },
  { name: '2 Bedroom', monthly: 1800 },
];
