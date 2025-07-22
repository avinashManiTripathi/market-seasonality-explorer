import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { orderBookAtom } from '../store/orderBookState';

interface Order {
  price: number;
  quantity: number;
}

export const useOrderBook = (symbol: string) => {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const setOrderBook = useSetRecoilState(orderBookAtom(symbol));

  useEffect(() => {
    if (!symbol) return;

    const formattedSymbol = symbol.toLowerCase();
    const wsUrl = `wss://stream.binance.com:9443/ws/${formattedSymbol}@depth`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setLoading(false);
      setError(null);
    };

    ws.onmessage = (e) => {
      try {
        console.log('✅ Success Connected:', JSON.parse(e.data));
        const data = JSON.parse(e.data);
        const rawBids = (data.b ?? []).slice(0, 10);
        const rawAsks = (data.a ?? []).slice(0, 10);

        const parsedBids = rawBids.map(([price, quantity]: string[]) => ({
          price: parseFloat(price),
          quantity: parseFloat(quantity),
        }));

        const parsedAsks = rawAsks.map(([price, quantity]: string[]) => ({
          price: parseFloat(price),
          quantity: parseFloat(quantity),
        }));

        setBids(parsedBids);
        setAsks(parsedAsks);

        // ✅ Store in Recoil
        setOrderBook({ bids: parsedBids, asks: parsedAsks });
      } catch (err) {
        console.error('Failed to parse order book data:', err);
        setError('Data parsing error');
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      setError('WebSocket error');
    };

    ws.onclose = () => {
      console.warn('WebSocket closed');
    };

    return () => ws.close();
  }, [symbol, setOrderBook]);

  return { bids, asks, loading, error };
};
