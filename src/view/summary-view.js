import AbstractView from '../framework/view/abstract-view.js';
import { getPointsStatistic } from '../utils/point.js';

function createSummeryTemplate(statistics) {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${statistics.route}</h1>

    <p class="trip-info__dates">${statistics.duration}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${statistics.price}</span>
  </p>
</section>`;
}

export default class SummaryView extends AbstractView {
  #points = null;

  constructor({ points }) {
    super();
    this.#points = points;
  }

  get template() {
    const statistics = getPointsStatistic(this.#points);
    return createSummeryTemplate(statistics);
  }
}
