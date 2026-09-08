import axios, { AxiosInstance } from 'axios';

/**
 * Trading Investment AI Agent
 * Handles buy/sell calls using technical indicators
 * Integrates with trading platforms for automated execution
 */

// Technical Indicators
interface TechnicalIndicators {
  rsi: number; // Relative Strength Index (0-100)
  macd: {
    line: number;
    signal: number;
    histogram: number;
  };
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
  };
  movingAverages: {
    sma20: number;
    sma50: number;
    sma200: number;
    ema12: number;
    ema26: number;
  };
  volume: {
    current: number;
    average: number;
  };
}

// Trading Decision
interface TradeDecision {
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  riskRewardRatio: number;
  confidence: number;
  indicators: string[];
  reasoning: string;
  timestamp: Date;
}

// Portfolio Trade
interface PortfolioTrade {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit: number;
  status: 'OPEN' | 'CLOSED' | 'PENDING';
  openedAt: Date;
  closedAt?: Date;
  profitLoss?: number;
  profitLossPercent?: number;
}

// Investment Portfolio
interface Portfolio {
  totalCapital: number;
  availableCapital: number;
  usedCapital: number;
  trades: PortfolioTrade[];
  totalProfitLoss: number;
  winRate: number;
}

class TradingInvestmentAIAgent {
  private apiClient: AxiosInstance;
  private apiKey: string;
  private baseURL: string;
  private portfolio: Portfolio;
  private riskPerTrade: number; // Risk percentage per trade (e.g., 0.02 for 2%)

  constructor(
    apiKey: string,
    initialCapital: number,
    baseURL: string = 'https://api.example.com',
    riskPerTrade: number = 0.02
  ) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.riskPerTrade = riskPerTrade;

