import FilterView from '../view/filter-view.js';
import { render, replace, remove } from '../framework/render.js';
import { FilterType, UpdateType } from '../constants.js';
import { filter } from '../utils/filter.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filterComponent = null;
  #pointsModel = null;
  #filterType = FilterType.ALL;

  constructor({ filterContainer, filterModel, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleFilterModelEvent);
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handlePointsModelEvent);
  }

  init(filterType = FilterType.ALL) {
    this.#filterType = filterType;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView({
      onChange: this.#handleFilterChange,
      filterType: filterType,
      disableFilter: this.#disableFilter
    });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #disableFilter = (filterType) => {
    const filterFn = filter[filterType];
    return filterType !== this.#filterType &&
      filterFn(this.#pointsModel.points).length === 0;
  };

  #handleFilterChange = (filterType) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleFilterModelEvent = (_updateType, filterType) => {
    this.init(filterType);
  };

  #handlePointsModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.MAJOR:
      case UpdateType.INIT:
        this.init(this.#filterType);
        break;
    }
  };
}
