import type {
  GraduateDegree,
  ResearchField,
  DiceModifier,
  Scholarship,
  AcademicAchievement,
  Publication,
} from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

/**
 * Advanced education system - graduate school, research, scholarships
 */

export interface GraduateProgramInfo {
  degree: GraduateDegree;
  name: string;
  yearsRequired: number;
  averageTuition: number;
  admissionDifficulty: number; // DC for dice roll
  careerBoost: {
    salaryIncrease: number; // percentage
    prestigeGain: number;
  };
  fields: ResearchField[];
}

export const graduateProgramTypes: Record<GraduateDegree, GraduateProgramInfo> = {
  masters: {
    degree: 'masters',
    name: 'Master\'s Degree',
    yearsRequired: 2,
    averageTuition: 30000,
    admissionDifficulty: 14,
    careerBoost: {
      salaryIncrease: 25,
      prestigeGain: 20,
    },
    fields: ['stem', 'humanities', 'social-sciences', 'business'],
  },
  phd: {
    degree: 'phd',
    name: 'PhD',
    yearsRequired: 5,
    averageTuition: 35000,
    admissionDifficulty: 17,
    careerBoost: {
      salaryIncrease: 40,
      prestigeGain: 50,
    },
    fields: ['stem', 'humanities', 'social-sciences'],
  },
  mba: {
    degree: 'mba',
    name: 'MBA',
    yearsRequired: 2,
    averageTuition: 60000,
    admissionDifficulty: 15,
    careerBoost: {
      salaryIncrease: 50,
      prestigeGain: 35,
    },
    fields: ['business'],
  },
  jd: {
    degree: 'jd',
    name: 'Juris Doctor (Law Degree)',
    yearsRequired: 3,
    averageTuition: 50000,
    admissionDifficulty: 16,
    careerBoost: {
      salaryIncrease: 60,
      prestigeGain: 40,
    },
    fields: ['law'],
  },
  md: {
    degree: 'md',
    name: 'Medical Degree',
    yearsRequired: 4,
    averageTuition: 55000,
    admissionDifficulty: 18,
    careerBoost: {
      salaryIncrease: 100,
      prestigeGain: 60,
    },
    fields: ['medical'],
  },
};

export const topUniversities = [
  { name: 'Harvard University', prestige: 100, tuitionMultiplier: 1.5 },
  { name: 'Stanford University', prestige: 98, tuitionMultiplier: 1.5 },
  { name: 'MIT', prestige: 98, tuitionMultiplier: 1.5 },
  { name: 'Yale University', prestige: 95, tuitionMultiplier: 1.4 },
  { name: 'Princeton University', prestige: 95, tuitionMultiplier: 1.4 },
  { name: 'Columbia University', prestige: 92, tuitionMultiplier: 1.3 },
  { name: 'University of Chicago', prestige: 90, tuitionMultiplier: 1.3 },
  { name: 'UC Berkeley', prestige: 88, tuitionMultiplier: 1.1 },
  { name: 'University of Michigan', prestige: 85, tuitionMultiplier: 1.0 },
  { name: 'State University', prestige: 70, tuitionMultiplier: 0.7 },
];

/**
 * Apply to graduate program (dice-based)
 */
