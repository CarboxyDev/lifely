import type { EducationLevel } from '../types';

export const educationLevelNames: Record<EducationLevel, string> = {
  none: 'No Education',
  elementary: 'Elementary School',
  'middle-school': 'Middle School',
  'high-school': 'High School',
  college: 'College',
  university: 'University',
  graduate: 'Graduate School',
  phd: 'PhD Program',
};

export const educationLevelDurations: Record<EducationLevel, number> = {
  none: 0,
  elementary: 6,
  'middle-school': 3,
  'high-school': 4,
  college: 2,
  university: 4,
  graduate: 2,
  phd: 5,
};

export const elementarySchools = [
  'Lincoln Elementary',
  'Washington Elementary',
  'Jefferson Elementary',
  'Madison Elementary',
  'Roosevelt Elementary',
  'Kennedy Elementary',
  'Wilson Elementary',
  'Jackson Elementary',
];

export const middleSchools = [
  'Central Middle School',
  'Riverside Middle School',
  'Oak Valley Middle School',
  'Parkside Middle School',
  'Meadow Brook Middle School',
  'Hillcrest Middle School',
];

export const highSchools = [
  'Central High School',
  'East Valley High School',
  'West Ridge High School',
  'North Star High School',
  'South Bay High School',
  'Lincoln High School',
  'Washington High School',
  'Roosevelt High School',
];

export const colleges = [
  'City Community College',
  'Valley Community College',
  'Riverside Community College',
  'Metropolitan Community College',
  'County Community College',
  'Central Community College',
];

export const universities = [
  'State University',
  'National University',
  'Metropolitan University',
  'Central University',
  'Riverside University',
  'Coastal University',
  'Mountain View University',
  'Valley State University',
  'Institute of Technology',
  'University of Science',
];

export const graduateSchools = [
  'State University Graduate School',
  'National University Graduate School',
  'Institute of Advanced Studies',
  'Graduate School of Arts and Sciences',
  'School of Graduate Studies',
];

export const phdPrograms = [
  'Doctoral Program at State University',
  'PhD Program at National University',
  'Research Institute PhD Program',
  'Advanced Doctoral Studies',
];

export const collegeMajors = [
  'Business Administration',
  'Computer Science',
  'Nursing',
  'Liberal Arts',
  'Engineering Technology',
  'Graphic Design',
  'Culinary Arts',
  'Criminal Justice',
];

export const universityMajors = [
  'Computer Science',
  'Engineering',
  'Business Administration',
  'Economics',
  'Psychology',
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'English Literature',
  'History',
  'Political Science',
  'Sociology',
  'Art',
  'Music',
  'Philosophy',
  'Medicine',
  'Law',
  'Architecture',
  'Nursing',
];

export const graduateMajors = [
  'Master of Business Administration',
  'Master of Science in Computer Science',
  'Master of Engineering',
  'Master of Arts in Psychology',
  'Master of Public Health',
  'Master of Education',
  'Master of Fine Arts',
  'Master of Social Work',
];

export const phdMajors = [
  'Computer Science',
  'Engineering',
  'Physics',
  'Chemistry',
  'Biology',
  'Mathematics',
  'Economics',
  'Psychology',
  'History',
  'Philosophy',
];

export function getInstitutionsForLevel(level: EducationLevel): string[] {
  switch (level) {
    case 'elementary':
      return elementarySchools;
    case 'middle-school':
      return middleSchools;
    case 'high-school':
      return highSchools;
    case 'college':
      return colleges;
    case 'university':
      return universities;
    case 'graduate':
      return graduateSchools;
    case 'phd':
      return phdPrograms;
    default:
      return [];
  }
}

export function getMajorsForLevel(level: EducationLevel): string[] {
  switch (level) {
    case 'college':
      return collegeMajors;
    case 'university':
      return universityMajors;
    case 'graduate':
      return graduateMajors;
    case 'phd':
      return phdMajors;
    default:
      return [];
  }
}

export function getNextEducationLevel(current: EducationLevel): EducationLevel | null {
  const progression: EducationLevel[] = [
    'none',
    'elementary',
    'middle-school',
    'high-school',
    'college',
    'university',
    'graduate',
    'phd',
  ];

  const currentIndex = progression.indexOf(current);
  if (currentIndex === -1 || currentIndex === progression.length - 1) {
    return null;
  }

  return progression[currentIndex + 1];
}

export function canEnrollInLevel(
  targetLevel: EducationLevel,
  currentEducation: { currentLevel: EducationLevel; degrees: any[] }
): boolean {
  const progression: EducationLevel[] = [
    'none',
    'elementary',
    'middle-school',
    'high-school',
    'college',
    'university',
    'graduate',
    'phd',
  ];

  const targetIndex = progression.indexOf(targetLevel);
  const currentIndex = progression.indexOf(currentEducation.currentLevel);

  // Can't go backwards
  if (targetIndex <= currentIndex) {
    return false;
  }

  // Must progress sequentially (or have the degree for the previous level)
  const requiredPreviousLevel = progression[targetIndex - 1];
  const hasDegreeForPreviousLevel = currentEducation.degrees.some(
    (d) => d.level === requiredPreviousLevel
  );

  return currentIndex === targetIndex - 1 || hasDegreeForPreviousLevel;
}
