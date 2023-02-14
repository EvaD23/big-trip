import FilterPresenter from './filter-presenter.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import { UpdateType, FilterType } from '../constants.js';
import { render } from '../framework/render.js';
import SummaryPresenter from './summary-presenter.js';

export default class HeaderPresenter {
  #filterPresenter = null;
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #newPointComponent = null;
  #openNewPointForm = null;
  #newPointContainer = null;
  #summaryPresenter = null;

  constructor({ filterContainer, filterModel, pointsModel, openNewPointForm, newPointContainer }) {
    this.#filterPresenter = new FilterPresenter({
      filterContainer: filterContainer,
      filterModel: filterModel,
      pointsModel: pointsModel
    });
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#openNewPointForm = openNewPointForm;
    this.#newPointContainer = newPointContainer;

    this.#newPointComponent = new NewPointButtonView({
      onClick: this.#handleNewPointButtonClick
    });
    this.#pointsModel.addObserver(this.#handleModelEvent);

    this.#summaryPresenter = new SummaryPresenter({
      summaryViewContainer: this.#newPointContainer,
    });
  }

  init() {
    this.#filterPresenter.init();
    render(this.#newPointComponent, this.#newPointContainer);
  }

  handleNewPointFormClose() {
    this.#newPointComponent.element.disabled = false;
  }

  #renderSummary() {
    const points = this.#pointsModel.points;
    if (points.length > 0) {
      this.#summaryPresenter.init(points);
    } else {
      this.#summaryPresenter.destroy();
    }
  }

  #disableButton() {
    this.#newPointComponent.element.disabled = true;
  }

  #handleNewPointButtonClick = () => {
    this.#openNewPointForm();
    this.#newPointComponent.element.disabled = true;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
  };

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.ERROR:
        this.#disableButton();
        break;
      default:
        this.#renderSummary();

    }

  };
}
