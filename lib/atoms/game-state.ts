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
  MentalHealthState,
  StockMarketState,
  CryptoState,
  DiceState,
  HobbiesState,
  SocialMediaState,
  DisasterState,
  PoliticsState,
  EstateState,
  ReputationState,
  RandomEventsState,
  ExpandedEducationState,
  CalendarState,
  PerksState,
  SkillTreeState,
  NPCState,
} from '../types';
import { randint } from '../utils/game-utils';
import { randomChoice } from '../utils/game-utils';
import { allCountries } from '../data/countries';
import { generateRandomName } from '../utils/name-generator';
import { createInitialCalendarState } from '../utils/calendar-system';
import { getRandomBirthTraits, unlockablePerks } from '../data/perks';

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
  unlockedAchievements: [],
  achievementProgress: [],
  totalAchievements: 0,
  totalPoints: 0,
  recentlyUnlocked: [],
  eventCounts: {},
  specialConditions: {},
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
  onProbation: false,
  probationMonthsRemaining: 0,
  probationViolations: 0,
  parole: {
    eligible: false,
    eligibilityAge: 0,
    onParole: false,
    paroleOfficer: '',
    paroleViolations: 0,
    paroleEndAge: 0,
    restrictions: [],
  },
  communityServiceHours: 0,
  communityServiceCompleted: 0,
  felonyCount: 0,
  canExpunge: false,
  expungedCrimes: 0,
  hasWarrant: false,
  inWitnessProtection: false,
  courtTrials: [],
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

const initialMentalHealth: MentalHealthState = {
  currentConditions: [],
  mentalHealthHistory: [],
  activeTherapy: null,
  events: [],
  totalTherapyCost: 0,
  stressLevel: randint(30, 60),
  copingSkills: randint(40, 70),
  supportNetwork: randint(50, 80),
  mentalHealthDaysTaken: 0,
};

const initialStockMarket: StockMarketState = {
  holdings: [],
  transactionHistory: [],
  totalInvested: 0,
  totalDividendsReceived: 0,
  currentMarketCondition: 'stable',
  marketSentiment: 0,
  lastMarketUpdate: 0,
};

const initialCrypto: CryptoState = {
  holdings: [],
  stakedCoins: [],
  transactionHistory: [],
  totalInvested: 0,
  totalStakingRewards: 0,
  marketBoom: false,
  lastUpdate: 0,
};

const initialDice: DiceState = {
  rollHistory: [],
  totalRolls: 0,
  criticalSuccesses: 0,
  criticalFailures: 0,
  luckStat: randint(40, 60),
  blessedUntilAge: 0,
  cursedUntilAge: 0,
};

const initialHobbies: HobbiesState = {
  activeHobbies: [],
  hobbyHistory: [],
  totalHoursAllHobbies: 0,
  totalMoneySpent: 0,
  achievements: [],
};

const initialSocialMedia: SocialMediaState = {
  accounts: [],
  postHistory: [],
  sponsorships: [],
  totalEarnings: 0,
  totalFollowers: 0,
  viralPosts: 0,
  canceledCount: 0,
  fame: 0,
};

const initialDisasters: DisasterState = {
  disasterHistory: [],
  totalDisastersDamage: 0,
  hasDisasterInsurance: false,
  disasterInsuranceCost: 0,
  emergencyFundUsed: 0,
  lastDisasterAge: 0,
};

const initialPolitics: PoliticsState = {
  politicalAlignment: 'independent',
  hasVoted: false,
  electionHistory: [],
  officesHeld: [],
  campaignFundsRaised: 0,
  politicalReputation: 0,
  lobbyingInfluence: 0,
};

const initialEstate: EstateState = {
  currentWill: null,
  willHistory: [],
  trusts: [],
  inheritances: [],
  totalInherited: 0,
  hasLivingWill: false,
  hasPowerOfAttorney: false,
  powerOfAttorneyHolder: null,
  estatePlanningCost: 0,
  estimatedEstateTax: 0,
};

const initialReputation: ReputationState = {
  fameLevel: 'unknown',
  famePoints: 0,
  reputation: 0,
  reputationType: 'neutral',
  mediaAppearances: [],
  endorsements: [],
  scandals: [],
  awards: [],
  recognitionRate: 0,
  paparazziLevel: 0,
  hasPublicist: false,
  publicistCost: 0,
  hasBodyguard: false,
  bodyguardCost: 0,
  fanClubSize: 0,
  haters: 0,
  totalMediaValue: 0,
  publicPerception: 'Nobody knows who you are.',
};

const initialRandomEvents: RandomEventsState = {
  eventsHistory: [],
  totalEventsExperienced: 0,
  bestEvent: null,
  worstEvent: null,
  pendingEvent: null,
  miraclesExperienced: 0,
  catastrophesExperienced: 0,
  luckStreak: 0,
  unluckyStreak: 0,
};

const initialExpandedEducation: ExpandedEducationState = {
  graduatePrograms: [],
  currentGradProgram: null,
  academicStatus: 'good-standing',
  scholarships: [],
  academicAchievements: [],
  publications: [],
  studyAbroadHistory: [],
  cumulativeGPA: 0,
  totalCredits: 0,
  studentOrganizations: [],
  academicProbationCount: 0,
  totalScholarshipMoney: 0,
  thesesDefended: 0,
  conferencesPresentedAt: 0,
};

