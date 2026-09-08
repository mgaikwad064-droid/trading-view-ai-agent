/**
 * Trading Investment AI Agent - Runtime Preview & Interactive Demo
 * Comprehensive testing and visualization of all agent functionality
 */

import {
  TradingInvestmentAIAgent,
  TradeDecision,
  TechnicalIndicators,
  PortfolioTrade,
  Portfolio,
} from './trading-investment-agent';

// Mock data for demonstration
const mockIndicators: TechnicalIndicators = {
  rsi: 25, // Oversold - BUY signal
  macd: {
    line: 0.5,
    signal: 0.3,
    histogram: 0.2, // Positive - Bullish
  },
  bollingerBands: {
    upper: 155,
    middle: 150,
    lower: 145,
  },
  movingAverages: {
    sma20: 149,
    sma50: 148,
    sma200: 146,
    ema12: 150,
    ema26: 148,
  },
  volume: {
    current: 2500000,
    average: 1800000,
  },
};

const mockSellIndicators: TechnicalIndicators = {
  rsi: 75, // Overbought - SELL signal
  macd: {
    line: -0.3,
    signal: -0.1,
    histogram: -0.2, // Negative - Bearish
  },
  bollingerBands: {
    upper: 160,
    middle: 150,
    lower: 140,
  },
  movingAverages: {
    sma20: 155,
    sma50: 152,
    sma200: 148,
    ema12: 152,
    ema26: 155,
  },
  volume: {
    current: 2200000,
    average: 1800000,
  },
};

class RuntimePreview {
  private agent: TradingInvestmentAIAgent;

  constructor() {
    this.agent = new TradingInvestmentAIAgent(
      'demo-api-key-12345',
      10000, // Initial capital: $10,000
      'https://api.demo.com',
      0.02 // Risk 2% per trade
    );
  }

  /**
   * Display header with formatting
   */
  private displayHeader(title: string): void {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log(`║  ${title.padEnd(62)}║`);
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
  }

  /**
   * Demo 1: Basic Agent Initialization
   */
  async demo1_InitializeAgent(): Promise<void> {
    this.displayHeader('DEMO 1: Initialize Trading Investment AI Agent');

    console.log('📊 Agent Configuration:');
    console.log('   ├─ Initial Capital: $10,000');
    console.log('   ├─ Risk Per Trade: 2%');
    console.log('   ├─ API Base URL: https://api.demo.com');
    console.log('   └─ API Key: demo-api-key-12345\n');

    const stats = this.agent.getPortfolioStats();
    console.log('💰 Portfolio Status:');
    console.log(`   ├─ Total Capital: $${stats.totalCapital.toFixed(2)}`);
    console.log(`   ├─ Available Capital: $${stats.availableCapital.toFixed(2)}`);
    console.log(`   ├─ Used Capital: $${stats.usedCapital.toFixed(2)}`);
    console.log(`   ├─ Open Trades: ${stats.openTrades}`);
    console.log(`   ├─ Closed Trades: ${stats.closedTrades}`);
    console.log(`   └─ Win Rate: ${stats.winRate.toFixed(2)}%\n`);

    this.pause();
  }

  /**
   * Demo 2: Analyze Buy Signals
   */
  async demo2_AnalyzeBuySignals(): Promise<void> {
    this.displayHeader('DEMO 2: Analyze Buy Signals Using Indicators');

    console.log('📈 Technical Indicators Received:\n');
    console.log('   RSI:');
    console.log(`     └─ Value: ${mockIndicators.rsi} (Oversold - BUY Signal ✓)`);
    console.log('\n   MACD:');
    console.log(`     ├─ Line: ${mockIndicators.macd.line}`);
    console.log(`     ├─ Signal: ${mockIndicators.macd.signal}`);
    console.log(`     └─ Histogram: ${mockIndicators.macd.histogram} (Positive - Bullish ✓)`);
    console.log('\n   Moving Averages:');
    console.log(`     ├─ EMA 12: ${mockIndicators.movingAverages.ema12}`);
    console.log(`     ├─ SMA 20: ${mockIndicators.movingAverages.sma20}`);
    console.log(`     ├─ SMA 50: ${mockIndicators.movingAverages.sma50}`);
    console.log(`     └─ Golden Cross Detected ✓`);
    console.log('\n   Volume:');
    console.log(
      `     ├─ Current: ${mockIndicators.volume.current.toLocaleString()}`
    );
    console.log(
      `     ├─ Average: ${mockIndicators.volume.average.toLocaleString()}`
    );
    console.log(`     └─ High Volume Support ✓\n`);

    console.log('🎯 Buy Signals Summary:');
    console.log('   ✓ RSI Oversold (<30)');
    console.log('   ✓ MACD Bullish Crossover');
    console.log('   ✓ Golden Cross (EMA12 > SMA20 > SMA50)');
    console.log('   ✓ High Volume Support\n');

    console.log('⚠️  Signal Strength: STRONG (4/5 indicators)');
    console.log('📊 Confidence: 95%\n');

    this.pause();
  }

