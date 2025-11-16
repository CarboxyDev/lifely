import type { SocialPlatform, ContentNiche, SocialMediaAccount, ContentPost, DiceModifier } from '../types';
import { rollDice, checkSuccess } from '../utils/dice-system';
import { randint } from '../utils/game-utils';

/**
 * Social media / influencer system with realistic growth mechanics
 */

export interface PlatformMetrics {
  platform: SocialPlatform;
  averageGrowthRate: number; // monthly %
  monetizationThreshold: number; // followers needed
  verificationThreshold: number;
  averageEngagementRate: number; // %
  timeInvestment: number; // hours per post
}

export const platformMetrics: Record<SocialPlatform, PlatformMetrics> = {
  youtube: {
    platform: 'youtube',
    averageGrowthRate: 5,
    monetizationThreshold: 1000,
    verificationThreshold: 100000,
    averageEngagementRate: 8,
    timeInvestment: 10, // Hours per video
  },
  instagram: {
    platform: 'instagram',
    averageGrowthRate: 8,
    monetizationThreshold: 10000,
    verificationThreshold: 50000,
    averageEngagementRate: 5,
    timeInvestment: 2,
  },
  tiktok: {
    platform: 'tiktok',
    averageGrowthRate: 15, // Can explode faster
    monetizationThreshold: 10000,
    verificationThreshold: 100000,
    averageEngagementRate: 12,
    timeInvestment: 3,
  },
  twitter: {
    platform: 'twitter',
    averageGrowthRate: 3,
    monetizationThreshold: 5000,
    verificationThreshold: 10000,
    averageEngagementRate: 2,
    timeInvestment: 0.5,
  },
  twitch: {
    platform: 'twitch',
    averageGrowthRate: 6,
    monetizationThreshold: 50,
    verificationThreshold: 10000,
    averageEngagementRate: 15,
    timeInvestment: 4, // Per stream
  },
  podcast: {
    platform: 'podcast',
    averageGrowthRate: 4,
    monetizationThreshold: 1000,
    verificationThreshold: 50000,
    averageEngagementRate: 20,
    timeInvestment: 6, // Per episode
  },
};

/**
 * Create content post with dice-based virality
 */
export function createContentPost(
  platform: SocialPlatform,
  niche: ContentNiche,
  contentQuality: number, // 0-100 based on skills/equipment
  currentFollowers: number,
  luck: number
): {
  post: Omit<ContentPost, 'id' | 'timestamp' | 'age'>;
  viralSuccess: boolean;
  viewsMultiplier: number;
} {
  const metrics = platformMetrics[platform];

  // Base views from current followers
  const baseViews = Math.round(currentFollowers * (metrics.averageEngagementRate / 100));

  // Dice roll for viral potential
  const modifiers: DiceModifier[] = [
    { name: 'Quality', value: Math.floor(contentQuality / 10), source: 'content' },
    { name: 'Platform Boost', value: Math.floor(metrics.averageGrowthRate / 5), source: 'platform' },
  ];

  const viralRoll = rollDice('d100', modifiers, luck);

  let viralSuccess = false;
  let viewsMultiplier = 1;

  if (viralRoll.criticalSuccess) {
    // Mega viral
    viralSuccess = true;
    viewsMultiplier = randint(50, 200);
  } else if (viralRoll.modifiedRoll >= 95) {
    // Very viral
    viralSuccess = true;
    viewsMultiplier = randint(20, 50);
  } else if (viralRoll.modifiedRoll >= 85) {
    // Viral
    viralSuccess = true;
    viewsMultiplier = randint(5, 20);
  } else if (viralRoll.modifiedRoll >= 70) {
    // Better than average
    viewsMultiplier = randint(2, 5);
  } else if (viralRoll.modifiedRoll < 20) {
    // Flopped
    viewsMultiplier = 0.3;
  }

  const views = Math.round(baseViews * viewsMultiplier);
  const likes = Math.round(views * (metrics.averageEngagementRate / 100));

  return {
    post: {
      platform,
      contentType: platform === 'twitch' ? 'stream' : platform === 'instagram' ? 'photo' : platform === 'twitter' ? 'text' : 'video',
      quality: contentQuality,
      views,
      likes,
      viralSuccess,
    },
    viralSuccess,
    viewsMultiplier,
  };
}

/**
 * Calculate follower growth from post
 */
