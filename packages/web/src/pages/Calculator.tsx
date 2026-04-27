import React, { useState } from 'react';
import axios from 'axios';
import './Calculator.css';

export function Calculator() {
  const [metrics, setMetrics] = useState({
    age: 30,
    weight: 80,
    height: 175,
    gender: 'male',
    activityLevel: 'moderately_active',
    bodyFatPercentage: undefined,
  });

  const [targetWeight, setTargetWeight] = useState(75);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/calculations/diet-plan', {
        metrics,
        targetWeight,
        weeklyWeightLoss: 0.5,
      });
      setResult(response.data.data);
    } catch (err: any) {
      setError('Error calculating diet plan. Make sure backend is running on port 5000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-container">
      <div className="form-section">
        <h2>📋 Your Metrics</h2>

        <div className="form-group">
          <label>Age (years)</label>
          <input
            type="number"
            value={metrics.age}
            onChange={(e) => setMetrics({ ...metrics, age: parseInt(e.target.value) })}
            min="13"
            max="120"
          />
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={metrics.weight}
            onChange={(e) => setMetrics({ ...metrics, weight: parseFloat(e.target.value) })}
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={metrics.height}
            onChange={(e) => setMetrics({ ...metrics, height: parseInt(e.target.value) })}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={metrics.gender}
            onChange={(e) => setMetrics({ ...metrics, gender: e.target.value as any })}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Activity Level</label>
          <select
            value={metrics.activityLevel}
            onChange={(e) => setMetrics({ ...metrics, activityLevel: e.target.value as any })}
          >
            <option value="sedentary">Sedentary (Little exercise)</option>
            <option value="lightly_active">Lightly Active (1-3 days/week)</option>
            <option value="moderately_active">Moderately Active (3-5 days/week)</option>
            <option value="very_active">Very Active (6-7 days/week)</option>
            <option value="extra_active">Extra Active (Twice per day)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Body Fat % (Optional)</label>
          <input
            type="number"
            value={metrics.bodyFatPercentage || ''}
            onChange={(e) =>
              setMetrics({ ...metrics, bodyFatPercentage: e.target.value ? parseFloat(e.target.value) : undefined })
            }
            placeholder="Leave blank if unknown"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Target Weight (kg)</label>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(parseFloat(e.target.value))}
            step="0.1"
          />
        </div>

        <button className="calculate-button" onClick={handleCalculate} disabled={loading}>
          {loading ? 'Calculating...' : '🚀 Calculate My Diet Plan'}
        </button>

        {error && <div className="error-message">{error}</div>}
      </div>

      {result && (
        <div className="results-section">
          <h2>✅ Your Personalized Diet Plan</h2>
          <div className="results-grid">
            <div className="result-card">
              <h3>BMR</h3>
              <p className="result-value">{result.bmr}</p>
              <p className="result-label">calories/day</p>
            </div>
            <div className="result-card">
              <h3>TDEE</h3>
              <p className="result-value">{result.tdee}</p>
              <p className="result-label">calories/day</p>
            </div>
            <div className="result-card">
              <h3>Daily Target</h3>
              <p className="result-value">{result.dailyCalorieTarget}</p>
              <p className="result-label">calories/day</p>
            </div>
            <div className="result-card">
              <h3>Weekly Loss</h3>
              <p className="result-value">~{result.weeklyWeightLoss}kg</p>
              <p className="result-label">per week</p>
            </div>
          </div>

          <div className="macros-section">
            <h3>🥗 Daily Macro Targets</h3>
            <div className="macros-grid">
              <div className="macro-card protein">
                <h4>Protein</h4>
                <p className="macro-value">{result.macros.protein}g</p>
                <p className="macro-cal">{Math.round(result.macros.protein * 4)} cal</p>
              </div>
              <div className="macro-card carbs">
                <h4>Carbs</h4>
                <p className="macro-value">{result.macros.carbs}g</p>
                <p className="macro-cal">{Math.round(result.macros.carbs * 4)} cal</p>
              </div>
              <div className="macro-card fats">
                <h4>Fats</h4>
                <p className="macro-value">{result.macros.fats}g</p>
                <p className="macro-cal">{Math.round(result.macros.fats * 9)} cal</p>
              </div>
            </div>
          </div>

          <div className="timeline-section">
            <h3>⏱️ Your Weight Loss Timeline</h3>
            <p>
              At {result.weeklyWeightLoss}kg per week, you'll reach your goal weight in approximately{' '}
              <strong>{result.estimatedWeeksToGoal} weeks</strong> ({Math.round(result.estimatedWeeksToGoal / 4.33)} months)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
