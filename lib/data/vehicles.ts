import type { VehicleType } from '../types';

export interface VehicleDefinition {
  id: string;
  name: string;
  type: VehicleType;
  price: number;
  maintenanceCost: number; // per month
  fuelCost: number; // per month
  depreciation: number; // percentage per year
  reliability: number; // 0-100
}

export const availableVehicles: VehicleDefinition[] = [
  // Budget options
  {
    id: 'basic-bike',
    name: 'Basic Bicycle',
    type: 'bicycle',
    price: 500,
    maintenanceCost: 10,
    fuelCost: 0,
    depreciation: 10,
    reliability: 70,
  },
  {
    id: 'mountain-bike',
    name: 'Mountain Bike',
    type: 'bicycle',
    price: 1500,
    maintenanceCost: 20,
    fuelCost: 0,
    depreciation: 12,
    reliability: 85,
  },

  // Motorcycles
  {
    id: 'scooter',
    name: 'City Scooter',
    type: 'motorcycle',
    price: 3000,
    maintenanceCost: 50,
    fuelCost: 40,
    depreciation: 15,
    reliability: 75,
  },
  {
    id: 'sport-bike',
    name: 'Sport Motorcycle',
    type: 'motorcycle',
    price: 12000,
    maintenanceCost: 150,
    fuelCost: 80,
    depreciation: 18,
    reliability: 80,
  },

  // Economy cars
  {
    id: 'compact-sedan',
    name: 'Compact Sedan',
    type: 'sedan',
    price: 20000,
    maintenanceCost: 100,
    fuelCost: 120,
    depreciation: 12,
    reliability: 85,
  },
  {
    id: 'mid-sedan',
    name: 'Mid-Size Sedan',
    type: 'sedan',
    price: 30000,
    maintenanceCost: 120,
    fuelCost: 140,
    depreciation: 10,
    reliability: 90,
  },

  // SUVs
  {
    id: 'compact-suv',
    name: 'Compact SUV',
    type: 'suv',
    price: 35000,
    maintenanceCost: 150,
    fuelCost: 180,
    depreciation: 11,
    reliability: 88,
  },
  {
    id: 'full-suv',
    name: 'Full-Size SUV',
    type: 'suv',
    price: 55000,
    maintenanceCost: 200,
    fuelCost: 250,
    depreciation: 12,
    reliability: 90,
  },

  // Trucks
  {
    id: 'pickup-truck',
    name: 'Pickup Truck',
    type: 'truck',
    price: 40000,
    maintenanceCost: 180,
    fuelCost: 220,
    depreciation: 10,
    reliability: 92,
  },

  // Sports cars
  {
    id: 'sport-coupe',
    name: 'Sports Coupe',
    type: 'sports',
    price: 60000,
    maintenanceCost: 300,
    fuelCost: 280,
    depreciation: 15,
    reliability: 82,
  },
  {
    id: 'performance-sports',
    name: 'Performance Sports Car',
    type: 'sports',
    price: 100000,
    maintenanceCost: 500,
    fuelCost: 350,
    depreciation: 18,
    reliability: 78,
  },

  // Luxury
  {
    id: 'luxury-sedan',
    name: 'Luxury Sedan',
    type: 'luxury',
    price: 80000,
    maintenanceCost: 400,
    fuelCost: 200,
    depreciation: 14,
    reliability: 88,
  },
  {
    id: 'executive-luxury',
    name: 'Executive Luxury',
    type: 'luxury',
    price: 150000,
    maintenanceCost: 600,
    fuelCost: 250,
    depreciation: 16,
    reliability: 90,
  },

  // Supercars
  {
    id: 'supercar',
    name: 'Supercar',
    type: 'supercar',
    price: 300000,
    maintenanceCost: 1000,
    fuelCost: 500,
    depreciation: 20,
    reliability: 70,
  },
  {
    id: 'hypercar',
    name: 'Hypercar',
    type: 'supercar',
    price: 1000000,
    maintenanceCost: 3000,
    fuelCost: 800,
    depreciation: 25,
    reliability: 65,
  },
];

export const vehicleTypeNames: Record<VehicleType, string> = {
  bicycle: 'Bicycle',
  motorcycle: 'Motorcycle',
  sedan: 'Sedan',
  suv: 'SUV',
  truck: 'Truck',
  sports: 'Sports Car',
  luxury: 'Luxury',
  supercar: 'Supercar',
};

export const vehicleTypeColors: Record<VehicleType, string> = {
  bicycle: '#10b981',
  motorcycle: '#f59e0b',
  sedan: '#3b82f6',
  suv: '#8b5cf6',
  truck: '#ef4444',
  sports: '#ec4899',
  luxury: '#eab308',
  supercar: '#f97316',
};

export function calculateMonthlyVehicleCost(maintenanceCost: number, fuelCost: number): number {
  return maintenanceCost + fuelCost;
}

export function calculateVehicleValue(
  purchasePrice: number,
  monthsOwned: number,
  depreciationRate: number
): number {
  const years = monthsOwned / 12;
  const depreciationMultiplier = Math.pow(1 - depreciationRate / 100, years);
  return Math.floor(purchasePrice * depreciationMultiplier);
}

export function getReliabilityLabel(reliability: number): string {
  if (reliability >= 90) return 'Excellent';
  if (reliability >= 80) return 'Good';
  if (reliability >= 70) return 'Fair';
  if (reliability >= 60) return 'Poor';
  return 'Very Poor';
}

export function getReliabilityColor(reliability: number): string {
  if (reliability >= 90) return '#10b981';
  if (reliability >= 80) return '#3b82f6';
  if (reliability >= 70) return '#f59e0b';
  if (reliability >= 60) return '#f97316';
  return '#ef4444';
}
