import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../constants.js';

function createFilterTemplate(filterType, disableFilter) {
  const checked = (filter) => filterType === filter ? 'checked' : '';
  const disabled = (filter) => disableFilter(filter) ? 'disabled' : '';
  return `<div class="trip-main__trip-controls  trip-controls">
  <div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.ALL}" ${checked(FilterType.ALL)}>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}" ${checked(FilterType.FUTURE)} ${disabled(FilterType.FUTURE)}>
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PRESENT}" ${checked(FilterType.PRESENT)} ${disabled(FilterType.PRESENT)} >
        <label class="trip-filters__filter-label" for="filter-present">Present</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST}" ${checked(FilterType.PAST)} ${disabled(FilterType.PAST)}>
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>
</div>`;
}

export default class FilterView extends AbstractView {
  #handleChangeFilter = null;
  #filterType = null;
  #disableFilter = null;

  constructor({ onChange, filterType, disableFilter }) {
    super();
    this.#handleChangeFilter = onChange;
    this.#filterType = filterType;
    this.#disableFilter = disableFilter;

    const filters = this.element.querySelectorAll('.trip-filters__filter-input');
    filters.forEach((filter) => {
      filter.addEventListener('change', this.#changeFilterHandler);
    });
  }

  get template() {
    return createFilterTemplate(this.#filterType, this.#disableFilter);
  }

  #changeFilterHandler = (evt) => {
    evt.preventDefault();
    this.#handleChangeFilter(evt.target.value);
  };

}
