import type { PoliticalParty, PoliticalOffice, Election, DiceModifier } from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

/**
 * Politics, elections, and civic engagement system
 */

export interface OfficeRequirements {
  office: PoliticalOffice;
  minAge: number; // in years
  minFame: number;
  minMoney: number;
  campaignCost: number;
}

export const officeRequirements: Record<PoliticalOffice, OfficeRequirements> = {
  mayor: {
    office: 'mayor',
    minAge: 18,
    minFame: 10,
    minMoney: 10000,
    campaignCost: 50000,
  },
  'state-rep': {
    office: 'state-rep',
    minAge: 18,
    minFame: 20,
    minMoney: 25000,
    campaignCost: 100000,
  },
  governor: {
    office: 'governor',
    minAge: 30,
    minFame: 40,
    minMoney: 100000,
    campaignCost: 5000000,
  },
  senator: {
    office: 'senator',
    minAge: 30,
    minFame: 50,
    minMoney: 150000,
    campaignCost: 10000000,
  },
  president: {
    office: 'president',
    minAge: 35,
    minFame: 80,
    minMoney: 1000000,
    campaignCost: 100000000,
  },
};

/**
 * Run for office with dice-based campaign success
 */
export function runForOffice(
  office: PoliticalOffice,
  playerName: string,
  playerParty: PoliticalParty,
  fame: number,
  intellect: number,
  looks: number,
  campaignFunds: number,
  politicalReputation: number,
  luck: number
): {
  won: boolean;
  votePercentage: number;
  totalVotes: number;
  opponentName: string;
  opponentVotePercentage: number;
  message: string;
} {
  const requirements = officeRequirements[office];

  // Generate opponent
  const opponentParties: PoliticalParty[] = ['liberal', 'conservative', 'progressive', 'libertarian'];
  const opponentParty = opponentParties[randint(0, 3)];
  const opponentName = `${['Sarah', 'John', 'Maria', 'David'][randint(0, 3)]} ${['Smith', 'Johnson', 'Williams'][randint(0, 2)]}`;

  // Calculate base support
  let playerSupport = 50; // Start at 50/50
  const opponentSupport = 50;

  // Modifiers for player
  const modifiers: DiceModifier[] = [
    { name: 'Fame', value: Math.floor(fame / 10), source: 'reputation' },
    { name: 'Intellect', value: Math.floor(intellect / 15), source: 'stat' },
    { name: 'Looks', value: Math.floor(looks / 20), source: 'stat' },
    { name: 'Campaign Funds', value: Math.floor(campaignFunds / requirements.campaignCost * 5), source: 'money' },
    { name: 'Political Rep', value: Math.floor(politicalReputation / 10), source: 'reputation' },
  ];

  // Campaign performance roll
  const campaignRoll = rollDice('d20', modifiers, luck);

  // Adjust support based on roll
  if (campaignRoll.criticalSuccess) {
    playerSupport += 30; // Landslide
  } else if (campaignRoll.criticalFailure) {
    playerSupport -= 30; // Disaster
  } else {
    const adjustment = (campaignRoll.modifiedRoll - 10) * 2;
    playerSupport += adjustment;
  }

  // Normalize to 100%
  const totalSupport = playerSupport + opponentSupport;
  const playerVotePercentage = Math.max(10, Math.min(90, (playerSupport / totalSupport) * 100));
  const opponentVotePercentage = 100 - playerVotePercentage;

  // Calculate total votes based on office
  const voterTurnout: Record<PoliticalOffice, number> = {
    mayor: 10000,
    'state-rep': 50000,
    governor: 2000000,
    senator: 3000000,
    president: 150000000,
  };

  const totalVotes = Math.round(voterTurnout[office] * playerVotePercentage / 100);
  const won = playerVotePercentage > 50;

  let message = '';
  if (won) {
    if (playerVotePercentage > 70) {
      message = `LANDSLIDE VICTORY! You won ${office} with ${playerVotePercentage.toFixed(1)}% of the vote!`;
    } else if (playerVotePercentage > 60) {
      message = `Strong victory! You won ${office} with ${playerVotePercentage.toFixed(1)}% of the vote.`;
    } else {
      message = `Close race! You narrowly won ${office} with ${playerVotePercentage.toFixed(1)}% of the vote.`;
    }
  } else {
    message = `You lost the ${office} race. ${opponentName} won with ${opponentVotePercentage.toFixed(1)}% of the vote.`;
  }

  return {
    won,
    votePercentage: Math.round(playerVotePercentage * 10) / 10,
    totalVotes,
    opponentName,
    opponentVotePercentage: Math.round(opponentVotePercentage * 10) / 10,
    message,
  };
}

/**
 * Calculate political influence and power
 */
