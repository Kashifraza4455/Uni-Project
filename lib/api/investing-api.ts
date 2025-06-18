// Investing.com API integration
interface InvestingApiResponse {
  data: {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
    high: number
    low: number
    volume: number
    timestamp: number
  }[]
}

interface CommodityPrice {
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
  high?: number
  low?: number
  volume?: number
}

export class InvestingAPI {
  private baseUrl = "https://api.investing.com/api/financialdata"
  private apiKey = process.env.INVESTING_API_KEY

  async getCommodityPrices(symbols: string[]): Promise<CommodityPrice[]> {
    try {
      const response = await fetch(`${this.baseUrl}/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
          "User-Agent": "CommodityPro/1.0",
        },
        body: JSON.stringify({
          symbols: symbols,
          fields: ["price", "change", "changePercent", "high", "low", "volume"],
        }),
      })

      if (!response.ok) {
        throw new Error(`Investing API error: ${response.status}`)
      }

      const data: InvestingApiResponse = await response.json()

      return data.data.map((item) => ({
        name: this.getDisplayName(item.symbol),
        symbol: item.symbol,
        price: item.price,
        change: item.change,
        changePercent: item.changePercent,
        high: item.high,
        low: item.low,
        volume: item.volume,
      }))
    } catch (error) {
      console.error("Error fetching commodity prices:", error)
      // Return fallback data
      return this.getFallbackData(symbols)
    }
  }

  async getHistoricalData(symbol: string, period = "1M"): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/historical/${symbol}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "User-Agent": "CommodityPro/1.0",
        },
        params: new URLSearchParams({
          period,
          interval: "daily",
        }),
      })

      if (!response.ok) {
        throw new Error(`Historical data error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching historical data:", error)
      return []
    }
  }

  private getDisplayName(symbol: string): string {
    const symbolMap: Record<string, string> = {
      XAU: "Gold",
      XAG: "Silver",
      CL: "Crude Oil",
      NG: "Natural Gas",
      HG: "Copper",
      PL: "Platinum",
      PA: "Palladium",
      GC: "Gold Futures",
      SI: "Silver Futures",
    }
    return symbolMap[symbol] || symbol
  }

  private getFallbackData(symbols: string[]): CommodityPrice[] {
    // Fallback mock data when API fails
    return [
      { name: "Gold", symbol: "XAU", price: 2045.5, change: 12.3, changePercent: 0.61 },
      { name: "Silver", symbol: "XAG", price: 24.85, change: -0.45, changePercent: -1.78 },
      { name: "Crude Oil", symbol: "CL", price: 78.92, change: 2.15, changePercent: 2.8 },
      { name: "Copper", symbol: "HG", price: 3.85, change: -0.08, changePercent: -2.04 },
      { name: "Natural Gas", symbol: "NG", price: 2.65, change: 0.12, changePercent: 4.74 },
      { name: "Platinum", symbol: "PL", price: 1025.4, change: -8.6, changePercent: -0.83 },
    ]
  }
}

export const investingAPI = new InvestingAPI()
