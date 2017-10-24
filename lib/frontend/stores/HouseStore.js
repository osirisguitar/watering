'use strict';

import AppDispatcher from '../dispatcher/Dispatcher';
import Store from './store';

const CHANGE_EVENT = 'houses.change';

const HouseStore = new Store(CHANGE_EVENT, 'houses');

/**
 * Register actions for RoomStore
 */
HouseStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case 'house.add':
      HouseStore.addItem(action.room);
      HouseStore.emitChange();
      break;
    case 'house.update':
      HouseStore.updateItem(action.room);
      HouseStore.emitChange();
      break;
    case 'room.update':
      dispatcher.waitFor([RoomStore.dispatchToken]);
      HouseStore.refresh();
      HouseStore.emitChange();
      break;
  }
});

export default HouseStore;
