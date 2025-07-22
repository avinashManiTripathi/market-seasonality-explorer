import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface Order {
  price: number;
  quantity: number;
}

interface Props {
  bids: Order[];
  asks: Order[];
}

const formatData = (orders: Order[]) => {
  const sorted = [...orders].sort((a, b) => a.price - b.price);
  let cumulative = 0;
  return sorted.map((o) => {
    cumulative += o.quantity;
    return { price: o.price, volume: cumulative };
  });
};

const OrderBookDepthChart: React.FC<Props> = ({ bids, asks }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart>
        <XAxis dataKey="price" type="number" domain={['dataMin', 'dataMax']} />
        <YAxis dataKey="volume" />
        <Tooltip />
        <Area
          dataKey="volume"
          data={formatData(bids)}
          stroke="#48bb78"
          fill="#48bb78"
          name="Bids"
        />
        <Area
          dataKey="volume"
          data={formatData(asks)}
          stroke="#f56565"
          fill="#f56565"
          name="Asks"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OrderBookDepthChart;