export function applyToGraduateProgram(
  degree: GraduateDegree,
  field: ResearchField,
  universityPrestige: number,
  undergradGPA: number, // 0.0-4.0
  intellect: number,
  relevantSkills: number, // 0-100
  recommendationQuality: number, // 0-100
  luck: number
): {
  accepted: boolean;
  fellowship: boolean;
  fellowshipAmount: number;
  tuition: number;
  message: string;
} {
  const programInfo = graduateProgramTypes[degree];

  const modifiers: DiceModifier[] = [];

  // GPA is crucial
  const gpaBonus = Math.floor((undergradGPA - 2.0) * 3); // 4.0 GPA = +6
  modifiers.push({ name: 'Undergraduate GPA', value: gpaBonus, source: 'academic' });

  // Intellect helps
  modifiers.push({ name: 'Intellect', value: Math.floor(intellect / 20), source: 'stat' });

  // Relevant skills
  modifiers.push({ name: 'Relevant Experience', value: Math.floor(relevantSkills / 25), source: 'skill' });

  // Recommendation letters
  modifiers.push({ name: 'Recommendations', value: Math.floor(recommendationQuality / 25), source: 'support' });

  // Prestige penalty (harder to get into top schools)
  const prestigePenalty = Math.floor((universityPrestige - 70) / 10);
  if (prestigePenalty > 0) {
    modifiers.push({ name: 'Elite University', value: -prestigePenalty, source: 'difficulty' });
  }

  const admissionRoll = checkSuccess('d20', programInfo.admissionDifficulty, modifiers, luck);

  if (!admissionRoll.success) {
    return {
      accepted: false,
      fellowship: false,
      fellowshipAmount: 0,
      tuition: 0,
      message: 'Application rejected. Your credentials were not competitive enough.',
    };
  }

  // Accepted! Now check for fellowship funding
  const fellowshipModifiers: DiceModifier[] = [
    { name: 'Academic Excellence', value: gpaBonus, source: 'academic' },
    { name: 'Research Potential', value: Math.floor(relevantSkills / 20), source: 'potential' },
  ];

  const fellowshipRoll = checkSuccess('d20', 15, fellowshipModifiers, luck);

  const university = topUniversities.find(u => u.prestige === universityPrestige) || topUniversities[topUniversities.length - 1];
  const tuition = Math.round(programInfo.averageTuition * university.tuitionMultiplier);

  let fellowship = false;
  let fellowshipAmount = 0;
  let message = '';

  if (admissionRoll.criticalSuccess || fellowshipRoll.criticalSuccess) {
    fellowship = true;
    fellowshipAmount = tuition + 30000; // Full ride + stipend
    message = `Congratulations! Accepted with FULL FELLOWSHIP to ${university.name}! All tuition covered plus $30k/year stipend.`;
  } else if (fellowshipRoll.success) {
    fellowship = true;
    fellowshipAmount = Math.round(tuition * 0.5); // Partial funding
    message = `Accepted to ${university.name} with partial fellowship (50% tuition covered)!`;
  } else {
    fellowship = false;
    message = `Accepted to ${university.name}! Annual tuition: $${tuition.toLocaleString()}`;
  }

  return {
    accepted: true,
    fellowship,
    fellowshipAmount,
    tuition,
    message,
  };
}

/**
 * Scholarship application (dice-based)
 */
export function applyForScholarship(
  scholarshipType: 'academic' | 'need-based' | 'athletic' | 'diversity' | 'research',
  gpa: number,
  financialNeed: number, // 0-100
  specialQualification: number, // 0-100 (athletics, research, etc.)
  luck: number
): {
  awarded: boolean;
  amount: number;
  duration: number; // years
  name: string;
  renewable: boolean;
} {
  const scholarships: Record<typeof scholarshipType, {
    baseName: string;
    minAmount: number;
    maxAmount: number;
    difficulty: number;
    renewable: boolean;
  }> = {
    academic: {
      baseName: 'Academic Excellence Scholarship',
      minAmount: 5000,
      maxAmount: 25000,
      difficulty: 14,
      renewable: true,
    },
    'need-based': {
      baseName: 'Financial Aid Grant',
      minAmount: 3000,
      maxAmount: 15000,
      difficulty: 12,
      renewable: true,
    },
    athletic: {
      baseName: 'Athletic Scholarship',
      minAmount: 10000,
      maxAmount: 50000,
      difficulty: 15,
      renewable: true,
    },
    diversity: {
      baseName: 'Diversity Scholarship',
      minAmount: 4000,
      maxAmount: 20000,
      difficulty: 13,
      renewable: true,
    },
    research: {
      baseName: 'Research Fellowship',
      minAmount: 15000,
      maxAmount: 40000,
      difficulty: 16,
      renewable: false,
    },
  };

  const scholarship = scholarships[scholarshipType];
  const modifiers: DiceModifier[] = [];

  if (scholarshipType === 'academic') {
    modifiers.push({ name: 'GPA', value: Math.floor((gpa - 2.0) * 3), source: 'academic' });
  } else if (scholarshipType === 'need-based') {
    modifiers.push({ name: 'Financial Need', value: Math.floor(financialNeed / 20), source: 'need' });
  } else if (scholarshipType === 'athletic' || scholarshipType === 'diversity' || scholarshipType === 'research') {
    modifiers.push({ name: 'Qualification', value: Math.floor(specialQualification / 20), source: 'qualification' });
  }

  const result = checkSuccess('d20', scholarship.difficulty, modifiers, luck);

  if (!result.success) {
    return {
      awarded: false,
      amount: 0,
      duration: 0,
      name: scholarship.baseName,
      renewable: false,
    };
  }

  const amount = result.criticalSuccess
    ? scholarship.maxAmount
    : randint(scholarship.minAmount, scholarship.maxAmount);

  const duration = randint(1, 4); // 1-4 years

  return {
    awarded: true,
    amount,
    duration,
    name: scholarship.baseName,
    renewable: scholarship.renewable,
  };
}