export function calculateFollowerGrowth(
  views: number,
  likes: number,
  contentQuality: number,
  platform: SocialPlatform
): number {
  // Conversion rate: viewers to followers
  const baseConversionRate = 0.05; // 5%
  const qualityBonus = (contentQuality / 100) * 0.05;
  const engagementBonus = (likes / views) * 0.1;

  const conversionRate = Math.min(0.15, baseConversionRate + qualityBonus + engagementBonus);

  const newFollowers = Math.round(views * conversionRate);
  return newFollowers;
}

/**
 * Calculate monthly earnings from platform
 */
export function calculatePlatformEarnings(
  platform: SocialPlatform,
  followers: number,
  monthlyViews: number,
  isMonetized: boolean
): number {
  if (!isMonetized) return 0;

  const cpmRates: Record<SocialPlatform, number> = {
    youtube: 3.50, // $3.50 per 1000 views
    instagram: 5.00, // Sponsored posts
    tiktok: 2.00,
    twitter: 1.50,
    twitch: 4.00, // Subs + ads
    podcast: 18.00, // Higher CPM
  };

  const cpm = cpmRates[platform];
  const adRevenue = (monthlyViews / 1000) * cpm;

  return Math.round(adRevenue);
}

/**
 * Get sponsorship deal offers based on follower count
 */
export function getSponsorshipOffers(
  platform: SocialPlatform,
  niche: ContentNiche,
  followers: number,
  engagement: number
): {
  brand: string;
  paymentPerPost: number;
  postsRequired: number;
  minFollowers: number;
}[] {
  if (followers < 10000) return []; // Need minimum followers

  const nicheBrandMultiplier: Record<ContentNiche, number> = {
    tech: 1.5,
    fitness: 1.3,
    beauty: 1.4,
    gaming: 1.2,
    lifestyle: 1.0,
    cooking: 1.1,
    comedy: 0.9,
    education: 1.1,
    music: 1.0,
    travel: 1.3,
  };

  const basePaymentPer10k = 100; // $100 per 10k followers
  const followerTiers = Math.floor(followers / 10000);
  const nicheMultiplier = nicheBrandMultiplier[niche];
  const engagementMultiplier = engagement / 50; // High engagement = more value

  const payment = Math.round(basePaymentPer10k * followerTiers * nicheMultiplier * engagementMultiplier);

  const brands: string[] = [
    'NordVPN',
    'Raid Shadow Legends',
    'HelloFresh',
    'Skillshare',
    'Audible',
    'Ridge Wallet',
    'Keeps',
    'BetterHelp',
    'Squarespace',
    'Blue Apron',
  ];

  const offers = [];
  const offerCount = Math.min(3, Math.floor(followers / 50000) + 1);

  for (let i = 0; i < offerCount; i++) {
    offers.push({
      brand: brands[randint(0, brands.length - 1)],
      paymentPerPost: Math.round(payment * (0.8 + Math.random() * 0.4)),
      postsRequired: randint(2, 6),
      minFollowers: followers,
    });
  }

  return offers;
}

/**
 * Dice roll for controversy/cancellation
 */
export function controversyCheck(
  currentFollowers: number,
  karma: number,
  luck: number
): {
  controversy: boolean;
  severity: 'minor' | 'moderate' | 'severe' | 'career-ending';
  followerLoss: number;
  message: string;
} {
  // More followers = higher risk of controversy
  const riskLevel = Math.floor(currentFollowers / 100000); // +1 risk per 100k
  const karmaModifier = Math.floor((karma - 50) / 10); // Karma affects risk

  const modifiers: DiceModifier[] = [
    { name: 'Karma', value: karmaModifier, source: 'character' },
  ];

  const roll = rollDice('d100', modifiers, luck);

  // Base 5% chance, increases with followers
  const controversyThreshold = 95 - riskLevel;

  if (roll.modifiedRoll < controversyThreshold) {
    return {
      controversy: false,
      severity: 'minor',
      followerLoss: 0,
      message: '',
    };
  }

  let severity: 'minor' | 'moderate' | 'severe' | 'career-ending';
  let followerLossPercent: number;
  let message: string;

  if (roll.criticalFailure) {
    severity = 'career-ending';
    followerLossPercent = randint(60, 90);
    message = 'MAJOR SCANDAL! Your career is in ruins. Massive follower loss and sponsorships canceled.';
  } else if (roll.modifiedRoll >= 98) {
    severity = 'severe';
    followerLossPercent = randint(30, 50);
    message = 'Serious controversy. Lost many followers and sponsors are reconsidering.';
  } else if (roll.modifiedRoll >= 96) {
    severity = 'moderate';
    followerLossPercent = randint(10, 25);
    message = 'Controversial post caused backlash. Some followers unfollowed.';
  } else {
    severity = 'minor';
    followerLossPercent = randint(2, 8);
    message = 'Minor drama. A few followers upset.';
  }

  const followerLoss = Math.round(currentFollowers * (followerLossPercent / 100));

  return {
    controversy: true,
    severity,
    followerLoss,
    message,
  };
}

