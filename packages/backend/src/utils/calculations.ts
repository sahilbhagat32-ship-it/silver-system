/**
 * Diet & Weight Loss Calculator - Core Calculation Engine
 * Uses best formulas for all body types
 */

export interface UserMetrics {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
  bodyFatPercentage?: number;
}

export interface DietPlan {
  bmr: number;
  tdee: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  dailyCalorieDeficit: number;
  weeklyWeightLoss: number;
  estimatedWeeksToGoal: number;
  dailyCalorieTarget: number;
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

export function calculateBMR_MifflinStJeor(metrics: UserMetrics): number {
  const { age, weight, height, gender } = metrics;
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function calculateBMR_KatchMcArdle(metrics: UserMetrics): number {
  if (!metrics.bodyFatPercentage) {
    return calculateBMR_MifflinStJeor(metrics);
  }
  const leanBodyMass = metrics.weight * (1 - metrics.bodyFatPercentage / 100);
  return 370 + 21.6 * leanBodyMass;
}

export function calculateTDEE(metrics: UserMetrics, bmr: number): number {
  const multiplier = ACTIVITY_MULTIPLIERS[metrics.activityLevel];
  return bmr * multiplier;
}

export function calculateMacros(tdee: number, weight: number, deficit: number): { protein: number; carbs: number; fats: number } {
  const caloriesForDiet = tdee - deficit;
  const proteinGrams = weight * 2.0;
  const proteinCalories = proteinGrams * 4;
  const fatCalories = caloriesForDiet * 0.25;
  const fatGrams = fatCalories / 9;
  const carbCalories = caloriesForDiet - proteinCalories - fatCalories;
  const carbGrams = carbCalories / 4;
  return {
    protein: Math.round(proteinGrams * 10) / 10,
    carbs: Math.round(carbGrams * 10) / 10,
    fats: Math.round(fatGrams * 10) / 10,
  };
}

export function generateDietPlan(metrics: UserMetrics, targetWeight: number, weightLossGoalPerWeek: number = 0.5): DietPlan {
  const bmr = metrics.bodyFatPercentage ? calculateBMR_KatchMcArdle(metrics) : calculateBMR_MifflinStJeor(metrics);
  const tdee = calculateTDEE(metrics, bmr);
  const dailyCalorieDeficit = (weightLossGoalPerWeek * 7700) / 7;
  const dailyCalorieTarget = tdee - dailyCalorieDeficit;
  const macros = calculateMacros(tdee, metrics.weight, dailyCalorieDeficit);
  const weightToLose = metrics.weight - targetWeight;
  const estimatedWeeksToGoal = weightToLose / weightLossGoalPerWeek;
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    macros,
    dailyCalorieDeficit: Math.round(dailyCalorieDeficit),
    weeklyWeightLoss: weightLossGoalPerWeek,
    estimatedWeeksToGoal: Math.round(estimatedWeeksToGoal * 10) / 10,
    dailyCalorieTarget: Math.round(dailyCalorieTarget),
  };
}

export function validateMetrics(metrics: UserMetrics): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (metrics.age < 13 || metrics.age > 120) errors.push('Age must be between 13 and 120');
  if (metrics.weight < 30 || metrics.weight > 300) errors.push('Weight must be between 30-300 kg');
  if (metrics.height < 100 || metrics.height > 250) errors.push('Height must be between 100-250 cm');
  if (metrics.bodyFatPercentage && (metrics.bodyFatPercentage < 3 || metrics.bodyFatPercentage > 60)) {
    errors.push('Body fat percentage must be between 3-60%');
  }
  return { valid: errors.length === 0, errors };
}
