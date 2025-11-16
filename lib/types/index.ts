// Game types for Lifely

export interface User {
  name: string;
  country: string;
  age: number; // in months
  status: string;
  assets: Asset[];
  education: Education;
  job: Job;
}

export interface Asset {
  id: string;
  name: string;
  type: 'house' | 'car' | 'other';
  value: number;
  purchaseDate: number; // age in months
}

export interface Property {
  id: string;
  name: string;
  type: 'apartment' | 'house' | 'condo' | 'mansion';
  price: number;
  monthlyMortgage: number;
  monthsOwned: number;
  appreciation: number; // percentage per year
}

export interface HousingState {
  currentProperty: Property | null;
  isRenting: boolean;
  monthlyRent: number;
  propertyHistory: Property[];
}

export type EducationLevel =
  | 'none'
  | 'elementary'
  | 'middle-school'
  | 'high-school'
  | 'college'
  | 'university'
  | 'graduate'
  | 'phd';

export interface Education {
  currentLevel: EducationLevel;
  currentInstitution: string | null;
  currentMajor: string | null;
  yearsInCurrentLevel: number;
  gpa: number;
  degrees: Degree[];
  isEnrolled: boolean;
  graduationYear: number | null;
}

export interface Degree {
  level: EducationLevel;
  institution: string;
  major: string;
  gpa: number;
  graduationYear: number;
  honors: string | null;
}

export interface Job {
  name: string;
  salary: number;
  promotions: number;
  duration: number; // months
  previousJobs: string[];
  performance: number; // 0-100, affects raises and promotions
  lastReview: number; // age in months of last performance review
}

export interface Bank {
  balance: number;
  id: number;
  loan: number;
  hasLoan: boolean;
  transactions: number;
  transactionsList: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'salary' | 'expense';
  amount: number;
  description: string;
  date: number; // age in months
}

export interface Student {
  hasStudentLoan: boolean;
  loanMonths: number;
  loanAmount: number;
  loanAmountPaid: number;
  months: number;
  course: string | null;
  collegeDuration: number;
}

export interface GameStats {
  health: number;
  morale: number;
  intellect: number;
  looks: number;
  karma: number;
}

export interface Alert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'danger' | 'success';
  timestamp: number;
}

export interface ConsoleMessage {
  id: string;
  message: string;
  timestamp: number;
}

export interface Disease {
  id: string;
  name: string;
  severity: number; // 1-10
  duration: number; // months until recovery
  monthsActive: number; // how long you've had it
  treatmentCost: number;
  isChronic: boolean;
}

export interface HealthState {
  currentDiseases: Disease[];
  hasInsurance: boolean;
  insuranceCost: number;
  lastCheckup: number; // age in months
  fitnessLevel: number; // 0-100
  mentalHealth: number; // 0-100
}

export interface MedicalTreatment {
  id: string;
  name: string;
  cost: number;
  healthRestoration: number;
  description: string;
  requiresHospital: boolean;
}

export interface JobData {
  minSalary: number;
  maxSalary: number;
  minIncrement: number;
  maxIncrement: number;
  successRate: number | null;
  cgpaNeeded: number | null;
  requires: string[]; // education requirements
  requiredSkills?: string[]; // skill IDs that are required
  recommendedSkills?: string[]; // skill IDs that boost performance
  skillWeight?: number; // 0-1, how much skills matter (default 0.3)
}

export interface Activity {
  id: string;
  name: string;
  icon: string;
  cost: { min: number; max: number };
  effects: {
    health?: number;
    morale?: number;
    intellect?: number;
    looks?: number;
  };
  description: string;
}

export type RelationshipType =
  | 'parent'
  | 'sibling'
  | 'spouse'
  | 'child'
  | 'friend'
  | 'dating'
  | 'ex';

export type RelationshipStatus =
  | 'excellent'   // 80-100
  | 'good'        // 60-79
  | 'neutral'     // 40-59
  | 'poor'        // 20-39
  | 'terrible';   // 0-19

export interface Relationship {
  id: string;
  name: string;
  type: RelationshipType;
  quality: number; // 0-100
  yearsKnown: number;
  lastInteraction: number; // age in months
  metAt: number; // age in months
  isAlive: boolean;
  traits: string[];
}

export interface RelationshipState {
  relationships: Relationship[];
  hasSpouse: boolean;
  spouseId: string | null;
  children: number;
  totalFriends: number;
}

