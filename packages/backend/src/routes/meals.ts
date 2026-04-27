import express, { Request, Response } from 'express';

export const mealRouter = express.Router();

mealRouter.get('/suggestions', (req: Request, res: Response) => {
  try {
    const suggestions = [
      {
        mealType: 'breakfast',
        meals: [
          { name: 'Eggs & Toast', calories: 350, protein: 25, carbs: 30, fats: 12 },
          { name: 'Oatmeal w/ Protein Powder', calories: 380, protein: 30, carbs: 45, fats: 8 },
        ],
      },
      {
        mealType: 'lunch',
        meals: [
          { name: 'Chicken Breast & Rice', calories: 450, protein: 40, carbs: 50, fats: 8 },
          { name: 'Salmon & Sweet Potato', calories: 480, protein: 35, carbs: 48, fats: 12 },
        ],
      },
      {
        mealType: 'dinner',
        meals: [
          { name: 'Lean Beef & Vegetables', calories: 420, protein: 38, carbs: 35, fats: 10 },
          { name: 'Turkey & Pasta', calories: 460, protein: 40, carbs: 45, fats: 9 },
        ],
      },
    ];
    res.json({
      success: true,
      data: suggestions,
      message: 'Meal suggestions based on macro targets',
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

mealRouter.post('/log', (req: Request, res: Response) => {
  try {
    const { userId, mealName, calories, macros, date } = req.body;
    res.json({
      success: true,
      message: 'Meal logged successfully',
      data: { userId, mealName, calories, macros, date },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

mealRouter.get('/daily-summary/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const summary = {
      userId,
      date: new Date().toISOString().split('T')[0],
      meals: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
    };
    res.json({ success: true, data: summary });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