/**
 * Thesis/dissertation defense (dice-based)
 */
export function defendThesis(
  researchQuality: number, // 0-100
  presentationSkills: number, // 0-100
  committeeHarshness: number, // 0-100
  intellect: number,
  luck: number
): {
  passed: boolean;
  distinction: boolean; // Pass with distinction
  revisions: 'none' | 'minor' | 'major';
  message: string;
  fameGain: number;
} {
  const modifiers: DiceModifier[] = [
    { name: 'Research Quality', value: Math.floor(researchQuality / 15), source: 'research' },
    { name: 'Presentation', value: Math.floor(presentationSkills / 20), source: 'skill' },
    { name: 'Intellect', value: Math.floor(intellect / 20), source: 'stat' },
    { name: 'Tough Committee', value: -Math.floor(committeeHarshness / 25), source: 'difficulty' },
  ];

  const defenseRoll = checkSuccess('d20', 14, modifiers, luck);

  let passed = defenseRoll.success;
  let distinction = defenseRoll.criticalSuccess;
  let revisions: 'none' | 'minor' | 'major' = 'none';
  let message = '';
  let fameGain = 0;

  if (distinction) {
    passed = true;
    revisions = 'none';
    fameGain = 50;
    message = 'PASS WITH DISTINCTION! Committee unanimously praised your groundbreaking research!';
  } else if (defenseRoll.success && defenseRoll.roll >= 16) {
    passed = true;
    revisions = 'none';
    fameGain = 30;
    message = 'Passed! Committee accepted your thesis without revisions. Excellent work!';
  } else if (defenseRoll.success) {
    passed = true;
    revisions = 'minor';
    fameGain = 20;
    message = 'Passed with minor revisions. You have 2 months to address committee feedback.';
  } else if (defenseRoll.criticalFailure) {
    passed = false;
    revisions = 'major';
    fameGain = 0;
    message = 'FAILED. Committee found fundamental flaws. 6+ months of work required to resubmit.';
  } else {
    passed = false;
    revisions = 'major';
    fameGain = 0;
    message = 'Did not pass. Major revisions required. Rescheduled for next semester.';
  }

  return {
    passed,
    distinction,
    revisions,
    message,
    fameGain,
  };
}

/**
 * Research publication attempt (dice-based)
 */
export function submitResearchPaper(
  researchQuality: number, // 0-100
  novelty: number, // 0-100
  journalPrestige: number, // 0-100
  intellect: number,
  field: ResearchField,
  luck: number
): {
  accepted: boolean;
  impactFactor: number;
  citations: number; // Predicted
  reviseAndResubmit: boolean;
  message: string;
  fameGain: number;
} {
  const modifiers: DiceModifier[] = [
    { name: 'Research Quality', value: Math.floor(researchQuality / 15), source: 'research' },
    { name: 'Novelty', value: Math.floor(novelty / 20), source: 'innovation' },
    { name: 'Intellect', value: Math.floor(intellect / 25), source: 'stat' },
  ];

  // Higher prestige journals are harder to get into
  const difficulty = 10 + Math.floor(journalPrestige / 10);

  const submissionRoll = checkSuccess('d20', difficulty, modifiers, luck);

  let accepted = submissionRoll.success;
  let reviseAndResubmit = false;
  let impactFactor = 0;
  let citations = 0;
  let message = '';
  let fameGain = 0;

  if (submissionRoll.criticalSuccess) {
    accepted = true;
    impactFactor = randint(80, 100);
    citations = randint(100, 500);
    fameGain = 100;
    message = 'Accepted in top-tier journal! Paper is generating significant interest in the field!';
  } else if (submissionRoll.success) {
    accepted = true;
    impactFactor = randint(40, 75);
    citations = randint(20, 100);
    fameGain = 50;
    message = 'Paper accepted! Published in respected journal.';
  } else if (submissionRoll.roll >= difficulty - 3) {
    accepted = false;
    reviseAndResubmit = true;
    fameGain = 0;
    message = 'Revise and resubmit. Reviewers see potential but want major revisions.';
  } else {
    accepted = false;
    reviseAndResubmit = false;
    fameGain = 0;
    message = 'Rejected. Reviewers found significant issues with methodology.';
  }

  return {
    accepted,
    impactFactor,
    citations,
    reviseAndResubmit,
    message,
    fameGain,
  };
}

