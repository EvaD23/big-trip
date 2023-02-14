import PointsListPresenter from './presenter/points-list-presenter.js';
import FilterModel from './model/filter-model.js';
import { END_POINT } from './constants.js';
import randomstring from 'randomstring';
import PointService from './point-service.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import HeaderPresenter from './presenter/header-presenter.js';

const token = `Basic ${randomstring.generate()}`;
const pointService = new PointService(END_POINT, token);
const offersModel = new OffersModel({ apiService: pointService });
const destinationsModel = new DestinationsModel({ apiService: pointService });
const pointsModel = new PointsModel({ offersModel, destinationsModel, apiService: pointService });
pointsModel.init();

const filterModel = new FilterModel();

const pointsContainer = document.querySelector('.trip-events');
const pointsPresenter = new PointsListPresenter({
  pointsContainer: pointsContainer,
  filterModel: filterModel,
  onNewPointFormClose: handleNewPointFormClose,
  pointsModel: pointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel
});
pointsPresenter.init();


const newPointContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');

const headerPresenter = new HeaderPresenter({
  filterContainer: filterContainer,
  filterModel: filterModel,
  pointsModel: pointsModel,
  openNewPointForm: pointsPresenter.openNewPointForm,
  newPointContainer: newPointContainer
});
headerPresenter.init();

function handleNewPointFormClose() {
  headerPresenter.handleNewPointFormClose();
}
