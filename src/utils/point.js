import dayjs from 'dayjs';

const TIME_FORMAT = 'HH:mm';
const MACHINE_FORMAT = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT = 'MMM DD';
const MACHINE_DATA_FORMAT = 'YYYY-MM-DD';

function humanizePointTime(datetime) {
  return dayjs(datetime).format(TIME_FORMAT);
}

function machinePointDateTime(dateTime) {
  return dayjs(dateTime).format(MACHINE_FORMAT);
}

function humanizePointDate(date) {
  return dayjs(date).format(DATE_FORMAT);
}

function machinePointDate(date) {
  return dayjs(date).format(MACHINE_DATA_FORMAT);
}

function getPointsStatistic(points) {
  const price = points.reduce((acc, point) => {
    const offersPrice = point.offers.reduce((oPrice, offer) => oPrice + offer.price, 0);
    return acc + point.price + offersPrice;
  }, 0);
  let route = '';
  if (points.length > 3) {
    route = `${points[0].destination.name} &mdash; ... &mdash; ${points[points.length - 1].destination.name}`;
  } else {
    route = points.map((point) => point.destination.name).join(' &mdash; ');
  }
  let duration = '';
  if (points.length > 0) {
    duration = `${humanizePointDate(points[0].start)} &mdash; ${humanizePointDate(points[points.length - 1].end)}`;
  }

  return {
    price: price,
    route: route,
    duration: duration,
  };
}


export {
  humanizePointTime,
  machinePointDateTime,
  humanizePointDate,
  machinePointDate,
  getPointsStatistic,
};