/**
 * Attempt to get verified
 */
export function applyForVerification(
  platform: SocialPlatform,
  followers: number,
  engagement: number,
  contentQuality: number,
  luck: number
): {
  approved: boolean;
  reason: string;
} {
  const metrics = platformMetrics[platform];

  if (followers < metrics.verificationThreshold) {
    return {
      approved: false,
      reason: `Need at least ${metrics.verificationThreshold.toLocaleString()} followers for verification.`,
    };
  }

  // Dice roll for approval
  const modifiers: DiceModifier[] = [
    { name: 'Engagement', value: Math.floor(engagement / 10), source: 'metrics' },
    { name: 'Quality', value: Math.floor(contentQuality / 15), source: 'content' },
    { name: 'Follower Count', value: Math.floor(followers / metrics.verificationThreshold), source: 'metrics' },
  ];

  const result = checkSuccess('d20', 15, modifiers, luck);

  if (result.success) {
    return {
      approved: true,
      reason: result.criticalSuccess
        ? 'Approved immediately! You clearly meet all criteria.'
        : 'Verification approved! You now have the verified badge.',
    };
  } else {
    return {
      approved: false,
      reason: 'Application denied. Try improving your content quality and engagement.',
    };
  }
}

/**
 * Calculate content quality based on skills and equipment
 */
export function calculateContentQuality(
  relevantSkillLevel: number, // Photography, video editing, writing, etc.
  equipmentValue: number, // How much spent on camera, mic, etc.
  creativity: number // 0-100
): number {
  const skillComponent = relevantSkillLevel * 0.5;
  const equipmentComponent = Math.min(30, Math.log10(equipmentValue + 1) * 10);
  const creativityComponent = creativity * 0.2;

  const quality = skillComponent + equipmentComponent + creativityComponent;
  return Math.min(100, Math.round(quality));
}

/**
 * Get content niche recommendations based on skills
 */
export function getNicheRecommendations(skills: { id: string; level: number }[]): ContentNiche[] {
  const recommendations: ContentNiche[] = [];

  const skillMap: Record<string, ContentNiche> = {
    programming: 'tech',
    'video-editing': 'lifestyle',
    cooking: 'cooking',
    fitness: 'fitness',
    photography: 'beauty',
    music: 'music',
    gaming: 'gaming',
    writing: 'education',
  };

  for (const skill of skills) {
    if (skill.level >= 30 && skillMap[skill.id]) {
      recommendations.push(skillMap[skill.id]);
    }
  }

  if (recommendations.length === 0) {
    recommendations.push('lifestyle', 'comedy');
  }

  return [...new Set(recommendations)]; // Unique values
}

/**
 * Burnout system for overposting
 */
export function checkCreatorBurnout(
  postsThisMonth: number,
  platform: SocialPlatform,
  morale: number
): {
  burnedOut: boolean;
  qualityPenalty: number;
  message: string;
} {
  const metrics = platformMetrics[platform];
  const sustainablePosts = Math.ceil(30 / metrics.timeInvestment); // Posts per month

  if (postsThisMonth <= sustainablePosts) {
    return {
      burnedOut: false,
      qualityPenalty: 0,
      message: '',
    };
  }

  const overwork = postsThisMonth - sustainablePosts;
  const burnoutRisk = (overwork / sustainablePosts) * 100;
  const moraleFactor = (100 - morale) / 100;

  let qualityPenalty = Math.min(50, Math.round(burnoutRisk * moraleFactor));

  if (qualityPenalty > 30) {
    return {
      burnedOut: true,
      qualityPenalty,
      message: 'BURNED OUT! You posted way too much. Content quality is suffering badly.',
    };
  } else if (qualityPenalty > 15) {
    return {
      burnedOut: false,
      qualityPenalty,
      message: 'Posting frequently is taking a toll. Quality is declining.',
    };
  } else {
    return {
      burnedOut: false,
      qualityPenalty,
      message: 'Pushing hard on content creation.',
    };
  }
}
