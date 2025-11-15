import type { Disease, MedicalTreatment } from '../types';

export const commonDiseases = [
  {
    id: 'cold',
    name: 'Common Cold',
    baseSeverity: 2,
    baseDuration: 1,
    treatmentCost: 50,
    isChronic: false,
  },
  {
    id: 'flu',
    name: 'Flu',
    baseSeverity: 4,
    baseDuration: 2,
    treatmentCost: 150,
    isChronic: false,
  },
  {
    id: 'food-poisoning',
    name: 'Food Poisoning',
    baseSeverity: 3,
    baseDuration: 1,
    treatmentCost: 100,
    isChronic: false,
  },
  {
    id: 'migraine',
    name: 'Migraine',
    baseSeverity: 5,
    baseDuration: 1,
    treatmentCost: 120,
    isChronic: false,
  },
  {
    id: 'back-pain',
    name: 'Back Pain',
    baseSeverity: 4,
    baseDuration: 3,
    treatmentCost: 300,
    isChronic: false,
  },
  {
    id: 'allergies',
    name: 'Allergies',
    baseSeverity: 3,
    baseDuration: 2,
    treatmentCost: 80,
    isChronic: false,
  },
];

export const seriousDiseases = [
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    baseSeverity: 7,
    baseDuration: 4,
    treatmentCost: 2000,
    isChronic: false,
  },
  {
    id: 'appendicitis',
    name: 'Appendicitis',
    baseSeverity: 8,
    baseDuration: 2,
    treatmentCost: 5000,
    isChronic: false,
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    baseSeverity: 6,
    baseDuration: 999,
    treatmentCost: 500,
    isChronic: true,
  },
  {
    id: 'asthma',
    name: 'Asthma',
    baseSeverity: 5,
    baseDuration: 999,
    treatmentCost: 300,
    isChronic: true,
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    baseSeverity: 5,
    baseDuration: 999,
    treatmentCost: 400,
    isChronic: true,
  },
];

export const medicalTreatments: MedicalTreatment[] = [
  {
    id: 'checkup',
    name: 'General Checkup',
    cost: 200,
    healthRestoration: 5,
    description: 'Routine health examination',
    requiresHospital: false,
  },
  {
    id: 'doctor-visit',
    name: 'Doctor Visit',
    cost: 150,
    healthRestoration: 10,
    description: 'Visit to a general practitioner',
    requiresHospital: false,
  },
  {
    id: 'emergency',
    name: 'Emergency Care',
    cost: 1500,
    healthRestoration: 30,
    description: 'Emergency medical treatment',
    requiresHospital: true,
  },
  {
    id: 'surgery',
    name: 'Surgery',
    cost: 10000,
    healthRestoration: 50,
    description: 'Surgical procedure',
    requiresHospital: true,
  },
  {
    id: 'therapy',
    name: 'Therapy Session',
    cost: 100,
    healthRestoration: 0,
    description: 'Mental health therapy',
    requiresHospital: false,
  },
  {
    id: 'medication',
    name: 'Prescription Medication',
    cost: 80,
    healthRestoration: 15,
    description: 'Prescribed medicine',
    requiresHospital: false,
  },
];

export const insurancePlans = [
  {
    id: 'basic',
    name: 'Basic Coverage',
    monthlyCost: 200,
    coveragePercent: 50,
  },
  {
    id: 'standard',
    name: 'Standard Coverage',
    monthlyCost: 400,
    coveragePercent: 70,
  },
  {
    id: 'premium',
    name: 'Premium Coverage',
    monthlyCost: 600,
    coveragePercent: 90,
  },
];

export function createDisease(diseaseTemplate: typeof commonDiseases[0]): Disease {
  return {
    id: `${diseaseTemplate.id}-${Date.now()}-${Math.random()}`,
    name: diseaseTemplate.name,
    severity: diseaseTemplate.baseSeverity,
    duration: diseaseTemplate.baseDuration,
    monthsActive: 0,
    treatmentCost: diseaseTemplate.treatmentCost,
    isChronic: diseaseTemplate.isChronic,
  };
}

export function getSeverityLabel(severity: number): string {
  if (severity >= 8) return 'Critical';
  if (severity >= 6) return 'Severe';
  if (severity >= 4) return 'Moderate';
  return 'Mild';
}

export function getSeverityColor(severity: number): string {
  if (severity >= 8) return '#ef4444'; // red
  if (severity >= 6) return '#f97316'; // orange
  if (severity >= 4) return '#f59e0b'; // amber
  return '#10b981'; // green
}

export function calculateTreatmentCost(baseCost: number, hasInsurance: boolean, coveragePercent: number = 0): number {
  if (!hasInsurance) return baseCost;
  return Math.floor(baseCost * (1 - coveragePercent / 100));
}