export interface SocialInteraction {
  id: string;
  relationshipId: string;
  type: 'conversation' | 'activity' | 'gift' | 'argument' | 'support';
  qualityChange: number;
  timestamp: number;
  description: string;
}

export type SkillCategory =
  | 'technical'
  | 'creative'
  | 'business'
  | 'social'
  | 'physical'
  | 'academic';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  experience: number; // Progress to next level
}

export interface SkillsState {
  skills: Skill[];
  totalSkillPoints: number;
}

export interface Training {
  id: string;
  name: string;
  skillId: string;
  cost: number;
  duration: number; // in months
  experienceGain: number;
  requirements: {
    minLevel?: number;
    minIntellect?: number;
  };
}

export type VehicleType =
  | 'bicycle'
  | 'motorcycle'
  | 'sedan'
  | 'suv'
  | 'truck'
  | 'sports'
  | 'luxury'
  | 'supercar';

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  price: number;
  maintenanceCost: number; // per month
  fuelCost: number; // per month
  depreciation: number; // percentage per year
  reliability: number; // 0-100
  currentValue: number;
  monthsOwned: number;
  mileage: number;
}

export interface VehicleState {
  currentVehicle: Vehicle | null;
  vehicleHistory: Vehicle[];
  totalMilesDriven: number;
  maintenanceScheduled: boolean;
}

export type LoanType = 'personal' | 'student' | 'auto' | 'mortgage';

export interface Loan {
  id: string;
  type: LoanType;
  amount: number;
  remainingBalance: number;
  interestRate: number; // percentage
  monthlyPayment: number;
  monthsRemaining: number;
  monthsTaken: number; // age in months when loan was taken
  missedPayments: number;
}

export interface CreditState {
  score: number; // 300-850
  activeLoans: Loan[];
  loanHistory: Loan[];
  totalDebt: number;
  paymentHistory: number[]; // last 12 months: 1 = on-time, 0 = missed
}

export type InvestmentType = 'stocks' | 'bonds' | 'crypto' | 'real-estate' | 'index-fund';

export interface Investment {
  id: string;
  type: InvestmentType;
  name: string;
  shares: number;
  purchasePrice: number; // price per share when bought
  currentPrice: number; // current price per share
  monthsHeld: number;
  totalInvested: number;
}

export interface InvestmentState {
  portfolio: Investment[];
  totalValue: number;
  totalInvested: number;
  monthlyContribution: number; // automatic monthly investment
  retirementFund: number; // separate retirement account
}

export type AchievementCategory =
  | 'financial'
  | 'career'
  | 'education'
  | 'relationships'
  | 'health'
  | 'lifestyle'
  | 'special';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  unlockedAt: number; // age in months when unlocked
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementState {
  unlocked: Achievement[];
  totalPoints: number;
}

export type TravelType =
  | 'weekend-trip'
  | 'vacation'
  | 'world-tour'
  | 'business-trip'
  | 'backpacking'
  | 'luxury-cruise'
  | 'road-trip';

export interface Destination {
  id: string;
  name: string;
  country: string;
  type: 'city' | 'beach' | 'mountains' | 'cultural' | 'adventure' | 'exotic';
  baseCost: number;
  duration: number; // days
  moraleBoost: number;
  stressRelief: number; // reduces negative morale effects
  culturalValue: number; // intellect boost
  memories: string[]; // possible experiences
}

export interface Trip {
  id: string;
  destinationId: string;
  destinationName: string;
  cost: number;
  traveledAt: number; // age in months
  duration: number;
  experiences: string[]; // what happened during the trip
  satisfaction: number; // 1-10
}

export interface TravelState {
  trips: Trip[];
  totalCountriesVisited: number;
  totalMoneySpent: number;
  favoriteDestination: string | null;
  travelDays: number; // total days traveled
}

export type TaxType = 'income' | 'property' | 'capital-gains' | 'sales';

export interface TaxBracket {
  minIncome: number;
  maxIncome: number;
  rate: number; // percentage
}

export interface TaxRecord {
  id: string;
  year: number; // which year's taxes
  filedAt: number; // age in months when filed
  incomeReported: number;
  taxOwed: number;
  taxPaid: number;
  refund: number; // if overpaid
  penalty: number; // if underpaid or late
  deductions: TaxDeduction[];
}

export interface TaxDeduction {
  type: 'student-loan' | 'mortgage' | 'charity' | 'medical' | 'retirement';
  amount: number;
  description: string;
}

