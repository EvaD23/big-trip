import { SortType } from '../constants.js';
import dayjs from 'dayjs';


const sorter = {
  [SortType.PRICE]: (pointA, pointB) => pointB.price - pointA.price,
  [SortType.DAY]: (pointA, pointB) => dayjs(pointA.start).diff(dayjs(pointB.start)),
  [SortType.TIME]: (pointA, pointB) => {
    const durationA = dayjs(pointA.end).diff(dayjs(pointA.start));
    const durationB = dayjs(pointB.end).diff(dayjs(pointB.start));
    return durationB - durationA;
  }

};

export { sorter };
