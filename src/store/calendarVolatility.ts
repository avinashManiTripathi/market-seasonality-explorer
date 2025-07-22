import { atomFamily } from 'recoil';

export const dailyVolatilityAtom = atomFamily<number, string>({
  key: 'dailyVolatilityAtom',
  default: 0,
});