export interface TaxState {
  filingHistory: TaxRecord[];
  currentYearIncome: number; // income earned this tax year
  currentYearWithheld: number; // tax already withheld from salary
  lastFiledYear: number; // last year taxes were filed
  totalTaxesPaid: number;
  totalRefundsReceived: number;
  totalPenaltiesPaid: number;
  hasTaxDebt: boolean;
  taxDebtAmount: number;
}

export type TimelineEventType =
  | 'birth'
  | 'education'
  | 'job'
  | 'relationship'
  | 'purchase'
  | 'travel'
  | 'health'
  | 'financial'
  | 'achievement'
  | 'life-event'
  | 'milestone';

export type TimelineEventCategory =
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'milestone';

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  category: TimelineEventCategory;
  title: string;
  description: string;
  age: number; // age in months when event occurred
  timestamp: number; // Date.now() when event occurred
  icon?: string; // optional icon identifier
  metadata?: Record<string, any>; // additional data about the event
}

export interface LifeMilestone {
  id: string;
  name: string;
  description: string;
  requiredAge?: number; // age in months
  condition: (data: any) => boolean;
  icon: string;
}

export interface TimelineState {
  events: TimelineEvent[];
  milestones: string[]; // IDs of achieved milestones
  totalEvents: number;
}

export type PetType = 'dog' | 'cat' | 'bird' | 'fish' | 'rabbit' | 'hamster';

export type PetPersonality =
  | 'playful'
  | 'calm'
  | 'energetic'
  | 'shy'
  | 'friendly'
  | 'independent';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  personality: PetPersonality;
  age: number; // in months
  health: number; // 0-100
  happiness: number; // 0-100
  adoptedAt: number; // player age in months
  lastFed: number; // months since last fed
  lastVetVisit: number; // months since last vet visit
  bond: number; // 0-100, relationship strength with owner
  isAlive: boolean;
}

export interface PetCareActivity {
  id: string;
  name: string;
  cost: number;
  happinessBoost: number;
  healthBoost: number;
  bondBoost: number;
  description: string;
}

export interface PetsState {
  currentPets: Pet[];
  petHistory: Pet[]; // deceased or rehomed pets
  totalPetsOwned: number;
  totalSpentOnPets: number;
}

export type CrimeType =
  | 'theft'
  | 'assault'
  | 'fraud'
  | 'vandalism'
  | 'drug-possession'
  | 'drunk-driving'
  | 'tax-evasion'
  | 'cybercrime'
  | 'embezzlement'
  | 'racketeering'
  | 'money-laundering'
  | 'burglary'
  | 'robbery'
  | 'extortion'
  | 'bribery'
  | 'identity-theft'
  | 'insider-trading'
  | 'perjury'
  | 'kidnapping'
  | 'arson'
  | 'manslaughter';

export type CrimeSeverity = 'minor' | 'moderate' | 'serious' | 'felony' | 'violent-felony';
export type TrialOutcome = 'not-guilty' | 'guilty' | 'hung-jury' | 'mistrial' | 'plea-deal';
export type SentenceType = 'jail' | 'probation' | 'community-service' | 'house-arrest' | 'suspended';

export interface Crime {
  id: string;
  type: CrimeType;
  severity: CrimeSeverity;
  committedAt: number; // age in months
  caught: boolean;
  jailTime: number; // months
  fine: number;
  description: string;
}

export interface CourtTrial {
  id: string;
  crimeType: CrimeType;
  trialDate: number; // age in months
  prosecutorStrength: number; // 0-100
  evidenceQuality: number; // 0-100
  hasJury: boolean;
  outcome: TrialOutcome;
  sentenceMonths: number;
  sentenceType: SentenceType;
}

export interface ParoleStatus {
  eligible: boolean;
  eligibilityAge: number; // when eligible
  onParole: boolean;
  paroleOfficer: string;
  paroleViolations: number;
  paroleEndAge: number;
  restrictions: string[];
}

export interface LegalState {
  criminalRecord: Crime[];
  isJailed: boolean;
  jailReleaseAge: number; // age in months when released
  totalJailTime: number; // total months spent in jail
  totalFinesPaid: number;
  hasLawyer: boolean;
  lawyerCost: number; // monthly retainer
  onProbation: boolean;
  probationMonthsRemaining: number;
  probationViolations: number;
  parole: ParoleStatus;
  communityServiceHours: number;
  communityServiceCompleted: number;
  felonyCount: number; // Three strikes tracking
  canExpunge: boolean;
  expungedCrimes: number;
  hasWarrant: boolean;
  inWitnessProtection: boolean;
  courtTrials: CourtTrial[];
}

