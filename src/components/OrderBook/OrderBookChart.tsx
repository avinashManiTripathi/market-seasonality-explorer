import { useOrderBook } from '../../hooks/useOrderBook';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface Props {
  symbol: string;
}

const OrderBookChart: React.FC<Props> = ({ symbol }) => {
  const { bids, asks } = useOrderBook(symbol);

  const bidData = [...bids] // clone array safely
  .sort((a, b) => b.price - a.price)
  .map((b, i, arr) => ({
    price: b.price,
    cumulative: arr.slice(0, i + 1).reduce((sum, o) => sum + o.quantity, 0),
  }));

const askData = [...asks] // clone again
  .sort((a, b) => a.price - b.price)
  .map((a, i, arr) => ({
    price: a.price,
    cumulative: arr.slice(0, i + 1).reduce((sum, o) => sum + o.quantity, 0),
  }));

  return (
    <LineChart width={500} height={300}>
      <XAxis dataKey="price" />
      <YAxis />
      <Tooltip />
      <Line data={bidData} type="stepAfter" dataKey="cumulative" stroke="green" />
      <Line data={askData} type="stepAfter" dataKey="cumulative" stroke="red" />
    </LineChart>
  );
};

export default OrderBookChart;