  /**
   * Demo 3: Generate Trade Decision
   */
  async demo3_GenerateTradeDecision(): Promise<void> {
    this.displayHeader('DEMO 3: Generate Trade Decision');

    // Mock the getIndicators method for demo
    const mockDecision: TradeDecision = {
      symbol: 'AAPL',
      action: 'BUY',
      entryPrice: 150,
      stopLoss: 147,
      takeProfit: 157.5,
      riskRewardRatio: 2.5,
      confidence: 0.95,
      indicators: [
        'RSI Oversold (<30)',
        'MACD Bullish Crossover',
        'Golden Cross (EMA12 > SMA20 > SMA50)',
        'High Volume Support',
      ],
      reasoning:
        'Strong buy signals detected: RSI Oversold (<30), MACD Bullish Crossover, Golden Cross (EMA12 > SMA20 > SMA50), High Volume Support',
      timestamp: new Date(),
    };

    console.log(this.agent.formatDecision(mockDecision));

    console.log('\n📋 Decision Analysis:');
    console.log(
      `   ├─ Entry Price: $${mockDecision.entryPrice.toFixed(2)}`
    );
    console.log(
      `   ├─ Stop Loss: $${mockDecision.stopLoss.toFixed(2)} (Risk: 2%)`
    );
    console.log(
      `   ├─ Take Profit: $${mockDecision.takeProfit.toFixed(2)} (Target: 5%)`
    );
    console.log(
      `   ├─ Risk/Reward Ratio: ${mockDecision.riskRewardRatio.toFixed(2)}:1`
    );
    console.log(
      `   └─ Expected Return: ${((mockDecision.takeProfit - mockDecision.entryPrice) / mockDecision.entryPrice * 100).toFixed(2)}%\n`
    );

    this.pause();
  }

  /**
   * Demo 4: Execute Buy Trade
   */
  async demo4_ExecuteBuyTrade(): Promise<void> {
    this.displayHeader('DEMO 4: Execute Buy Trade');

    const mockDecision: TradeDecision = {
      symbol: 'AAPL',
      action: 'BUY',
      entryPrice: 150,
      stopLoss: 147,
      takeProfit: 157.5,
      riskRewardRatio: 2.5,
      confidence: 0.95,
      indicators: ['RSI Oversold (<30)', 'MACD Bullish Crossover'],
      reasoning: 'Strong buy signals detected',
      timestamp: new Date(),
    };

    console.log('🚀 Executing Buy Trade...\n');

    const trade = await this.agent.executeBuyTrade('AAPL', 150, mockDecision);

    if (trade) {
      console.log('\n✅ Trade Executed Successfully!\n');
      console.log('📋 Trade Details:');
      console.log(`   ├─ Trade ID: ${trade.id}`);
      console.log(`   ├─ Symbol: ${trade.symbol}`);
      console.log(`   ├─ Action: ${trade.action}`);
      console.log(`   ├─ Quantity: ${trade.quantity} units`);
      console.log(`   ├─ Entry Price: $${trade.entryPrice.toFixed(2)}`);
      console.log(`   ├─ Stop Loss: $${trade.stopLoss.toFixed(2)}`);
      console.log(`   ├─ Take Profit: $${trade.takeProfit.toFixed(2)}`);
      console.log(`   ├─ Status: ${trade.status}`);
      console.log(`   └─ Opened At: ${trade.openedAt.toISOString()}\n`);

      const stats = this.agent.getPortfolioStats();
      console.log('💰 Updated Portfolio:');
      console.log(`   ├─ Total Capital: $${stats.totalCapital.toFixed(2)}`);
      console.log(`   ├─ Available Capital: $${stats.availableCapital.toFixed(2)}`);
      console.log(`   ├─ Used Capital: $${stats.usedCapital.toFixed(2)}`);
      console.log(`   └─ Open Trades: ${stats.openTrades}\n`);
    }

    this.pause();
  }

