import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointTime, machinePointDateTime, humanizePointDate, machinePointDate } from '../utils/point.js';
import { padStartZero } from '../utils/utils.js';
import he from 'he';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function createOfferTemplate(offer) {
  return `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>`;
}

function createDurationTemplate(point) {
  const start = dayjs(point.start);
  const end = dayjs(point.end);
  const durationPoint = dayjs.duration(end.diff(start));
  const minutes = padStartZero(durationPoint.minutes());
  const hours = padStartZero(durationPoint.hours());
  const days = padStartZero(durationPoint.days());
  if (durationPoint.asMinutes() < 60) {
    return `${minutes}M`;
  } else if (durationPoint.asHours() < 24) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${days}D ${hours}H ${minutes}M`;
  }
}

function createPointTemplate(point) {
  const offersTemplate = point.offers.map(createOfferTemplate).join('\n');

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${machinePointDate(point.start)}">${humanizePointDate(point.start)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${point.type} ${point.destination ? he.encode(point.destination.name) : ''}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${machinePointDateTime(point.start)}">${humanizePointTime(point.start)}</time>
        &mdash;
        <time class="event__end-time" datetime="${machinePointDateTime(point.end)}">${humanizePointTime(point.end)}</time>
      </p>
      <p class="event__duration">${createDurationTemplate(point)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${point.price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offersTemplate}
    </ul>
    <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class PointView extends AbstractView {
  #point = null;
  #handleClick = null;
  #handleClickFavorite = null;

  constructor({ point, onRollUp, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#handleClick = onRollUp;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.#handleClickFavorite = onFavoriteClick;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#clickFavoriteHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #clickHandler = () => {
    this.#handleClick();
  };

  #clickFavoriteHandler = () => {
    this.#handleClickFavorite();
  };
}