/**
 * Study abroad application
 */
export function applyForStudyAbroad(
  gpa: number,
  languageSkills: number, // 0-100
  financialResources: number,
  destinationPopularity: number, // 0-100 (higher = more competitive)
  luck: number
): {
  accepted: boolean;
  scholarshipPercentage: number; // 0-100
  message: string;
} {
  const modifiers: DiceModifier[] = [
    { name: 'GPA', value: Math.floor((gpa - 2.5) * 2), source: 'academic' },
    { name: 'Language Skills', value: Math.floor(languageSkills / 20), source: 'skill' },
  ];

  const difficulty = 12 + Math.floor(destinationPopularity / 25);

  const result = checkSuccess('d20', difficulty, modifiers, luck);

  if (!result.success) {
    return {
      accepted: false,
      scholarshipPercentage: 0,
      message: 'Application denied. Too competitive this year.',
    };
  }

  // Scholarship calculation
  let scholarshipPercentage = 0;
  if (result.criticalSuccess) {
    scholarshipPercentage = 100;
  } else if (result.roll >= 18) {
    scholarshipPercentage = randint(70, 90);
  } else if (result.roll >= 15) {
    scholarshipPercentage = randint(40, 60);
  } else {
    scholarshipPercentage = randint(10, 30);
  }

  const message = scholarshipPercentage === 100
    ? 'Accepted with FULL scholarship!'
    : scholarshipPercentage >= 50
    ? `Accepted with ${scholarshipPercentage}% scholarship!`
    : `Accepted! ${scholarshipPercentage}% scholarship awarded.`;

  return {
    accepted: true,
    scholarshipPercentage,
    message,
  };
}

/**
 * Academic probation check
 */
export function checkAcademicProbation(
  gpa: number,
  credits: number,
  warnings: number
): {
  status: 'good-standing' | 'deans-list' | 'probation' | 'suspended' | 'expelled';
  message: string;
} {
  if (gpa >= 3.7 && credits >= 12) {
    return {
      status: 'deans-list',
      message: 'Dean\'s List! Exceptional academic performance!',
    };
  }

  if (gpa >= 2.0) {
    return {
      status: 'good-standing',
      message: 'Good academic standing.',
    };
  }

  if (gpa >= 1.5 && warnings < 2) {
    return {
      status: 'probation',
      message: 'Academic probation. You have one semester to raise your GPA above 2.0.',
    };
  }

  if (gpa >= 1.0 || warnings === 2) {
    return {
      status: 'suspended',
      message: 'Academically suspended. You cannot enroll for one year.',
    };
  }

  return {
    status: 'expelled',
    message: 'Expelled from university. Academic dismissal is permanent.',
  };
}

/**
 * Conference presentation (dice-based)
 */
export function presentAtConference(
  researchQuality: number,
  presentationSkills: number,
  conferencePrestige: number,
  intellect: number,
  luck: number
): {
  wellReceived: boolean;
  networkingContacts: number;
  fameGain: number;
  jobOffers: number;
  message: string;
} {
  const modifiers: DiceModifier[] = [
    { name: 'Research Quality', value: Math.floor(researchQuality / 15), source: 'research' },
    { name: 'Presentation Skills', value: Math.floor(presentationSkills / 15), source: 'skill' },
    { name: 'Intellect', value: Math.floor(intellect / 25), source: 'stat' },
  ];

  const result = checkSuccess('d20', 13, modifiers, luck);

  let wellReceived = result.success;
  let networkingContacts = 0;
  let fameGain = 0;
  let jobOffers = 0;
  let message = '';

  if (result.criticalSuccess) {
    wellReceived = true;
    networkingContacts = randint(15, 30);
    fameGain = Math.round(conferencePrestige * 0.8);
    jobOffers = randint(2, 4);
    message = 'Standing ovation! Your presentation was the talk of the conference. Multiple job offers received!';
  } else if (result.success) {
    wellReceived = true;
    networkingContacts = randint(5, 15);
    fameGain = Math.round(conferencePrestige * 0.4);
    jobOffers = randint(0, 2);
    message = 'Well received! Made valuable connections in your field.';
  } else {
    wellReceived = false;
    networkingContacts = randint(0, 3);
    fameGain = 0;
    jobOffers = 0;
    message = 'Presentation was poorly received. Tough questions exposed weaknesses in your research.';
  }

  return {
    wellReceived,
    networkingContacts,
    fameGain,
    jobOffers,
    message,
  };
}
