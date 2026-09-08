/**
 * COMPLETE SETUP & EXECUTION GUIDE
 * Trading Investment AI Agent - Step-by-Step Installation & Running
 */

# ============================================
# TRADING INVESTMENT AI AGENT
# Complete Setup & Execution Guide
# ============================================

## 📋 TABLE OF CONTENTS
1. Prerequisites & Environment Setup
2. Project Structure
3. Installation Steps
4. File Configuration
5. Running Individual Files
6. Running All Demos
7. Troubleshooting
8. Production Deployment

---

## 1️⃣ PREREQUISITES & ENVIRONMENT SETUP

### System Requirements:
- Node.js: v14.0.0 or higher
- npm: v6.0.0 or higher
- TypeScript: v4.0.0 or higher
- Git: For cloning repository
- Terminal/Command Line: bash, zsh, or PowerShell

### Check Installation:
```bash
# Check Node.js version
node --version
# Expected output: v14.x.x or higher

# Check npm version
npm --version
# Expected output: v6.x.x or higher

# Check Git version
git --version
# Expected output: git version 2.x.x or higher
```

---

## 2️⃣ PROJECT STRUCTURE

```
trading-view-ai-agent/
├── README.md
├── package.json
├── tsconfig.json
├── .gitignore
├── src/
│   ├── agents/
│   │   ├── trading-view-agent.ts          (Basic Trading Agent)
│   │   └── trading-investment-agent.ts    (Main Investment Agent)
│   ├── runtime/
│   │   └── runtime-preview.ts             (Interactive Demos - 10 demos)
│   ├── index.ts                           (Main Entry Point)
│   ├── config.ts                          (Configuration File)
│   └── utils/
│       ├── logger.ts                      (Logging Utility)
│       └── helpers.ts                     (Helper Functions)
├── tests/
│   ├── agent.test.ts
│   ├── indicators.test.ts
│   └── portfolio.test.ts
├── examples/
│   ├── basic-usage.ts
│   ├── advanced-strategy.ts
│   └── backtesting.ts
└── dist/
    └── (Compiled JavaScript files - auto-generated)
```

---

## 3️⃣ INSTALLATION STEPS

### Step 1: Clone the Repository
```bash
# Navigate to your desired directory
cd ~/projects

# Clone the repository
git clone https://github.com/mgaikwad064-droid/trading-view-ai-agent.git

# Enter the project directory
cd trading-view-ai-agent

# Verify you're in the right directory
pwd
# Output should end with: .../trading-view-ai-agent
```

### Step 2: Install Dependencies
```bash
# Install all npm packages
npm install

# Expected output will show:
# added XXX packages, and audited XXX packages in XXs

# Verify installation
npm list
# Shows all installed dependencies
```

### Step 3: Install TypeScript Globally (Optional but Recommended)
```bash
# Install TypeScript globally
npm install -g typescript

# Verify TypeScript installation
tsc --version
# Expected output: Version x.x.x
```

### Step 4: Verify Project Structure
```bash
# List all files in src directory
ls -R src/

# Expected output:
# src/:
# agents  config.ts  index.ts  runtime  utils
#
# src/agents:
# trading-investment-agent.ts  trading-view-agent.ts
#
# src/runtime:
# runtime-preview.ts
```

---

## 4️⃣ FILE CONFIGURATION

### Step 1: Create package.json (if not exists)
```bash
npm init -y
```

### Step 2: Install Required Dependencies
```bash
# Install Axios for HTTP requests
npm install axios

# Install TypeScript as dev dependency
npm install --save-dev typescript

# Install Node types
npm install --save-dev @types/node

# Install ts-node for running TypeScript directly
npm install --save-dev ts-node

# Final dependency check
npm list
```

### Step 3: Create tsconfig.json
```bash
# Generate TypeScript configuration
npx tsc --init
```

