export const formatAge = (ageInMonths: number | undefined) => {
  if (ageInMonths == undefined) return '00y 0m';

  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;
  return `${years}y ${months}m`;
};
