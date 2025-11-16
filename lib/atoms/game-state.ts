// Jotai atoms for game state management
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type {
  User,
  Bank,
  Student,
  GameStats,
  Alert,
  ConsoleMessage,
  Disease,
  RelationshipState,
  SkillsState,
  HealthState,
  HousingState,
  VehicleState,
  CreditState,
  InvestmentState,
  AchievementState,
  TravelState,
  TaxState,
  TimelineState,
  TimelineEvent,
  PetsState,
  LegalState,
  BusinessState,
  GamblingState,
  InsuranceState,
  CharityState,
  AddictionsState,
} from '../types';
import { randint } from '../utils/game-utils';
import { randomChoice } from '../utils/game-utils';
import { allCountries } from '../data/countries';
import { generateRandomName } from '../utils/name-generator';

// Initialize default values
const getInitialCountry = () => randomChoice(allCountries);
const initialCountry = getInitialCountry();

const initialUser: User = {
  name: '',
  country: initialCountry,
  age: 216, // 18 years in months
  status: 'None',
  assets: [],
  education: {
    currentLevel: 'high-school',
    currentInstitution: null,
    currentMajor: null,
    yearsInCurrentLevel: 4,
    gpa: 0,
    degrees: [],
    isEnrolled: false,
    graduationYear: null,
  },
  job: {
    name: 'Unemployed',
    salary: 0,
    promotions: 0,
    duration: 0,
    previousJobs: [],
    performance: 0,
    lastReview: 0,
  },
};

const initialBank: Bank = {
  balance: 0,
  id: randint(100000, 999999),
  loan: 0,
  hasLoan: false,
  transactions: 0,
  transactionsList: [],
};

const initialStats: GameStats = {
  health: randint(80, 100),
  morale: randint(70, 100),
  intellect: randint(40, 100),
  looks: randint(40, 100),
  karma: 0,
};

const initialStudent: Student = {
  hasStudentLoan: false,
  loanMonths: 0,
  loanAmount: 0,
  loanAmountPaid: 0,
  months: 0,
  course: null,
  collegeDuration: 0,
};

const initialRelationships: RelationshipState = {
  relationships: [],
  hasSpouse: false,
  spouseId: null,
  children: 0,
  totalFriends: 0,
};

const initialSkills: SkillsState = {
  skills: [],
  totalSkillPoints: 0,
};

const initialHealth: HealthState = {
  currentDiseases: [],
  hasInsurance: false,
  insuranceCost: 0,
  lastCheckup: 0,
  fitnessLevel: randint(50, 80),
  mentalHealth: randint(60, 90),
};

const initialHousing: HousingState = {
  currentProperty: null,
  isRenting: true,
  monthlyRent: 800,
  propertyHistory: [],
};

const initialVehicles: VehicleState = {
  currentVehicle: null,
  vehicleHistory: [],
  totalMilesDriven: 0,
  maintenanceScheduled: false,
};

const initialCredit: CreditState = {
  score: 650, // Average starting score
  activeLoans: [],
  loanHistory: [],
  totalDebt: 0,
  paymentHistory: [],
};

const initialInvestments: InvestmentState = {
  portfolio: [],
  totalValue: 0,
  totalInvested: 0,
  monthlyContribution: 0,
  retirementFund: 0,
};

const initialAchievements: AchievementState = {
  unlocked: [],
  totalPoints: 0,
};

const initialTravel: TravelState = {
  trips: [],
  totalCountriesVisited: 0,
  totalMoneySpent: 0,
  favoriteDestination: null,
  travelDays: 0,
};

const initialTax: TaxState = {
  filingHistory: [],
  currentYearIncome: 0,
  currentYearWithheld: 0,
  lastFiledYear: 0,
  totalTaxesPaid: 0,
  totalRefundsReceived: 0,
  totalPenaltiesPaid: 0,
  hasTaxDebt: false,
  taxDebtAmount: 0,
};

const initialTimeline: TimelineState = {
  events: [],
  milestones: [],
  totalEvents: 0,
};

const initialPets: PetsState = {
  currentPets: [],
  petHistory: [],
  totalPetsOwned: 0,
  totalSpentOnPets: 0,
};