### Step 4: Update tsconfig.json
Edit `tsconfig.json` and ensure these settings:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### Step 5: Update package.json Scripts
Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "preview": "ts-node src/runtime/runtime-preview.ts",
    "preview:demo1": "ts-node src/runtime/runtime-preview.ts --demo 1",
    "preview:demo2": "ts-node src/runtime/runtime-preview.ts --demo 2",
    "preview:demo3": "ts-node src/runtime/runtime-preview.ts --demo 3",
    "preview:demo4": "ts-node src/runtime/runtime-preview.ts --demo 4",
    "preview:demo5": "ts-node src/runtime/runtime-preview.ts --demo 5",
    "preview:demo6": "ts-node src/runtime/runtime-preview.ts --demo 6",
    "preview:demo7": "ts-node src/runtime/runtime-preview.ts --demo 7",
    "preview:demo8": "ts-node src/runtime/runtime-preview.ts --demo 8",
    "preview:demo9": "ts-node src/runtime/runtime-preview.ts --demo 9",
    "preview:demo10": "ts-node src/runtime/runtime-preview.ts --demo 10",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  }
}
```

---

## 5️⃣ RUNNING INDIVIDUAL FILES

### Method 1: Using TypeScript Directly (Recommended for Development)
```bash
# Run the main entry point
ts-node src/index.ts

# Run basic trading agent
ts-node src/agents/trading-view-agent.ts

# Run investment agent
ts-node src/agents/trading-investment-agent.ts

# Run runtime preview
ts-node src/runtime/runtime-preview.ts
```

### Method 2: Compile First, Then Run (Recommended for Production)
```bash
# Step 1: Compile TypeScript to JavaScript
npm run build
# Output: Creates dist/ folder with compiled .js files

# Step 2: Run compiled JavaScript
node dist/index.js
node dist/agents/trading-view-agent.js
node dist/agents/trading-investment-agent.js
node dist/runtime/runtime-preview.js

# Step 3: Verify output
# Look for console logs showing agent initialization and trade execution
```

### Method 3: Using npm Scripts
```bash
# Run with npm script
npm run dev

# Start application
npm start

# Run preview with all demos
npm run preview

# Run specific demo
npm run preview:demo1
npm run preview:demo2
npm run preview:demo3
# ... etc
```

---

## 6️⃣ RUNNING ALL DEMOS (COMPLETE WORKFLOW)

### Step-by-Step Execution:

#### Option A: Run All Demos at Once
```bash
# Terminal Command
npm run preview

# Or using ts-node directly
ts-node src/runtime/runtime-preview.ts

# Expected Output:
# ╔════════════════════════════════════════════════════════════════╗
# ║       TRADING INVESTMENT AI AGENT - RUNTIME PREVIEW            ║
# ╚════════════════════════════════════════════════════════════════╝
#
# (Series of 10 demos running sequentially)
# Each demo displays in console with formatted tables and metrics
```

#### Option B: Run Individual Demos One at a Time
```bash
# Demo 1: Initialize Agent
npm run preview:demo1

# Demo 2: Analyze Buy Signals
npm run preview:demo2

# Demo 3: Generate Trade Decision
npm run preview:demo3

# Demo 4: Execute Buy Trade
npm run preview:demo4

# Demo 5: Analyze Sell Signals
npm run preview:demo5

# Demo 6: Execute Sell Trade
npm run preview:demo6

# Demo 7: Monitor Positions
npm run preview:demo7

# Demo 8: Portfolio Statistics
npm run preview:demo8

# Demo 9: Complete Workflow
npm run preview:demo9

# Demo 10: System Summary
npm run preview:demo10
```

#### Option C: Custom Script Execution
```bash
# Create a new file: run-demos.ts
cat > src/run-demos.ts << 'EOF'
import { RuntimePreview } from './runtime/runtime-preview';

async function runDemos() {
  const preview = new RuntimePreview();

  console.log('🚀 Starting Trading AI Agent Demos...\n');

  // Run all demos
  await preview.runAllDemos();
}

runDemos().catch(console.error);
EOF