// Initialize calendar - starts at 18 years old
const initialCalendar = createInitialCalendarState();

// Initialize perks - assign random birth traits
const birthTraits = getRandomBirthTraits();
const initialPerks: PerksState = {
  activePerks: [...birthTraits.positiveTraits, ...birthTraits.negativeTraits],
  birthTraits: [...birthTraits.positiveTraits, ...birthTraits.negativeTraits],
  unlockedPerks: [],
  availablePerks: unlockablePerks,
  totalPerksUnlocked: 0,
  totalFlaws: birthTraits.negativeTraits.length,
};

// Initialize skill tree
const initialSkillTree: SkillTreeState = {
  unlockedSkills: [],
  availableSkillPoints: 0,
  totalSkillPointsEarned: 0,
  totalSkillPointsSpent: 0,
  skillPointSources: {
    fromLevels: 0,
    fromAchievements: 0,
    fromEvents: 0,
    fromOther: 0,
  },
  activeBonuses: {
    statModifiers: {
      health: 0,
      morale: 0,
      intellect: 0,
      looks: 0,
    },
    multipliers: {},
    special: {},
  },
};

// Initialize NPC state
const initialNPCState: NPCState = {
  knownNPCs: [],
  interactions: [],
  totalNPCsMet: 0,
  currentRomanticPartner: null,
  bestFriendId: null,
  nemesisId: null,
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
export const mentalHealthAtom = atomWithStorage<MentalHealthState>('lifely-mental-health', initialMentalHealth);
export const stockMarketAtom = atomWithStorage<StockMarketState>('lifely-stock-market', initialStockMarket);
export const cryptoAtom = atomWithStorage<CryptoState>('lifely-crypto', initialCrypto);
export const diceAtom = atomWithStorage<DiceState>('lifely-dice', initialDice);
export const hobbiesAtom = atomWithStorage<HobbiesState>('lifely-hobbies', initialHobbies);
export const socialMediaAtom = atomWithStorage<SocialMediaState>('lifely-social-media', initialSocialMedia);
export const disastersAtom = atomWithStorage<DisasterState>('lifely-disasters', initialDisasters);
export const politicsAtom = atomWithStorage<PoliticsState>('lifely-politics', initialPolitics);
export const estateAtom = atomWithStorage<EstateState>('lifely-estate', initialEstate);
export const reputationAtom = atomWithStorage<ReputationState>('lifely-reputation', initialReputation);
export const randomEventsAtom = atomWithStorage<RandomEventsState>('lifely-random-events', initialRandomEvents);
export const expandedEducationAtom = atomWithStorage<ExpandedEducationState>('lifely-expanded-education', initialExpandedEducation);
export const calendarAtom = atomWithStorage<CalendarState>('lifely-calendar', initialCalendar);
export const perksAtom = atomWithStorage<PerksState>('lifely-perks', initialPerks);
export const skillTreeAtom = atomWithStorage<SkillTreeState>('lifely-skill-tree', initialSkillTree);
export const npcStateAtom = atomWithStorage<NPCState>('lifely-npcs', initialNPCState);

// Money (separate for easier access)
export const moneyAtom = atomWithStorage<number>('lifely-money', 0);

// Game state flags
export const isStudentAtom = atomWithStorage<boolean>('lifely-isStudent', false);
export const isJailedAtom = atomWithStorage<boolean>('lifely-isJailed', false);
export const hasJobAtom = atomWithStorage<boolean>('lifely-hasJob', false);

// UI state
export const alertsAtom = atom<Alert[]>([]);
export const consoleMessagesAtom = atomWithStorage<ConsoleMessage[]>('lifely-console-messages', []);
export const activityFeedPageAtom = atomWithStorage<number>('lifely-activity-page', 0);
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
  set(mentalHealthAtom, {
    ...initialMentalHealth,
    stressLevel: randint(30, 60),
    copingSkills: randint(40, 70),
    supportNetwork: randint(50, 80),
  });
  set(stockMarketAtom, initialStockMarket);
  set(cryptoAtom, initialCrypto);
  set(diceAtom, { ...initialDice, luckStat: randint(40, 60) });
  set(hobbiesAtom, initialHobbies);
  set(socialMediaAtom, initialSocialMedia);
  set(disastersAtom, initialDisasters);
  set(politicsAtom, initialPolitics);
  set(estateAtom, initialEstate);
  set(reputationAtom, initialReputation);
  set(randomEventsAtom, initialRandomEvents);
  set(expandedEducationAtom, initialExpandedEducation);
  set(calendarAtom, createInitialCalendarState());

  // Reset perks with new random birth traits
  const newBirthTraits = getRandomBirthTraits();
  set(perksAtom, {
    activePerks: [...newBirthTraits.positiveTraits, ...newBirthTraits.negativeTraits],
    birthTraits: [...newBirthTraits.positiveTraits, ...newBirthTraits.negativeTraits],
    unlockedPerks: [],
    availablePerks: unlockablePerks,
    totalPerksUnlocked: 0,
    totalFlaws: newBirthTraits.negativeTraits.length,
  });

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

  // Keep all messages - we have pagination now
  const updatedMessages = [...messages, newMessage];
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
