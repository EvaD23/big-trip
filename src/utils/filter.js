import { FilterType } from '../constants.js';

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => {
    const now = new Date();
    return points.filter((point) => point.start >= now);
  },
  [FilterType.PRESENT]: (points) => {
    const now = new Date();
    return points.filter((point) => point.end >= now && point.start < now);
  },
  [FilterType.PAST]: (points) => {
    const now = new Date();
    return points.filter((point) => point.end < now);
  },
};

export { filter };