# Run the custom script
ts-node src/run-demos.ts
```

---

## 7️⃣ COMPLETE EXECUTION WALKTHROUGH

### Full Workflow from Start to Finish:

```bash
# =============================================
# STEP 1: Initialize Project Environment
# =============================================

# 1.1: Clone repository
git clone https://github.com/mgaikwad064-droid/trading-view-ai-agent.git
cd trading-view-ai-agent

# 1.2: Verify directory
pwd
# Output: /path/to/trading-view-ai-agent

# 1.3: List files
ls -la
# Should see: package.json, tsconfig.json, src/, etc.


# =============================================
# STEP 2: Install Dependencies
# =============================================

# 2.1: Install npm packages
npm install

# 2.2: Verify installation
npm list
# Shows all installed packages

# 2.3: Verify key packages
npm list axios typescript ts-node
# Confirms axios, typescript, and ts-node are installed


# =============================================
# STEP 3: Verify Code Files Exist
# =============================================

# 3.1: Check agent files
ls -la src/agents/
# Should show:
# - trading-view-agent.ts
# - trading-investment-agent.ts

# 3.2: Check runtime files
ls -la src/runtime/
# Should show:
# - runtime-preview.ts

# 3.3: Verify file contents (first 10 lines)
head -10 src/agents/trading-investment-agent.ts
head -10 src/runtime/runtime-preview.ts


# =============================================
# STEP 4: Compile TypeScript (Optional)
# =============================================

# 4.1: Compile all TypeScript files
npm run build

# 4.2: Verify compilation
ls -la dist/
# Should show compiled .js files

# 4.3: Check specific compiled files
ls -la dist/agents/
ls -la dist/runtime/


# =============================================
# STEP 5: Run Basic Agent
# =============================================

# 5.1: Run trading view agent
echo "Running Trading View Agent..."
ts-node src/agents/trading-view-agent.ts

# Expected output:
# ✓ Agent initialized
# ✓ Market data fetched
# ✓ Trends analyzed
# ✓ Trading signals generated


# =============================================
# STEP 6: Run Investment Agent
# =============================================

# 6.1: Run investment agent
echo "Running Trading Investment Agent..."
ts-node src/agents/trading-investment-agent.ts

# Expected output:
# ✓ Agent initialized
# ✓ Portfolio created with $10,000
# ✓ Indicators fetched
# ✓ Signals analyzed


# =============================================
# STEP 7: Run Runtime Preview (All 10 Demos)
# =============================================

# 7.1: Run complete preview
echo "Running Runtime Preview with 10 Demos..."
npm run preview

# Follow the prompts and watch each demo execute
# Each demo will pause for your review


# =============================================
# STEP 8: Verify Execution Success
# =============================================

# 8.1: Check if all demos completed
# Look for: "✅ All demos completed successfully!"

# 8.2: Review console output
# Verify portfolio stats are updated
# Verify trades show correct P&L
# Verify win rate is calculated


# =============================================
# STEP 9: Run Individual Demos (Optional)
# =============================================

# Run any specific demo to review details
npm run preview:demo1
npm run preview:demo4
npm run preview:demo8
# etc.
```

---

## 8️⃣ TROUBLESHOOTING

### Issue 1: "Command not found: ts-node"
```bash
# Solution: Install ts-node locally
npm install --save-dev ts-node

# Then run with npx
npx ts-node src/runtime/runtime-preview.ts
```

### Issue 2: "Cannot find module 'axios'"
```bash
# Solution: Install axios
npm install axios

# Or reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: "TypeScript compilation errors"
```bash
# Solution: Check tsconfig.json
cat tsconfig.json

# Regenerate if needed
npx tsc --init

# Then compile
npm run build

# Check for errors
npx tsc --noEmit
```

### Issue 4: "Port already in use" (if running server)
```bash
# Find process on port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Issue 5: "Module not found errors"
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Rebuild TypeScript
npm run build
```

---

## 9️⃣ RUNNING SPECIFIC AGENT FEATURES

