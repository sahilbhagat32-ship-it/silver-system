import express, { Request, Response } from 'express';
import { generateDietPlan, validateMetrics, UserMetrics } from '../utils/calculations';

export const calculationRouter = express.Router();

calculationRouter.post('/diet-plan', (req: Request, res: Response) => {
  try {
    const { metrics, targetWeight, weeklyWeightLoss } = req.body;

    const validation = validateMetrics(metrics);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const plan = generateDietPlan(metrics as UserMetrics, targetWeight, weeklyWeightLoss || 0.5);

    res.json({
      success: true,
      data: plan,
      message: `Diet plan generated! Goal weight: ${targetWeight}kg in ~${plan.estimatedWeeksToGoal} weeks`,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

calculationRouter.get('/activity-levels', (req: Request, res: Response) => {
  const levels = [
    { id: 'sedentary', label: 'Sedentary (little to no exercise)', multiplier: 1.2 },
    { id: 'lightly_active', label: 'Lightly Active (1-3 days/week)', multiplier: 1.375 },
    { id: 'moderately_active', label: 'Moderately Active (3-5 days/week)', multiplier: 1.55 },
    { id: 'very_active', label: 'Very Active (6-7 days/week)', multiplier: 1.725 },
    { id: 'extra_active', label: 'Extra Active (twice per day)', multiplier: 1.9 },
  ];
  res.json({ success: true, data: levels });
});
