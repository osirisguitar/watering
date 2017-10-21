'use strict';

import AppDispatcher from '../dispatcher/Dispatcher';
import Store from './store';

const CHANGE_EVENT = 'plants.change';

const PlantStore = new Store(CHANGE_EVENT, 'plants');

/**
 * Register actions for RoomStore
 */
PlantStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case 'plant.add':
      PlantStore.addItem(action.plant);
      PlantStore.emitChange();
      break;
    case 'plant.update':
      PlantStore.updateItem(action.plant);
      PlantStore.emitChange();
      break;
  }
});

export default PlantStore;