export type BusinessType =
  | 'restaurant'
  | 'retail-store'
  | 'tech-startup'
  | 'consulting'
  | 'real-estate'
  | 'franchise';

export type BusinessStage = 'startup' | 'growing' | 'established' | 'struggling' | 'failing';

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  stage: BusinessStage;
  foundedAt: number; // age in months
  initialInvestment: number;
  currentValue: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  employees: number;
  profitMargin: number; // percentage
  successRate: number; // 0-100, how well it's doing
}

export interface BusinessState {
  ownedBusinesses: Business[];
  businessHistory: Business[]; // sold or failed businesses
  totalBusinessesStarted: number;
  totalBusinessRevenue: number;
  totalBusinessExpenses: number;
}

// Gambling types
export type GamblingActivityType =
  | 'lottery'
  | 'scratch-card'
  | 'slot-machine'
  | 'blackjack'
  | 'roulette'
  | 'poker'
  | 'sports-betting'
  | 'horse-racing';

export interface LotteryDraw {
  id: string;
  type: 'daily' | 'weekly' | 'mega';
  drawDate: number; // timestamp
  winningNumbers: number[];
  jackpot: number;
  winners: number;
}

export interface GamblingActivity {
  id: string;
  type: GamblingActivityType;
  amount: number;
  result: 'win' | 'loss';
  payout: number;
  timestamp: number;
  age: number;
}

export interface GamblingState {
  activities: GamblingActivity[];
  totalWagered: number;
  totalWon: number;
  totalLost: number;
  biggestWin: number;
  biggestLoss: number;
  lotteryTickets: {
    drawId: string;
    numbers: number[];
    cost: number;
    purchaseDate: number;
  }[];
  lastGambleAge: number;
  gamblingStreak: number; // consecutive months gambling
}

// Insurance types
export type InsuranceType = 'term-life' | 'whole-life' | 'universal-life';

export type InsuranceRiderType =
  | 'accidental-death'
  | 'critical-illness'
  | 'disability'
  | 'waiver-of-premium';

export interface InsuranceRider {
  type: InsuranceRiderType;
  monthlyCost: number;
  benefit: number;
  description: string;
}

export interface LifeInsurance {
  id: string;
  type: InsuranceType;
  coverageAmount: number;
  monthlyPremium: number;
  cashValue: number; // for whole/universal life
  purchaseAge: number; // age in months when purchased
  term: number; // term length in months (for term life)
  riders: InsuranceRider[];
  beneficiaries: string[];
  isActive: boolean;
}

export interface InsuranceState {
  policies: LifeInsurance[];
  policyHistory: LifeInsurance[];
  totalPremiumsPaid: number;
  totalClaimsPaid: number;
  hasActivePolicies: boolean;
}

// Charity and donations types
export type CharityCause =
  | 'education'
  | 'healthcare'
  | 'environment'
  | 'poverty'
  | 'animal-welfare'
  | 'disaster-relief'
  | 'arts-culture'
  | 'research';

export type DonationFrequency = 'one-time' | 'monthly' | 'yearly';

export interface Donation {
  id: string;
  cause: CharityCause;
  organizationName: string;
  amount: number;
  frequency: DonationFrequency;
  timestamp: number;
  age: number;
  taxDeductible: boolean;
}

export interface RecurringDonation {
  id: string;
  cause: CharityCause;
  organizationName: string;
  monthlyAmount: number;
  startAge: number;
  isActive: boolean;
  totalPaid: number;
}

export interface VolunteerActivity {
  id: string;
  cause: CharityCause;
  organizationName: string;
  hoursVolunteered: number;
  timestamp: number;
  age: number;
}

export interface CharitableFoundation {
  id: string;
  name: string;
  cause: CharityCause;
  foundedAt: number; // age in months
  totalFunds: number;
  totalDisbursed: number;
  beneficiariesHelped: number;
  reputation: number; // 0-100
}

export interface CharityState {
  donations: Donation[];
  recurringDonations: RecurringDonation[];
  volunteerActivities: VolunteerActivity[];
  foundations: CharitableFoundation[];
  totalDonated: number;
  totalVolunteerHours: number;
  favoriteCharity: string | null;
  philanthropyLevel: 'none' | 'occasional' | 'regular' | 'generous' | 'philanthropist';
}

// Addiction types
export type AddictionType =
  | 'alcohol'
  | 'drugs'
  | 'gambling'
  | 'shopping'
  | 'internet'
  | 'work';

