import SummaryView from '../view/summary-view.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';


export default class SummaryPresenter {
  #summaryViewComponent = null;
  #summaryViewContainer = null;


  constructor({ summaryViewContainer }) {
    this.#summaryViewContainer = summaryViewContainer;

  }

  init(points) {
    const prevSummaryViewComponent = this.#summaryViewComponent;
    this.#summaryViewComponent = new SummaryView({
      points
    });

    if (!prevSummaryViewComponent) {
      render(this.#summaryViewComponent, this.#summaryViewContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#summaryViewComponent, prevSummaryViewComponent);
    remove(prevSummaryViewComponent);

  }

  destroy() {
    remove(this.#summaryViewComponent);
  }
}