export function calculatePoliticalPower(
  officesHeld: { office: PoliticalOffice; yearsServed: number }[],
  politicalReputation: number,
  wealth: number
): {
  powerLevel: number; // 0-100
  tier: 'citizen' | 'local-official' | 'state-official' | 'national-figure' | 'world-leader';
  influence: string[];
} {
  let powerLevel = 0;
  const influence: string[] = [];

  // Offices held
  for (const held of officesHeld) {
    const officePower: Record<PoliticalOffice, number> = {
      mayor: 10,
      'state-rep': 20,
      governor: 40,
      senator: 60,
      president: 100,
    };

    powerLevel += officePower[held.office];
    powerLevel += held.yearsServed * 2; // Experience bonus

    if (held.office === 'president') {
      influence.push('Former President - immense global influence');
    } else if (held.office === 'senator') {
      influence.push('Senate connections - federal legislation access');
    } else if (held.office === 'governor') {
      influence.push('State executive power');
    }
  }

  // Reputation
  powerLevel += politicalReputation / 2;

  // Wealth (money = influence)
  if (wealth > 10000000) {
    powerLevel += 20;
    influence.push('Major political donor - significant sway');
  } else if (wealth > 1000000) {
    powerLevel += 10;
    influence.push('Political donor');
  }

  // Determine tier
  let tier: 'citizen' | 'local-official' | 'state-official' | 'national-figure' | 'world-leader';
  if (powerLevel >= 90) {
    tier = 'world-leader';
  } else if (powerLevel >= 60) {
    tier = 'national-figure';
  } else if (powerLevel >= 30) {
    tier = 'state-official';
  } else if (powerLevel >= 10) {
    tier = 'local-official';
  } else {
    tier = 'citizen';
  }

  return {
    powerLevel: Math.min(100, Math.round(powerLevel)),
    tier,
    influence,
  };
}

/**
 * Voting impact on karma
 */
export function voteInElection(politicalAlignment: PoliticalParty): {
  karmaGain: number;
  message: string;
} {
  // Civic duty
  const karmaGain = 2;
  const message = `You voted in the election. Civic duty fulfilled! (+${karmaGain} karma)`;

  return { karmaGain, message };
}

/**
 * Political scandal dice roll
 */
export function politicalScandalCheck(
  officeHeld: PoliticalOffice | null,
  karma: number,
  luck: number
): {
  scandalOccurs: boolean;
  severity: 'minor' | 'moderate' | 'major' | 'career-ending';
  reputationLoss: number;
  forcedResignation: boolean;
  message: string;
} {
  if (!officeHeld) {
    return {
      scandalOccurs: false,
      severity: 'minor',
      reputationLoss: 0,
      forcedResignation: false,
      message: '',
    };
  }

  // Higher office = higher scandal risk
  const officeRisk: Record<PoliticalOffice, number> = {
    mayor: 5,
    'state-rep': 8,
    governor: 12,
    senator: 15,
    president: 20,
  };

  const baseRisk = officeRisk[officeHeld];
  const karmaModifier = Math.floor((50 - karma) / 10); // Bad karma increases risk

  const modifiers: DiceModifier[] = [
    { name: 'Karma', value: -karmaModifier, source: 'character' },
  ];

  const roll = rollDice('d100', modifiers, luck);

  if (roll.modifiedRoll > baseRisk) {
    return {
      scandalOccurs: false,
      severity: 'minor',
      reputationLoss: 0,
      forcedResignation: false,
      message: '',
    };
  }

  // Scandal occurs - determine severity
  const severityRoll = rollDice('d20', [], luck);
  let severity: 'minor' | 'moderate' | 'major' | 'career-ending';
  let reputationLoss: number;
  let forcedResignation: boolean;
  let message: string;

  if (severityRoll.criticalFailure) {
    severity = 'career-ending';
    reputationLoss = 80;
    forcedResignation = true;
    message = `MAJOR SCANDAL! Career-ending controversy forces your resignation from ${officeHeld}!`;
  } else if (severityRoll.modifiedRoll < 8) {
    severity = 'major';
    reputationLoss = 40;
    forcedResignation = officeHeld === 'president' || officeHeld === 'senator';
    message = `Major scandal damages your political career significantly.`;
  } else if (severityRoll.modifiedRoll < 14) {
    severity = 'moderate';
    reputationLoss = 20;
    forcedResignation = false;
    message = `Political scandal causes controversy and reputation damage.`;
  } else {
    severity = 'minor';
    reputationLoss = 10;
    forcedResignation = false;
    message = `Minor political controversy. Some negative press.`;
  }

  return {
    scandalOccurs: true,
    severity,
    reputationLoss,
    forcedResignation,
    message,
  };
}