export type AddictionLevel = 'none' | 'mild' | 'moderate' | 'severe' | 'critical';

export type RecoveryStatus =
  | 'active-addiction'
  | 'in-treatment'
  | 'recovering'
  | 'relapsed'
  | 'recovered';

export interface Addiction {
  type: AddictionType;
  level: AddictionLevel;
  monthsSinceStart: number;
  recoveryStatus: RecoveryStatus;
  totalMoneySpent: number;
  interventionCount: number;
  relapseCount: number;
  cleanMonths: number; // consecutive months clean
  inRehab: boolean;
  attendingSupportGroups: boolean;
}

export interface RecoveryProgram {
  id: string;
  type: 'rehab' | 'outpatient' | 'support-group' | 'therapy';
  name: string;
  cost: number;
  duration: number; // months
  successRate: number; // 0-100
}

export interface AddictionsState {
  currentAddictions: Addiction[];
  recoveryHistory: {
    addictionType: AddictionType;
    recoveredAt: number; // age in months
    monthsAddicted: number;
    totalCost: number;
  }[];
  activePrograms: {
    programId: string;
    addictionType: AddictionType;
    startAge: number;
    monthsRemaining: number;
  }[];
  totalRecoverySpent: number;
  hasBeenAddicted: boolean;
}

// Mental Health types
export type MentalHealthCondition =
  | 'depression'
  | 'anxiety'
  | 'ptsd'
  | 'bipolar'
  | 'ocd'
  | 'eating-disorder'
  | 'adhd';

export type MentalHealthSeverity = 'none' | 'mild' | 'moderate' | 'severe';

export type TherapyType =
  | 'cbt'
  | 'psychotherapy'
  | 'medication'
  | 'group-therapy'
  | 'emdr';

export interface MentalHealthConditionInstance {
  condition: MentalHealthCondition;
  severity: MentalHealthSeverity;
  diagnosedAt: number; // age in months
  monthsActive: number;
  inTreatment: boolean;
  currentTherapy: TherapyType | null;
  monthsInTherapy: number;
  medicationCompliance: number; // 0-100
}

export interface MentalHealthEvent {
  id: string;
  type: 'crisis' | 'breakthrough' | 'relapse' | 'hospitalization';
  description: string;
  timestamp: number;
  age: number;
}

export interface MentalHealthState {
  currentConditions: MentalHealthConditionInstance[];
  mentalHealthHistory: {
    condition: MentalHealthCondition;
    recoveredAt: number;
    monthsActive: number;
  }[];
  activeTherapy: {
    therapyType: TherapyType;
    startAge: number;
    monthlyCost: number;
    sessionPerMonth: number;
  } | null;
  events: MentalHealthEvent[];
  totalTherapyCost: number;
  stressLevel: number; // 0-100
  copingSkills: number; // 0-100
  supportNetwork: number; // 0-100 (quality of support system)
  mentalHealthDaysTaken: number;
}

// Stock Market types
export type StockSector =
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'energy'
  | 'consumer'
  | 'industrials'
  | 'utilities';

export type MarketCondition = 'bull' | 'bear' | 'volatile' | 'stable' | 'crash';

export interface Stock {
  symbol: string;
  name: string;
  sector: StockSector;
  currentPrice: number;
  previousPrice: number;
  dividendYield: number; // annual percentage
  volatility: number; // 0-100
}

export interface StockHolding {
  stockSymbol: string;
  shares: number;
  purchasePrice: number; // average cost basis
  purchaseAge: number; // when purchased
}

export interface StockTransaction {
  id: string;
  type: 'buy' | 'sell' | 'dividend';
  stockSymbol: string;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  timestamp: number;
  age: number;
}

export interface StockMarketState {
  holdings: StockHolding[];
  transactionHistory: StockTransaction[];
  totalInvested: number;
  totalDividendsReceived: number;
  currentMarketCondition: MarketCondition;
  marketSentiment: number; // -100 to 100
  lastMarketUpdate: number;
}

// Cryptocurrency types
export interface Cryptocurrency {
  symbol: string;
  name: string;
  currentPrice: number;
  previousPrice: number;
  volatility: number; // 0-100, much higher than stocks
  marketCap: number;
  maxSupply: number;
}

export interface CryptoHolding {
  cryptoSymbol: string;
  amount: number; // can be fractional
  purchasePrice: number; // average cost basis
  purchaseAge: number;
}