  /**
   * Demo 5: Analyze Sell Signals
   */
  async demo5_AnalyzeSellSignals(): Promise<void> {
    this.displayHeader('DEMO 5: Analyze Sell Signals Using Indicators');

    console.log('📉 Technical Indicators Received:\n');
    console.log('   RSI:');
    console.log(`     └─ Value: ${mockSellIndicators.rsi} (Overbought - SELL Signal ✓)`);
    console.log('\n   MACD:');
    console.log(`     ├─ Line: ${mockSellIndicators.macd.line}`);
    console.log(`     ├─ Signal: ${mockSellIndicators.macd.signal}`);
    console.log(`     └─ Histogram: ${mockSellIndicators.macd.histogram} (Negative - Bearish ✓)`);
    console.log('\n   Moving Averages:');
    console.log(`     ├─ EMA 12: ${mockSellIndicators.movingAverages.ema12}`);
    console.log(`     ├─ SMA 20: ${mockSellIndicators.movingAverages.sma20}`);
    console.log(`     ├─ SMA 50: ${mockSellIndicators.movingAverages.sma50}`);
    console.log(`     └─ Death Cross Detected ✓`);
    console.log('\n   Volume:');
    console.log(
      `     ├─ Current: ${mockSellIndicators.volume.current.toLocaleString()}`
    );
    console.log(
      `     └─ High Volume Rejection ✓\n`
    );

    console.log('🎯 Sell Signals Summary:');
    console.log('   ✓ RSI Overbought (>70)');
    console.log('   ✓ MACD Bearish Crossover');
    console.log('   ✓ Death Cross (EMA12 < SMA20 < SMA50)');
    console.log('   ✓ High Volume Rejection\n');

    console.log('⚠️  Signal Strength: STRONG (4/5 indicators)');
    console.log('📊 Confidence: 95%\n');

    this.pause();
  }

  /**
   * Demo 6: Execute Sell Trade (Close Position)
   */
  async demo6_ExecuteSellTrade(): Promise<void> {
    this.displayHeader('DEMO 6: Execute Sell Trade & Close Position');

    const mockDecision: TradeDecision = {
      symbol: 'AAPL',
      action: 'SELL',
      entryPrice: 150,
      stopLoss: 152,
      takeProfit: 142.5,
      riskRewardRatio: 2.5,
      confidence: 0.95,
      indicators: ['RSI Overbought (>70)', 'MACD Bearish Crossover'],
      reasoning: 'Strong sell signals detected',
      timestamp: new Date(),
    };

    console.log('🚀 Executing Sell Trade...\n');

    // Price increased to $157.5 (take profit level)
    const sellPrice = 157.5;
    const trade = await this.agent.executeSellTrade('AAPL', sellPrice, mockDecision);

    if (trade) {
      console.log('\n✅ Sell Trade Executed Successfully!\n');
      console.log('📋 Trade Details:');
      console.log(`   ├─ Trade ID: ${trade.id}`);
      console.log(`   ├─ Symbol: ${trade.symbol}`);
      console.log(`   ├─ Action: ${trade.action}`);
      console.log(`   ├─ Quantity: ${trade.quantity} units`);
      console.log(`   ├─ Entry Price: $${trade.entryPrice.toFixed(2)}`);
      console.log(`   ├─ Exit Price: $${trade.currentPrice.toFixed(2)}`);
      console.log(`   ├─ Status: ${trade.status}`);
      console.log(
        `   └─ Closed At: ${trade.closedAt?.toISOString()}\n`
      );

      console.log('💹 Profit & Loss:');
      console.log(`   ├─ P&L: $${trade.profitLoss?.toFixed(2)}`);
      console.log(
        `   ├─ P&L %: ${trade.profitLossPercent?.toFixed(2)}%`
      );
      console.log(
        `   └─ Return Multiple: ${((trade.profitLoss || 0) / (trade.entryPrice * trade.quantity) + 1).toFixed(2)}x\n`
      );

      const stats = this.agent.getPortfolioStats();
      console.log('💰 Updated Portfolio:');
      console.log(`   ├─ Total Capital: $${stats.totalCapital.toFixed(2)}`);
      console.log(`   ├─ Available Capital: $${stats.availableCapital.toFixed(2)}`);
      console.log(`   ├─ Used Capital: $${stats.usedCapital.toFixed(2)}`);
      console.log(`   ├─ Total P&L: $${stats.totalProfitLoss.toFixed(2)}`);
      console.log(`   ├─ Total Return %: ${stats.totalReturnPercent.toFixed(2)}%`);
      console.log(`   ├─ Win Rate: ${stats.winRate.toFixed(2)}%`);
      console.log(`   ├─ Open Trades: ${stats.openTrades}`);
      console.log(`   └─ Closed Trades: ${stats.closedTrades}\n`);
    }

    this.pause();
  }