const initialLegal: LegalState = {
  criminalRecord: [],
  isJailed: false,
  jailReleaseAge: 0,
  totalJailTime: 0,
  totalFinesPaid: 0,
  hasLawyer: false,
  lawyerCost: 0,
};

const initialBusiness: BusinessState = {
  ownedBusinesses: [],
  businessHistory: [],
  totalBusinessesStarted: 0,
  totalBusinessRevenue: 0,
  totalBusinessExpenses: 0,
};

const initialGambling: GamblingState = {
  activities: [],
  totalWagered: 0,
  totalWon: 0,
  totalLost: 0,
  biggestWin: 0,
  biggestLoss: 0,
  lotteryTickets: [],
  lastGambleAge: 0,
  gamblingStreak: 0,
};

const initialInsurance: InsuranceState = {
  policies: [],
  policyHistory: [],
  totalPremiumsPaid: 0,
  totalClaimsPaid: 0,
  hasActivePolicies: false,
};

const initialCharity: CharityState = {
  donations: [],
  recurringDonations: [],
  volunteerActivities: [],
  foundations: [],
  totalDonated: 0,
  totalVolunteerHours: 0,
  favoriteCharity: null,
  philanthropyLevel: 'none',
};

const initialAddictions: AddictionsState = {
  currentAddictions: [],
  recoveryHistory: [],
  activePrograms: [],
  totalRecoverySpent: 0,
  hasBeenAddicted: false,
};

// Core game state atoms (with persistence)
export const userAtom = atomWithStorage<User>('lifely-user', initialUser);
export const bankAtom = atomWithStorage<Bank>('lifely-bank', initialBank);
export const statsAtom = atomWithStorage<GameStats>('lifely-stats', initialStats);
export const studentAtom = atomWithStorage<Student>('lifely-student', initialStudent);
export const relationshipsAtom = atomWithStorage<RelationshipState>('lifely-relationships', initialRelationships);
export const skillsAtom = atomWithStorage<SkillsState>('lifely-skills', initialSkills);
export const healthAtom = atomWithStorage<HealthState>('lifely-health', initialHealth);
export const housingAtom = atomWithStorage<HousingState>('lifely-housing', initialHousing);
export const vehiclesAtom = atomWithStorage<VehicleState>('lifely-vehicles', initialVehicles);
export const creditAtom = atomWithStorage<CreditState>('lifely-credit', initialCredit);
export const investmentsAtom = atomWithStorage<InvestmentState>('lifely-investments', initialInvestments);
export const achievementsAtom = atomWithStorage<AchievementState>('lifely-achievements', initialAchievements);
export const travelAtom = atomWithStorage<TravelState>('lifely-travel', initialTravel);
export const taxAtom = atomWithStorage<TaxState>('lifely-tax', initialTax);
export const timelineAtom = atomWithStorage<TimelineState>('lifely-timeline', initialTimeline);
export const petsAtom = atomWithStorage<PetsState>('lifely-pets', initialPets);
export const legalAtom = atomWithStorage<LegalState>('lifely-legal', initialLegal);
export const businessAtom = atomWithStorage<BusinessState>('lifely-business', initialBusiness);
export const gamblingAtom = atomWithStorage<GamblingState>('lifely-gambling', initialGambling);
export const insuranceAtom = atomWithStorage<InsuranceState>('lifely-insurance', initialInsurance);
export const charityAtom = atomWithStorage<CharityState>('lifely-charity', initialCharity);
export const addictionsAtom = atomWithStorage<AddictionsState>('lifely-addictions', initialAddictions);

// Money (separate for easier access)
export const moneyAtom = atomWithStorage<number>('lifely-money', 0);

// Game state flags
export const isStudentAtom = atomWithStorage<boolean>('lifely-isStudent', false);
export const isJailedAtom = atomWithStorage<boolean>('lifely-isJailed', false);
export const hasJobAtom = atomWithStorage<boolean>('lifely-hasJob', false);