### Test 1: Initialize Agent with Custom Capital
```bash
# Create test file
cat > src/test-custom-capital.ts << 'EOF'
import { TradingInvestmentAIAgent } from './agents/trading-investment-agent';

async function test() {
  const agent = new TradingInvestmentAIAgent(
    'test-key',
    50000, // Custom capital: $50,000
    'https://api.example.com',
    0.03   // Custom risk: 3% per trade
  );

  console.log('Agent initialized with:');
  console.log(agent.getPortfolioStats());
}

test().catch(console.error);
EOF

# Run test
ts-node src/test-custom-capital.ts
```

### Test 2: Simulate Complete Trade Cycle
```bash
# Create simulation file
cat > src/test-trade-cycle.ts << 'EOF'
import { TradingInvestmentAIAgent, TradeDecision } from './agents/trading-investment-agent';

async function simulateTrades() {
  const agent = new TradingInvestmentAIAgent('key', 10000);

  // Mock decision
  const buyDecision: TradeDecision = {
    symbol: 'TEST',
    action: 'BUY',
    entryPrice: 100,
    stopLoss: 98,
    takeProfit: 110,
    riskRewardRatio: 5,
    confidence: 0.9,
    indicators: ['RSI Oversold', 'MACD Bullish'],
    reasoning: 'Strong buy signals',
    timestamp: new Date()
  };

  console.log('Executing Buy Trade...');
  await agent.executeBuyTrade('TEST', 100, buyDecision);

  console.log('\nPortfolio Status:');
  console.log(agent.getPortfolioStats());
}

simulateTrades().catch(console.error);
EOF

# Run simulation
ts-node src/test-trade-cycle.ts
```

---

## 🔟 PRODUCTION DEPLOYMENT

### Step 1: Build for Production
```bash
# Compile TypeScript
npm run build

# Verify dist folder
ls -la dist/
du -sh dist/

# Minify if needed
npm install --save-dev terser
npx terser dist/index.js -o dist/index.min.js
```

### Step 2: Create Docker Image (Optional)
```bash
# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

CMD ["node", "dist/index.js"]
EOF

# Build image
docker build -t trading-agent:latest .

# Run container
docker run -e API_KEY=your-key trading-agent:latest
```

### Step 3: Deploy to Cloud
```bash
# Heroku deployment
heroku login
heroku create your-app-name
git push heroku main

# AWS Lambda
sam build
sam deploy --guided

# Google Cloud
gcloud app deploy
```

---

## ✅ FINAL VERIFICATION CHECKLIST

```bash
# ✅ 1. All files cloned
ls -la src/agents/
ls -la src/runtime/

# ✅ 2. Dependencies installed
npm list

# ✅ 3. TypeScript compiles
npm run build

# ✅ 4. Runtime preview runs
npm run preview

# ✅ 5. Specific demo works
npm run preview:demo1

# ✅ 6. Portfolio stats visible
# Look for console output showing capital, P&L, win rate

# ✅ 7. No errors in output
# Verify only "✅" success messages, no "❌" errors

# ✅ 8. Ready for production
# All tests pass, all features working
```

---

## 📞 QUICK REFERENCE COMMANDS

```bash
# Clone & Setup
git clone https://github.com/mgaikwad064-droid/trading-view-ai-agent.git && cd trading-view-ai-agent && npm install

# Run All
npm run preview

# Run Single Demo
npm run preview:demo1

# Development Mode
npm run dev

# Build for Production
npm run build && npm start

# Run Tests
npm test

# View All Scripts
npm run

# Clean Build
rm -rf dist node_modules && npm install && npm run build
```

---

## 🎯 NEXT STEPS

1. ✅ Run all demos: `npm run preview`
2. ✅ Review output and understand flow
3. ✅ Customize agent settings in config
4. ✅ Integrate with real market data API
5. ✅ Deploy to production environment
6. ✅ Monitor live trading performance

---

**Happy Trading! 🚀**

For issues or questions, refer to the GitHub repository:
https://github.com/mgaikwad064-droid/trading-view-ai-agent