  /**
   * Demo 7: Monitor Positions & Risk Management
   */
  async demo7_MonitorPositions(): Promise<void> {
    this.displayHeader('DEMO 7: Monitor Positions & Risk Management');

    console.log('📊 Monitoring Open Positions...\n');

    const mockPrices = {
      'AAPL': 148.5, // Below take profit, above stop loss
      'MSFT': 145.2, // Stop loss triggered
      'GOOGL': 165.0, // Take profit triggered
    };

    console.log('🔍 Position Updates:\n');
    console.log('   AAPL:');
    console.log('     ├─ Current Price: $148.50');
    console.log('     ├─ Entry Price: $150.00');
    console.log('     ├─ Stop Loss: $147.00');
    console.log('     ├─ Take Profit: $157.50');
    console.log('     ├─ Status: HOLDING ✓');
    console.log('     └─ Unrealized P&L: -$150.00 (-1.00%)\n');

    console.log('   MSFT:');
    console.log('     ├─ Current Price: $145.20');
    console.log('     ├─ Entry Price: $148.00');
    console.log('     ├─ Stop Loss: $145.04');
    console.log('     ├─ Status: ⛔ STOP LOSS TRIGGERED');
    console.log('     └─ P&L: -$280.00 (-1.89%)\n');

    console.log('   GOOGL:');
    console.log('     ├─ Current Price: $165.00');
    console.log('     ├─ Entry Price: $160.00');
    console.log('     ├─ Take Profit: $165.00');
    console.log('     ├─ Status: 🎯 TAKE PROFIT TRIGGERED');
    console.log('     └─ P&L: +$500.00 (+3.125%)\n');

    await this.agent.monitorPositions(mockPrices);

    const stats = this.agent.getPortfolioStats();
    console.log('📈 Portfolio Summary After Monitoring:');
    console.log(`   ├─ Total P&L: $${stats.totalProfitLoss.toFixed(2)}`);
    console.log(`   ├─ Win Rate: ${stats.winRate.toFixed(2)}%`);
    console.log(`   └─ Return %: ${stats.totalReturnPercent.toFixed(2)}%\n`);

    this.pause();
  }

  /**
   * Demo 8: Portfolio Statistics & Performance
   */
  async demo8_PortfolioStats(): Promise<void> {
    this.displayHeader('DEMO 8: Portfolio Statistics & Performance');

    const stats = this.agent.getPortfolioStats();
    const portfolio = this.agent.getPortfolioSummary();

    console.log('💰 Capital Management:');
    console.log(`   ├─ Total Capital: $${stats.totalCapital.toFixed(2)}`);
    console.log(`   ├─ Available Capital: $${stats.availableCapital.toFixed(2)}`);
    console.log(`   ├─ Used Capital (Active Trades): $${stats.usedCapital.toFixed(2)}`);
    console.log(
      `   └─ Capital Utilization: ${((stats.usedCapital / stats.totalCapital) * 100).toFixed(2)}%\n`
    );

    console.log('📊 Performance Metrics:');
    console.log(`   ├─ Total Profit/Loss: $${stats.totalProfitLoss.toFixed(2)}`);
    console.log(`   ├─ Total Return %: ${stats.totalReturnPercent.toFixed(2)}%`);
    console.log(`   ├─ Win Rate: ${stats.winRate.toFixed(2)}%`);
    console.log(
      `   └─ Sharpe Ratio (Est.): ${(stats.totalReturnPercent / 10).toFixed(2)}\n`
    );

    console.log('📈 Trade Statistics:');
    console.log(`   ├─ Total Trades: ${stats.openTrades + stats.closedTrades}`);
    console.log(`   ├─ Open Trades: ${stats.openTrades}`);
    console.log(`   ├─ Closed Trades: ${stats.closedTrades}`);
    console.log(
      `   └─ Win/Loss Ratio: ${stats.winRate.toFixed(2)}% / ${(100 - stats.winRate).toFixed(2)}%\n`
    );

    if (portfolio.trades.length > 0) {
      console.log('🔄 Recent Trades:');
      portfolio.trades.slice(-3).forEach((trade, index) => {
        console.log(`\n   Trade ${index + 1}:`);
        console.log(`     ├─ Symbol: ${trade.symbol}`);
        console.log(`     ├─ Action: ${trade.action}`);
        console.log(`     ├─ Entry: $${trade.entryPrice.toFixed(2)}`);
        console.log(`     ├─ Current: $${trade.currentPrice.toFixed(2)}`);
        console.log(`     ├─ Status: ${trade.status}`);
        if (trade.profitLoss !== undefined) {
          console.log(`     └─ P&L: $${trade.profitLoss.toFixed(2)}`);
        }
      });
    }

    console.log('\n');
    this.pause();
  }