// UI state (not persisted)
export const alertsAtom = atom<Alert[]>([]);
export const consoleMessagesAtom = atom<ConsoleMessage[]>([]);
export const diseasesAtom = atom<Record<string, Disease>>({});

// Computed atoms
export const alertCountAtom = atom((get) => get(alertsAtom).length);

export const netWorthAtom = atom((get) => {
  const money = get(moneyAtom);
  const bank = get(bankAtom);
  const user = get(userAtom);
  const student = get(studentAtom);

  const assetsValue = user.assets.reduce((sum, asset) => sum + asset.value, 0);
  return money + bank.balance + assetsValue - bank.loan - student.loanAmount;
});

// Action atoms for game initialization
export const initializeGameAtom = atom(null, (get, set) => {
  const country = randomChoice(allCountries);
  const name = generateRandomName(country);

  set(userAtom, {
    ...initialUser,
    name,
    country,
  });

  set(bankAtom, {
    ...initialBank,
    id: randint(100000, 999999),
  });

  set(statsAtom, {
    health: randint(80, 100),
    morale: randint(70, 100),
    intellect: randint(40, 100),
    looks: randint(40, 100),
    karma: 0,
  });

  set(moneyAtom, 0);
  set(studentAtom, initialStudent);
  set(relationshipsAtom, initialRelationships);
  set(skillsAtom, initialSkills);
  set(healthAtom, {
    ...initialHealth,
    fitnessLevel: randint(50, 80),
    mentalHealth: randint(60, 90),
  });
  set(housingAtom, initialHousing);
  set(vehiclesAtom, initialVehicles);
  set(creditAtom, initialCredit);
  set(investmentsAtom, initialInvestments);
  set(achievementsAtom, initialAchievements);
  set(travelAtom, initialTravel);
  set(taxAtom, initialTax);
  set(timelineAtom, {
    events: [
      {
        id: '1',
        type: 'birth',
        category: 'milestone',
        title: 'Born',
        description: `You were born in ${country}`,
        age: 216, // 18 years
        timestamp: Date.now(),
      },
    ],
    milestones: [],
    totalEvents: 1,
  });
  set(petsAtom, initialPets);
  set(legalAtom, initialLegal);
  set(businessAtom, initialBusiness);
  set(gamblingAtom, initialGambling);
  set(insuranceAtom, initialInsurance);
  set(charityAtom, initialCharity);
  set(addictionsAtom, initialAddictions);
  set(isStudentAtom, false);
  set(isJailedAtom, false);
  set(hasJobAtom, false);
  set(alertsAtom, []);
  set(consoleMessagesAtom, [
    {
      id: '1',
      message: `You are ${name}`,
      timestamp: Date.now(),
    },
    {
      id: '2',
      message: `You live in ${country}`,
      timestamp: Date.now() + 1,
    },
  ]);
});

// Add console message
export const addConsoleMessageAtom = atom(null, (get, set, message: string) => {
  const messages = get(consoleMessagesAtom);
  const newMessage: ConsoleMessage = {
    id: `${Date.now()}-${Math.random()}`,
    message,
    timestamp: Date.now(),
  };

  // Keep only last 12 messages
  const updatedMessages = [...messages, newMessage].slice(-12);
  set(consoleMessagesAtom, updatedMessages);
});

// Add alert
export const addAlertAtom = atom(
  null,
  (get, set, alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const alerts = get(alertsAtom);
    const newAlert: Alert = {
      ...alert,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    set(alertsAtom, [...alerts, newAlert]);
  }
);

// Clear alert
export const clearAlertAtom = atom(null, (get, set, alertId: string) => {
  const alerts = get(alertsAtom);
  set(
    alertsAtom,
    alerts.filter((a) => a.id !== alertId)
  );
});

// Add timeline event
export const addTimelineEventAtom = atom(
  null,
  (get, set, event: Omit<TimelineEvent, 'id' | 'timestamp'>) => {
    const timeline = get(timelineAtom);
    const newEvent: TimelineEvent = {
      ...event,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    set(timelineAtom, {
      events: [...timeline.events, newEvent],
      milestones: timeline.milestones,
      totalEvents: timeline.totalEvents + 1,
    });
  }
);
