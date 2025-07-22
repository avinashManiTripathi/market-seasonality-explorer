import { atomFamily } from 'recoil';

export interface Order {
  price: number;
  quantity: number;
}

export interface OrderBook {
  bids: Order[];
  asks: Order[];
}

export const orderBookAtom = atomFamily<OrderBook, string>({
  key: 'orderBookAtom',
  default: { bids: [], asks: [] },
});