    this.apiClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    this.portfolio = {
      totalCapital: initialCapital,
      availableCapital: initialCapital,
      usedCapital: 0,
      trades: [],
      totalProfitLoss: 0,
      winRate: 0,
    };
  }

  /**
   * Fetch technical indicators for a symbol
   */
  async getIndicators(symbol: string, timeframe: string = '1h'): Promise<TechnicalIndicators> {
    try {
      const response = await this.apiClient.get(`/indicators/${symbol}`, {
        params: { timeframe },
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching indicators for ${symbol}:`, error);
      throw new Error(`Failed to fetch indicators for ${symbol}`);
    }
  }

  /**
   * Analyze indicators for buy signals
   */
  private analyzeBuySignals(indicators: TechnicalIndicators): string[] {
    const signals: string[] = [];

    // RSI Analysis (Below 30 = Oversold = BUY)
    if (indicators.rsi < 30) {
      signals.push('RSI Oversold (<30)');
    } else if (indicators.rsi < 40) {
      signals.push('RSI Approaching Oversold');
    }

    // MACD Analysis (Bullish Crossover)
    if (indicators.macd.line > indicators.macd.signal && indicators.macd.histogram > 0) {
      signals.push('MACD Bullish Crossover');
    }

    // Moving Averages (Price above MAs)
    if (
      indicators.movingAverages.ema12 > indicators.movingAverages.sma20 &&
      indicators.movingAverages.sma20 > indicators.movingAverages.sma50
    ) {
      signals.push('Golden Cross (EMA12 > SMA20 > SMA50)');
    }

    // Bollinger Bands (Price at lower band)
    if (indicators.bollingerBands.lower > 0) {
      signals.push('Price near Lower Bollinger Band');
    }

    // Volume Analysis
    if (indicators.volume.current > indicators.volume.average * 1.5) {
      signals.push('High Volume Support');
    }

    return signals;
  }

  /**
   * Analyze indicators for sell signals
   */
  private analyzeSellSignals(indicators: TechnicalIndicators): string[] {
    const signals: string[] = [];

    // RSI Analysis (Above 70 = Overbought = SELL)
    if (indicators.rsi > 70) {
      signals.push('RSI Overbought (>70)');
    } else if (indicators.rsi > 60) {
      signals.push('RSI Approaching Overbought');
    }

    // MACD Analysis (Bearish Crossover)
    if (indicators.macd.line < indicators.macd.signal && indicators.macd.histogram < 0) {
      signals.push('MACD Bearish Crossover');
    }

    // Moving Averages (Price below MAs)
    if (
      indicators.movingAverages.ema12 < indicators.movingAverages.sma20 &&
      indicators.movingAverages.sma20 < indicators.movingAverages.sma50
    ) {
      signals.push('Death Cross (EMA12 < SMA20 < SMA50)');
    }

    // Bollinger Bands (Price at upper band)
    if (indicators.bollingerBands.upper > 0) {
      signals.push('Price near Upper Bollinger Band');
    }

    // Volume Analysis
    if (indicators.volume.current > indicators.volume.average * 1.5) {
      signals.push('High Volume Rejection');
    }

    return signals;
  }

  /**
   * Calculate position size based on risk management
   */
  private calculatePositionSize(
    currentPrice: number,
    stopLoss: number
  ): number {
    const riskAmount = this.portfolio.availableCapital * this.riskPerTrade;
    const priceRisk = Math.abs(currentPrice - stopLoss);

    if (priceRisk === 0) return 0;

    return Math.floor((riskAmount / priceRisk) * 100) / 100; // Position size in quantity
  }

  /**
   * Generate trade decision based on indicators
   */
  async generateTradeDecision(
    symbol: string,
    currentPrice: number,
    timeframe: string = '1h'
  ): Promise<TradeDecision> {
    try {
      const indicators = await this.getIndicators(symbol, timeframe);

      const buySignals = this.analyzeBuySignals(indicators);
      const sellSignals = this.analyzeSellSignals(indicators);

      let action: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
      let confidence = 0;
      let stopLoss = currentPrice;
      let takeProfit = currentPrice;
      let reasoning = 'Insufficient signals for action';

      // Determine action based on signal strength
      if (buySignals.length >= 3) {
        action = 'BUY';
        confidence = Math.min(0.95, buySignals.length * 0.2);
        stopLoss = currentPrice * 0.98; // 2% below entry
        takeProfit = currentPrice * 1.05; // 5% above entry
        reasoning = `Strong buy signals detected: ${buySignals.join(', ')}`;
      } else if (buySignals.length >= 2) {
        action = 'BUY';
        confidence = 0.65;
        stopLoss = currentPrice * 0.97;
        takeProfit = currentPrice * 1.04;
        reasoning = `Moderate buy signals: ${buySignals.join(', ')}`;
      } else if (sellSignals.length >= 3) {
        action = 'SELL';
        confidence = Math.min(0.95, sellSignals.length * 0.2);
        stopLoss = currentPrice * 1.02; // 2% above entry
        takeProfit = currentPrice * 0.95; // 5% below entry
        reasoning = `Strong sell signals detected: ${sellSignals.join(', ')}`;
      } else if (sellSignals.length >= 2) {
        action = 'SELL';
        confidence = 0.65;
        stopLoss = currentPrice * 1.01;
        takeProfit = currentPrice * 0.96;
        reasoning = `Moderate sell signals: ${sellSignals.join(', ')}`;
      }

      const riskRewardRatio =
        action !== 'HOLD'
          ? Math.abs(takeProfit - currentPrice) / Math.abs(currentPrice - stopLoss)
          : 0;

      return {
        symbol,
        action,
        entryPrice: currentPrice,
        stopLoss,
        takeProfit,
        riskRewardRatio,
        confidence,
        indicators: action === 'BUY' ? buySignals : sellSignals,
        reasoning,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error(`Error generating trade decision for ${symbol}:`, error);
      throw new Error(`Failed to generate trade decision for ${symbol}`);
    }
  }

  /**
   * Execute a buy trade
   */
  async executeBuyTrade(
    symbol: string,
    currentPrice: number,
    decision: TradeDecision
  ): Promise<PortfolioTrade | null> {
    if (decision.action !== 'BUY' || decision.confidence < 0.6) {
      console.log(`Buy trade rejected for ${symbol}: Low confidence or not a buy signal`);
      return null;
    }

    const quantity = this.calculatePositionSize(currentPrice, decision.stopLoss);

    if (quantity <= 0 || quantity * currentPrice > this.portfolio.availableCapital) {
      console.log(`Insufficient capital for ${symbol} buy trade`);
      return null;
    }

    const trade: PortfolioTrade = {
      id: `${symbol}-${Date.now()}`,
      symbol,
      action: 'BUY',
      quantity,
      entryPrice: currentPrice,
      currentPrice,
      stopLoss: decision.stopLoss,
      takeProfit: decision.takeProfit,
      status: 'OPEN',
      openedAt: new Date(),
    };

    // Update portfolio
    const tradeValue = quantity * currentPrice;
    this.portfolio.usedCapital += tradeValue;
    this.portfolio.availableCapital -= tradeValue;
    this.portfolio.trades.push(trade);

    console.log(`✅ BUY EXECUTED: ${quantity} units of ${symbol} at $${currentPrice}`);
    console.log(`   Stop Loss: $${decision.stopLoss.toFixed(2)}`);
    console.log(`   Take Profit: $${decision.takeProfit.toFixed(2)}`);

    return trade;
  }

  /**
   * Execute a sell trade
   */
  async executeSellTrade(
    symbol: string,
    currentPrice: number,
    decision: TradeDecision
  ): Promise<PortfolioTrade | null> {
    if (decision.action !== 'SELL' || decision.confidence < 0.6) {
      console.log(`Sell trade rejected for ${symbol}: Low confidence or not a sell signal`);
      return null;
    }

    // Find open buy trade for this symbol
    const openTrade = this.portfolio.trades.find(
      (t) => t.symbol === symbol && t.status === 'OPEN' && t.action === 'BUY'
    );

    if (!openTrade) {
      console.log(`No open buy position found for ${symbol}`);
      return null;
    }

    // Calculate P&L
    const profitLoss = (currentPrice - openTrade.entryPrice) * openTrade.quantity;
    const profitLossPercent = ((currentPrice - openTrade.entryPrice) / openTrade.entryPrice) * 100;

    // Create sell trade
    const sellTrade: PortfolioTrade = {
      id: `${symbol}-SELL-${Date.now()}`,
      symbol,
      action: 'SELL',
      quantity: openTrade.quantity,
      entryPrice: openTrade.entryPrice,
      currentPrice,
      stopLoss: openTrade.stopLoss,
      takeProfit: openTrade.takeProfit,
      status: 'CLOSED',
      openedAt: openTrade.openedAt,
      closedAt: new Date(),
      profitLoss,
      profitLossPercent,
    };

    // Update portfolio
    const tradeValue = openTrade.quantity * currentPrice;
    this.portfolio.usedCapital -= tradeValue;
    this.portfolio.availableCapital += tradeValue;
    this.portfolio.totalProfitLoss += profitLoss;

    openTrade.status = 'CLOSED';
    openTrade.closedAt = new Date();
    openTrade.profitLoss = profitLoss;
    openTrade.profitLossPercent = profitLossPercent;

    this.portfolio.trades.push(sellTrade);

    // Update win rate
    this.updateWinRate();

    console.log(`✅ SELL EXECUTED: ${openTrade.quantity} units of ${symbol} at $${currentPrice}`);
    console.log(`   Entry Price: $${openTrade.entryPrice.toFixed(2)}`);
    console.log(`   Profit/Loss: $${profitLoss.toFixed(2)} (${profitLossPercent.toFixed(2)}%)`);

    return sellTrade;
  }

  /**
   * Update win rate based on closed trades
   */
  private updateWinRate(): void {
    const closedTrades = this.portfolio.trades.filter((t) => t.status === 'CLOSED' && t.profitLoss !== undefined);

    if (closedTrades.length === 0) {
      this.portfolio.winRate = 0;
      return;
    }

    const winningTrades = closedTrades.filter((t) => t.profitLoss! > 0).length;
    this.portfolio.winRate = (winningTrades / closedTrades.length) * 100;
  }

  /**
   * Monitor and manage open positions
   */
  async monitorPositions(currentPrices: Record<string, number>): Promise<void> {
    for (const trade of this.portfolio.trades) {
      if (trade.status !== 'OPEN') continue;

      const currentPrice = currentPrices[trade.symbol];
      if (!currentPrice) continue;

      // Check stop loss
      if (trade.action === 'BUY' && currentPrice <= trade.stopLoss) {
        console.log(`⛔ STOP LOSS HIT: ${trade.symbol} at $${currentPrice}`);
        await this.executeSellTrade(trade.symbol, currentPrice, {
          symbol: trade.symbol,
          action: 'SELL',
          entryPrice: currentPrice,
          stopLoss: trade.stopLoss,
          takeProfit: trade.takeProfit,
          riskRewardRatio: 0,
          confidence: 1,
          indicators: ['Stop Loss'],
          reasoning: 'Stop loss triggered',
          timestamp: new Date(),
        });
      }

      // Check take profit
      if (trade.action === 'BUY' && currentPrice >= trade.takeProfit) {
        console.log(`🎯 TAKE PROFIT HIT: ${trade.symbol} at $${currentPrice}`);
        await this.executeSellTrade(trade.symbol, currentPrice, {
          symbol: trade.symbol,
          action: 'SELL',
          entryPrice: currentPrice,
          stopLoss: trade.stopLoss,
          takeProfit: trade.takeProfit,
          riskRewardRatio: 0,
          confidence: 1,
          indicators: ['Take Profit'],
          reasoning: 'Take profit triggered',
          timestamp: new Date(),
        });
      }
    }
  }

  /**
   * Get portfolio summary
   */
  getPortfolioSummary(): Portfolio {
    return { ...this.portfolio };
  }

  /**
   * Get portfolio statistics
   */
  getPortfolioStats(): {
    totalCapital: number;
    availableCapital: number;
    usedCapital: number;
    totalProfitLoss: number;
    totalReturnPercent: number;
    winRate: number;
    openTrades: number;
    closedTrades: number;
  } {
    const openTrades = this.portfolio.trades.filter((t) => t.status === 'OPEN').length;
    const closedTrades = this.portfolio.trades.filter((t) => t.status === 'CLOSED').length;
    const totalReturnPercent = (this.portfolio.totalProfitLoss / this.portfolio.totalCapital) * 100;

    return {
      totalCapital: this.portfolio.totalCapital,
      availableCapital: this.portfolio.availableCapital,
      usedCapital: this.portfolio.usedCapital,
      totalProfitLoss: this.portfolio.totalProfitLoss,
      totalReturnPercent,
      winRate: this.portfolio.winRate,
      openTrades,
      closedTrades,
    };
  }

  /**
   * Format trade decision for display
   */
  formatDecision(decision: TradeDecision): string {
    return `
╔══════════════════════════════════════════╗
║         TRADING DECISION REPORT          ║
╠══════════════════════════════════════════╣
║ Symbol:          ${decision.symbol.padEnd(28)} ║
║ Action:          ${decision.action.padEnd(28)} ║
║ Entry Price:     $${decision.entryPrice.toFixed(2).padEnd(26)} ║
║ Stop Loss:       $${decision.stopLoss.toFixed(2).padEnd(26)} ║
║ Take Profit:     $${decision.takeProfit.toFixed(2).padEnd(26)} ║
║ Risk/Reward:     ${decision.riskRewardRatio.toFixed(2).padEnd(28)} ║
║ Confidence:      ${(decision.confidence * 100).toFixed(0)}%${' '.repeat(25)} ║
║──────────────────────────────────────────║
║ Signals: ${decision.indicators.join(', ').padEnd(31)} ║
║──────────────────────────────────────────║
║ ${decision.reasoning.padEnd(40)} ║
╚══════════════════════════════════════════╝
    `;
  }
}

export {
  TradingInvestmentAIAgent,
  TradeDecision,
  TechnicalIndicators,
  PortfolioTrade,
  Portfolio,
};
