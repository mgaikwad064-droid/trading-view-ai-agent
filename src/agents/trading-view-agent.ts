import axios, { AxiosInstance } from 'axios';

/**
 * Trading View AI Agent
 * Fetches market data, analyzes trends, and provides trading signals
 */

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: Date;
}

interface TradingSignal {
  symbol: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  reason: string;
  timestamp: Date;
}

interface TrendAnalysis {
  symbol: string;
  trend: 'UPTREND' | 'DOWNTREND' | 'SIDEWAYS';
  strength: number;
  support: number;
  resistance: number;
}

class TradingViewAIAgent {
  private apiClient: AxiosInstance;
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string, baseURL: string = 'https://api.example.com') {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.apiClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Fetch market data for a given symbol
   */
  async fetchMarketData(symbol: string): Promise<MarketData> {
    try {
      const response = await this.apiClient.get(`/market/${symbol}`);
      const data = response.data;

      return {
        symbol,
        price: data.price,
        change: data.change,
        changePercent: data.changePercent,
        volume: data.volume,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error(`Error fetching market data for ${symbol}:`, error);
      throw new Error(`Failed to fetch market data for ${symbol}`);
    }
  }

  /**
   * Analyze market trends
   */
  async analyzeTrend(symbol: string): Promise<TrendAnalysis> {
    try {
      const response = await this.apiClient.get(`/analysis/trend/${symbol}`);
      const data = response.data;

      return {
        symbol,
        trend: data.trend,
        strength: data.strength,
        support: data.support,
        resistance: data.resistance,
      };
    } catch (error) {
      console.error(`Error analyzing trend for ${symbol}:`, error);
      throw new Error(`Failed to analyze trend for ${symbol}`);
    }
  }

  /**
   * Generate trading signals based on market analysis
   */
  async generateTradingSignal(symbol: string): Promise<TradingSignal> {
    try {
      const marketData = await this.fetchMarketData(symbol);
      const trendAnalysis = await this.analyzeTrend(symbol);

      // Simple logic for signal generation
      let signal: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
      let confidence = 0.5;
      let reason = 'No clear signal';

      if (trendAnalysis.trend === 'UPTREND' && marketData.changePercent > 0) {
        signal = 'BUY';
        confidence = Math.min(0.95, trendAnalysis.strength);
        reason = `Strong uptrend detected with ${trendAnalysis.strength * 100}% strength`;
      } else if (trendAnalysis.trend === 'DOWNTREND' && marketData.changePercent < 0) {
        signal = 'SELL';
        confidence = Math.min(0.95, trendAnalysis.strength);
        reason = `Strong downtrend detected with ${trendAnalysis.strength * 100}% strength`;
      } else if (trendAnalysis.trend === 'SIDEWAYS') {
        signal = 'HOLD';
        confidence = 0.6;
        reason = 'Market moving sideways, waiting for clear direction';
      }

      return {
        symbol,
        signal,
        confidence,
        reason,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error(`Error generating trading signal for ${symbol}:`, error);
      throw new Error(`Failed to generate trading signal for ${symbol}`);
    }
  }

  /**
   * Monitor multiple symbols and generate signals
   */
  async monitorSymbols(symbols: string[]): Promise<TradingSignal[]> {
    const signals = await Promise.all(
      symbols.map((symbol) => this.generateTradingSignal(symbol))
    );
    return signals;
  }

  /**
   * Get market data for multiple symbols
   */
  async getMultipleMarketData(symbols: string[]): Promise<MarketData[]> {
    const marketData = await Promise.all(
      symbols.map((symbol) => this.fetchMarketData(symbol))
    );
    return marketData;
  }

  /**
   * Format signal for display
   */
  formatSignal(signal: TradingSignal): string {
    return `
      Symbol: ${signal.symbol}
      Signal: ${signal.signal}
      Confidence: ${(signal.confidence * 100).toFixed(2)}%
      Reason: ${signal.reason}
      Time: ${signal.timestamp.toISOString()}
    `;
  }
}

export { TradingViewAIAgent, MarketData, TradingSignal, TrendAnalysis };
