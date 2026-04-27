# 💪 Diet Calculator App - Cross-Platform

A professional-grade diet and weight loss calculator with **zero lag** performance. Build once, deploy everywhere: **Web, Mobile (iOS/Android), Desktop**.

## 🎯 Features

✅ **Advanced Calculations**
- Mifflin-St Jeor Formula (general population)
- Katch-McArdle Formula (athletes with body fat %)
- Accurate TDEE calculation
- Macro distribution for muscle retention
- Exact weight loss timeline

✅ **Multi-Platform Support**
- React Web App
- React Native Mobile (iOS/Android)
- Desktop (Electron ready)

## 🚀 Quick Start

### Installation
```bash
cd diet-calculator-app
yarn install
```

### Start Backend (Port 5000)
```bash
cd packages/backend
npm run dev
```

### Start Web App (Port 3000)
```bash
cd packages/web
npm start
```

## 📊 API Test
```bash
curl -X POST http://localhost:5000/api/calculations/diet-plan \
  -H "Content-Type: application/json" \
  -d '{
    "metrics": {
      "age": 30,
      "weight": 80,
      "height": 175,
      "gender": "male",
      "activityLevel": "moderately_active"
    },
    "targetWeight": 75
  }'
```

## 📁 Project Structure
```
packages/
├── backend/    # Node.js + Express API
├── web/        # React Web App
└── mobile/     # React Native
```

---
**Made with ❤️ for fitness**