export interface CryptoTransaction {
  id: string;
  type: 'buy' | 'sell' | 'stake' | 'unstake';
  cryptoSymbol: string;
  amount: number;
  pricePerCoin: number;
  totalValue: number;
  fees: number;
  timestamp: number;
  age: number;
}

export interface CryptoState {
  holdings: CryptoHolding[];
  stakedCoins: { cryptoSymbol: string; amount: number; apr: number }[];
  transactionHistory: CryptoTransaction[];
  totalInvested: number;
  totalStakingRewards: number;
  marketBoom: boolean; // crypto bull run
  lastUpdate: number;
}

// Dice Rolling Mechanic
export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface DiceRoll {
  id: string;
  diceType: DiceType;
  result: number;
  timestamp: number;
  context: string; // What was the roll for
  criticalSuccess: boolean;
  criticalFailure: boolean;
}

export interface DiceModifier {
  name: string;
  value: number; // +/- to roll
  source: string; // Where it comes from (skill, luck, etc)
}

export interface DiceState {
  rollHistory: DiceRoll[];
  totalRolls: number;
  criticalSuccesses: number;
  criticalFailures: number;
  luckStat: number; // 0-100, affects rolls
  blessedUntilAge: number; // temporary luck boost
  cursedUntilAge: number; // temporary luck penalty
}

// Hobbies System
export type HobbyCategory = 'creative' | 'physical' | 'intellectual' | 'social' | 'collecting' | 'gaming';

export interface Hobby {
  id: string;
  name: string;
  category: HobbyCategory;
  level: number; // 0-100 mastery
  hoursSpent: number;
  monthlyCost: number;
  enjoyment: number; // 0-100
  lastPracticed: number; // age in months
}

export interface HobbyDefinition {
  id: string;
  name: string;
  category: HobbyCategory;
  description: string;
  startupCost: number;
  monthlyCost: number;
  timePerSession: number; // hours
  statBenefits: {
    morale?: number;
    health?: number;
    intellect?: number;
    looks?: number;
  };
  skillGained?: string;
  requiresDiceRoll: boolean; // Some hobbies use dice for outcomes
}

export interface HobbiesState {
  activeHobbies: Hobby[];
  hobbyHistory: { hobbyId: string; level: number; totalHours: number }[];
  totalHoursAllHobbies: number;
  totalMoneySpent: number;
  achievements: string[]; // "Master Painter", etc
}

// Social Media / Influencer System
export type SocialPlatform = 'youtube' | 'instagram' | 'tiktok' | 'twitter' | 'twitch' | 'podcast';
export type ContentNiche = 'gaming' | 'lifestyle' | 'fitness' | 'cooking' | 'tech' | 'comedy' | 'education' | 'music' | 'beauty' | 'travel';

export interface SocialMediaAccount {
  platform: SocialPlatform;
  niche: ContentNiche;
  followers: number;
  totalPosts: number;
  engagement: number; // 0-100
  monthlyGrowthRate: number; // percentage
  isVerified: boolean;
  isMonetized: boolean;
}

export interface ContentPost {
  id: string;
  platform: SocialPlatform;
  contentType: 'video' | 'photo' | 'text' | 'stream';
  quality: number; // 0-100
  views: number;
  likes: number;
  timestamp: number;
  age: number;
  viralSuccess: boolean;
}

export interface SponsorshipDeal {
  id: string;
  brand: string;
  paymentPerPost: number;
  postsRequired: number;
  postsCompleted: number;
  startAge: number;
  endAge: number;
}

export interface SocialMediaState {
  accounts: SocialMediaAccount[];
  postHistory: ContentPost[];
  sponsorships: SponsorshipDeal[];
  totalEarnings: number;
  totalFollowers: number;
  viralPosts: number;
  canceledCount: number; // controversies
  fame: number; // 0-100
}

// Natural Disasters System
export type DisasterType =
  | 'earthquake'
  | 'hurricane'
  | 'tornado'
  | 'flood'
  | 'wildfire'
  | 'blizzard'
  | 'tsunami'
  | 'volcanic-eruption';

export type DisasterSeverity = 'minor' | 'moderate' | 'major' | 'catastrophic';

export interface Disaster {
  id: string;
  type: DisasterType;
  severity: DisasterSeverity;
  ageOccurred: number;
  region: string;
  damageAmount: number;
  injuries: boolean;
  hospitalDays: number;
  propertyDestroyed: boolean;
  evacuated: boolean;
  insuranceCovered: number;
}