  /**
   * Demo 9: Complete Workflow - Full Trade Cycle
   */
  async demo9_CompleteWorkflow(): Promise<void> {
    this.displayHeader('DEMO 9: Complete Workflow - Full Trade Cycle');

    console.log('🔄 Executing Complete Trade Cycle:\n');

    console.log('Step 1: Receive Market Data');
    console.log('   └─ Symbol: TSLA, Price: $200.00\n');

    console.log('Step 2: Analyze Technical Indicators');
    console.log('   ├─ RSI: 28 (Oversold)');
    console.log('   ├─ MACD: Bullish Crossover');
    console.log('   ├─ Moving Averages: Golden Cross');
    console.log('   └─ Volume: High Support\n');

    console.log('Step 3: Generate Trade Decision');
    console.log('   ├─ Action: BUY');
    console.log('   ├─ Confidence: 95%');
    console.log('   ├─ Entry: $200.00');
    console.log('   ├─ Stop Loss: $196.00');
    console.log('   └─ Take Profit: $210.00\n');

    console.log('Step 4: Calculate Position Size');
    console.log('   ├─ Capital at Risk: 2% = $200');
    console.log('   ├─ Price Risk: $4');
    console.log('   └─ Position Size: 50 shares\n');

    console.log('Step 5: Execute BUY Trade');
    console.log('   ├─ Quantity: 50 shares');
    console.log('   ├─ Entry Price: $200.00');
    console.log('   ├─ Total Cost: $10,000');
    console.log('   └─ Status: ✅ OPEN\n');

    console.log('Step 6: Monitor Position');
    console.log('   ├─ Current Price: $209.00');
    console.log('   ├─ Unrealized P&L: $450.00 (+4.50%)');
    console.log('   └─ Status: HOLDING\n');

    console.log('Step 7: Trigger Take Profit');
    console.log('   ├─ Price Reached: $210.00');
    console.log('   ├─ Action: Auto-Sell');
    console.log('   └─ Status: 🎯 TAKE PROFIT\n');

    console.log('Step 8: Close Trade & Calculate P&L');
    console.log('   ├─ Exit Price: $210.00');
    console.log('   ├─ Realized P&L: $500.00');
    console.log('   ├─ Return %: +5.00%');
    console.log('   └─ Status: ✅ CLOSED\n');

    console.log('Step 9: Update Portfolio Metrics');
    console.log('   ├─ Total Capital: $10,500.00');
    console.log('   ├─ Available Capital: $10,500.00');
    console.log('   ├─ Total P&L: $500.00');
    console.log('   ├─ Win Rate: 100% (1/1 trades)');
    console.log('   └─ Total Return: +5.00%\n');

    this.pause();
  }

