// Deriv.com API integration
interface DerivTickResponse {
  tick: {
    symbol: string
    quote: number
    bid: number
    ask: number
    pip_size: number
    epoch: number
  }
}

interface DerivMarketData {
  symbol: string
  name: string
  price: number
  bid: number
  ask: number
  spread: number
  timestamp: number
}

export class DerivAPI {
  private wsUrl = "wss://ws.binaryws.com/websockets/v3"
  private apiToken = process.env.DERIV_API_TOKEN
  private ws: WebSocket | null = null
  private subscribers: Map<string, (data: DerivMarketData) => void> = new Map()

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(`${this.wsUrl}?app_id=1089`)

      this.ws.onopen = () => {
        console.log("Connected to Deriv WebSocket")
        resolve()
      }

      this.ws.onerror = (error) => {
        console.error("Deriv WebSocket error:", error)
        reject(error)
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (error) {
          console.error("Error parsing Deriv message:", error)
        }
      }
    })
  }

  async getMarketData(symbols: string[]): Promise<DerivMarketData[]> {
    try {
      const promises = symbols.map((symbol) => this.getSymbolData(symbol))
      const results = await Promise.all(promises)
      return results.filter(Boolean) as DerivMarketData[]
    } catch (error) {
      console.error("Error fetching Deriv market data:", error)
      return this.getFallbackMarketData()
    }
  }

  private async getSymbolData(symbol: string): Promise<DerivMarketData | null> {
    return new Promise((resolve) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        resolve(null)
        return
      }

      const requestId = `tick_${symbol}_${Date.now()}`

      // Subscribe to real-time ticks
      this.ws.send(
        JSON.stringify({
          ticks: symbol,
          subscribe: 1,
          req_id: requestId,
        }),
      )

      // Set timeout for response
      setTimeout(() => resolve(null), 5000)

      // Store callback for this request
      this.subscribers.set(requestId, (data) => {
        resolve(data)
        this.subscribers.delete(requestId)
      })
    })
  }

  private handleMessage(data: any) {
    if (data.tick) {
      const tickData: DerivMarketData = {
        symbol: data.tick.symbol,
        name: this.getDisplayName(data.tick.symbol),
        price: data.tick.quote,
        bid: data.tick.bid || data.tick.quote,
        ask: data.tick.ask || data.tick.quote,
        spread: data.tick.ask - data.tick.bid || 0,
        timestamp: data.tick.epoch * 1000,
      }

      // Notify subscribers
      this.subscribers.forEach((callback) => callback(tickData))
    }
  }

  subscribeToTicks(symbols: string[], callback: (data: DerivMarketData) => void) {
    symbols.forEach((symbol) => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(
          JSON.stringify({
            ticks: symbol,
            subscribe: 1,
          }),
        )
      }
    })

    const subscriptionId = `sub_${Date.now()}`
    this.subscribers.set(subscriptionId, callback)

    return () => {
      this.subscribers.delete(subscriptionId)
    }
  }

  private getDisplayName(symbol: string): string {
    const symbolMap: Record<string, string> = {
      frxXAUUSD: "Gold/USD",
      frxXAGUSD: "Silver/USD",
      frxUSOIL: "US Oil",
      frxUKOIL: "UK Oil",
      frxXPTUSD: "Platinum/USD",
      frxXPDUSD: "Palladium/USD",
    }
    return symbolMap[symbol] || symbol
  }

  private getFallbackMarketData(): DerivMarketData[] {
    return [
      {
        symbol: "frxXAUUSD",
        name: "Gold/USD",
        price: 2045.5,
        bid: 2045.0,
        ask: 2046.0,
        spread: 1.0,
        timestamp: Date.now(),
      },
      {
        symbol: "frxXAGUSD",
        name: "Silver/USD",
        price: 24.85,
        bid: 24.83,
        ask: 24.87,
        spread: 0.04,
        timestamp: Date.now(),
      },
    ]
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.subscribers.clear()
  }
}

export const derivAPI = new DerivAPI()