export interface DisasterState {
  disasterHistory: Disaster[];
  totalDisastersDamage: number;
  hasDisasterInsurance: boolean;
  disasterInsuranceCost: number;
  emergencyFundUsed: number;
  lastDisasterAge: number;
}

// Politics and Civic Engagement
export type PoliticalParty = 'liberal' | 'conservative' | 'progressive' | 'libertarian' | 'independent';
export type PoliticalOffice = 'mayor' | 'state-rep' | 'governor' | 'senator' | 'president';

export interface Election {
  id: string;
  office: PoliticalOffice;
  year: number;
  candidates: { name: string; party: PoliticalParty; popularity: number }[];
  playerRunning: boolean;
  playerVotes: number;
  winner: string;
}

export interface PoliticsState {
  politicalAlignment: PoliticalParty;
  hasVoted: boolean;
  electionHistory: Election[];
  officesHeld: { office: PoliticalOffice; yearsServed: number }[];
  campaignFundsRaised: number;
  politicalReputation: number; // 0-100
  lobbyingInfluence: number;
}

// ===== INHERITANCE & ESTATE =====
export type BeneficiaryType = 'spouse' | 'child' | 'parent' | 'sibling' | 'friend' | 'charity' | 'organization';
export type TrustType = 'revocable-living' | 'irrevocable-life' | 'testamentary' | 'charitable-remainder' | 'special-needs';
export type AssetDistributionMethod = 'equal-split' | 'weighted' | 'specific-allocation' | 'residuary';

export interface Beneficiary {
  id: string;
  name: string;
  relationship: BeneficiaryType;
  sharePercentage: number; // 0-100
  specificAssets: string[]; // Asset IDs
  conditional: boolean;
  condition?: string;
}

export interface Will {
  id: string;
  createdAge: number;
  lastUpdatedAge: number;
  executor: string;
  beneficiaries: Beneficiary[];
  distributionMethod: AssetDistributionMethod;
  charitableDonations: { charity: string; amount: number }[];
  specialInstructions: string[];
  witnessed: boolean;
  legallyValid: boolean;
}

export interface Trust {
  id: string;
  type: TrustType;
  createdAge: number;
  principal: number; // Initial funding
  currentValue: number;
  beneficiaries: string[]; // Names
  trustee: string;
  yearsActive: number;
  taxBenefit: number; // Annual tax savings
}

export interface Inheritance {
  id: string;
  receivedAge: number;
  fromWho: string;
  relationship: string;
  totalValue: number;
  cash: number;
  property: number;
  investments: number;
  taxes: number;
  netReceived: number;
}

export interface EstateState {
  currentWill: Will | null;
  willHistory: Will[];
  trusts: Trust[];
  inheritances: Inheritance[];
  totalInherited: number;
  hasLivingWill: boolean;
  hasPowerOfAttorney: boolean;
  powerOfAttorneyHolder: string | null;
  estatePlanningCost: number;
  estimatedEstateTax: number;
}

// ===== REPUTATION & FAME =====
export type FameLevel = 'unknown' | 'local-celebrity' | 'regional' | 'national' | 'international' | 'superstar' | 'icon';
export type ReputationType = 'positive' | 'negative' | 'controversial' | 'neutral';
export type MediaType = 'news' | 'magazine' | 'tv' | 'radio' | 'podcast' | 'documentary' | 'biography';
export type ScandalType = 'personal' | 'professional' | 'legal' | 'financial' | 'relationship' | 'health';

export interface MediaAppearance {
  id: string;
  type: MediaType;
  outlet: string;
  date: number; // age in months
  topic: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  reach: number; // Number of people reached
  payment: number; // If paid appearance
}

export interface Endorsement {
  id: string;
  brand: string;
  category: string;
  startAge: number;
  duration: number; // months
  annualPay: number;
  fameRequired: number;
  active: boolean;
}

export interface PublicScandal {
  id: string;
  type: ScandalType;
  severity: number; // 1-10
  occurredAge: number;
  description: string;
  fameImpact: number; // negative
  publicityGained: number; // even bad press increases recognition
  resolved: boolean;
}

export interface Award {
  id: string;
  name: string;
  category: string;
  receivedAge: number;
  prestige: number; // 1-100
  fameGained: number;
}