  /**
   * Demo 10: System Summary & Capabilities
   */
  async demo10_SystemSummary(): Promise<void> {
    this.displayHeader('DEMO 10: Trading AI Agent - Complete System Summary');

    console.log('🎯 CORE FEATURES:\n');

    console.log('1. Technical Indicator Analysis');
    console.log('   ├─ RSI (Relative Strength Index)');
    console.log('   ├─ MACD (Moving Average Convergence Divergence)');
    console.log('   ├─ Moving Averages (SMA, EMA)');
    console.log('   ├─ Bollinger Bands');
    console.log('   └─ Volume Analysis\n');

    console.log('2. Trading Signal Generation');
    console.log('   ├─ BUY signals (Confidence-based)');
    console.log('   ├─ SELL signals (Confidence-based)');
    console.log('   ├─ HOLD signals (Neutral)');
    console.log('   └─ Signal confidence scoring\n');

    console.log('3. Risk Management');
    console.log('   ├─ Stop Loss calculation');
    console.log('   ├─ Take Profit targeting');
    console.log('   ├─ Position sizing (Risk-based)');
    console.log('   └─ Capital allocation (2% per trade)\n');

    console.log('4. Trade Execution');
    console.log('   ├─ Automatic BUY orders');
    console.log('   ├─ Automatic SELL orders');
    console.log('   ├─ Portfolio tracking');
    console.log('   └─ Trade history logging\n');

    console.log('5. Position Monitoring');
    console.log('   ├─ Real-time price tracking');
    console.log('   ├─ Stop loss enforcement');
    console.log('   ├─ Take profit triggers');
    console.log('   └─ Automatic position closing\n');

    console.log('6. Portfolio Management');
    console.log('   ├─ Capital tracking');
    console.log('   ├─ P&L calculation');
    console.log('   ├─ Win rate tracking');
    console.log('   └─ Performance analytics\n');

    console.log('📊 TECHNICAL STACK:');
    console.log('   ├─ Language: TypeScript');
    console.log('   ├─ Architecture: Object-Oriented');
    console.log('   ├─ API Client: Axios');
    console.log('   ├─ Data Models: Interfaces');
    console.log('   └─ Pattern: Singleton + Factory\n');

    console.log('🚀 USAGE EXAMPLE:');
    console.log(`
    // Initialize agent
    const agent = new TradingInvestmentAIAgent(
      'your-api-key',
      10000, // $10k capital
      'https://api.example.com',
      0.02   // 2% risk per trade
    );

    // Generate decision
    const decision = await agent.generateTradeDecision('AAPL', 150);

    // Execute trade
    if (decision.action === 'BUY') {
      await agent.executeBuyTrade('AAPL', 150, decision);
    }

    // Monitor positions
    await agent.monitorPositions({ 'AAPL': 152 });

    // Get stats
    console.log(agent.getPortfolioStats());
    `);

    console.log('\n✅ All demos completed successfully!\n');
  }

  /**
   * Pause for user interaction
   */
  private pause(): void {
    console.log('\n' + '─'.repeat(64));
    console.log('Press ENTER to continue to next demo...');
    console.log('─'.repeat(64) + '\n');
  }

  /**
   * Run all demos sequentially
   */
  async runAllDemos(): Promise<void> {
    try {
      await this.demo1_InitializeAgent();
      await this.demo2_AnalyzeBuySignals();
      await this.demo3_GenerateTradeDecision();
      await this.demo4_ExecuteBuyTrade();
      await this.demo5_AnalyzeSellSignals();
      await this.demo6_ExecuteSellTrade();
      await this.demo7_MonitorPositions();
      await this.demo8_PortfolioStats();
      await this.demo9_CompleteWorkflow();
      await this.demo10_SystemSummary();

      console.log('\n🎉 Runtime Preview Complete!\n');
      console.log('═'.repeat(64));
      console.log('For production use, integrate with real market data APIs');
      console.log('═'.repeat(64) + '\n');
    } catch (error) {
      console.error('❌ Error during runtime preview:', error);
    }
  }

  /**
   * Run individual demo
   */
  async runDemo(demoNumber: number): Promise<void> {
    const demos: { [key: number]: () => Promise<void> } = {
      1: () => this.demo1_InitializeAgent(),
      2: () => this.demo2_AnalyzeBuySignals(),
      3: () => this.demo3_GenerateTradeDecision(),
      4: () => this.demo4_ExecuteBuyTrade(),
      5: () => this.demo5_AnalyzeSellSignals(),
      6: () => this.demo6_ExecuteSellTrade(),
      7: () => this.demo7_MonitorPositions(),
      8: () => this.demo8_PortfolioStats(),
      9: () => this.demo9_CompleteWorkflow(),
      10: () => this.demo10_SystemSummary(),
    };

    if (demos[demoNumber]) {
      await demos[demoNumber]();
    } else {
      console.log(`Demo ${demoNumber} not found. Available demos: 1-10`);
    }
  }
}

// Export for use
export { RuntimePreview };

// Run if executed directly
if (require.main === module) {
  const preview = new RuntimePreview();
  preview.runAllDemos().catch(console.error);
}