export interface ReputationState {
  fameLevel: FameLevel;
  famePoints: number; // 0-1000+
  reputation: number; // -100 to +100
  reputationType: ReputationType;
  mediaAppearances: MediaAppearance[];
  endorsements: Endorsement[];
  scandals: PublicScandal[];
  awards: Award[];
  recognitionRate: number; // 0-100, % chance of being recognized in public
  paparazziLevel: number; // 0-10, how much media follows you
  hasPublicist: boolean;
  publicistCost: number;
  hasBodyguard: boolean;
  bodyguardCost: number;
  fanClubSize: number;
  haters: number;
  totalMediaValue: number; // Lifetime earnings from fame
  publicPerception: string; // Generated description
}

// ===== RANDOM LIFE EVENTS =====
export type EventCategory =
  | 'fortune' | 'misfortune' | 'opportunity' | 'encounter'
  | 'discovery' | 'loss' | 'windfall' | 'accident' | 'miracle'
  | 'betrayal' | 'romance' | 'career' | 'health' | 'social' | 'mystery';

export type EventSeverity = 'trivial' | 'minor' | 'moderate' | 'major' | 'life-changing' | 'catastrophic';
export type EventFrequency = 'very-rare' | 'rare' | 'uncommon' | 'common' | 'frequent';

export interface RandomLifeEvent {
  id: string;
  category: EventCategory;
  severity: EventSeverity;
  title: string;
  description: string;
  occurredAge: number;
  effects: {
    money?: number;
    health?: number;
    morale?: number;
    intellect?: number;
    looks?: number;
    karma?: number;
    reputation?: number;
    fame?: number;
    customEffect?: string;
  };
  choices?: EventChoice[];
  wasChoiceMade: boolean;
  choiceOutcome?: string;
}

export interface EventChoice {
  id: string;
  text: string;
  difficultyClass: number; // DC for dice roll
  successOutcome: EventOutcome;
  failureOutcome: EventOutcome;
}

export interface EventOutcome {
  description: string;
  effects: RandomLifeEvent['effects'];
  followUpEvent?: string; // ID of follow-up event
}

export interface RandomEventsState {
  eventsHistory: RandomLifeEvent[];
  totalEventsExperienced: number;
  bestEvent: RandomLifeEvent | null;
  worstEvent: RandomLifeEvent | null;
  pendingEvent: RandomLifeEvent | null; // Event waiting for player choice
  miraclesExperienced: number;
  catastrophesExperienced: number;
  luckStreak: number; // Consecutive good events
  unluckyStreak: number; // Consecutive bad events
}

// ===== EDUCATION EXPANSION =====
export type GraduateDegree = 'masters' | 'phd' | 'mba' | 'jd' | 'md';
export type AcademicStatus = 'good-standing' | 'deans-list' | 'honors' | 'probation' | 'suspended' | 'expelled';
export type ResearchField = 'stem' | 'humanities' | 'social-sciences' | 'business' | 'medical' | 'law';

export interface GraduateProgram {
  id: string;
  degree: GraduateDegree;
  field: ResearchField;
  university: string;
  prestigeLevel: number; // 1-100
  startedAge: number;
  yearsRequired: number;
  tuitionPerYear: number;
  fellowshipAmount: number; // If funded
  thesisCompleted: boolean;
  gpa: number; // 0.0-4.0
}

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  duration: number; // years
  requirements: {
    minGPA?: number;
    financialNeed?: boolean;
    specificField?: ResearchField;
  };
  competitive: boolean;
  renewable: boolean;
}

export interface AcademicAchievement {
  id: string;
  type: 'deans-list' | 'honors' | 'award' | 'publication' | 'presentation' | 'fellowship';
  title: string;
  receivedAge: number;
  prestige: number;
  fameGain: number;
}

export interface Publication {
  id: string;
  title: string;
  journalName: string;
  impactFactor: number; // 0-100
  publishedAge: number;
  citations: number;
  coAuthors: string[];
}

export interface StudyAbroadProgram {
  id: string;
  country: string;
  university: string;
  duration: number; // months
  cost: number;
  scholarshipCovered: number;
  startAge: number;
}

export interface ExpandedEducationState {
  graduatePrograms: GraduateProgram[];
  currentGradProgram: GraduateProgram | null;
  academicStatus: AcademicStatus;
  scholarships: Scholarship[];
  academicAchievements: AcademicAchievement[];
  publications: Publication[];
  studyAbroadHistory: StudyAbroadProgram[];
  cumulativeGPA: number;
  totalCredits: number;
  studentOrganizations: string[];
  academicProbationCount: number;
  totalScholarshipMoney: number;
  thesesDefended: number;
  conferencesPresentedAt: number;
}

