'use strict';

import AppDispatcher from '../dispatcher/Dispatcher';
import Store from './store';

const CHANGE_EVENT = 'rooms.change';

const RoomStore = new Store(CHANGE_EVENT, 'rooms');

/**
 * Register actions for RoomStore
 */
RoomStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case 'room.add':
      RoomStore.addItem(action.room);
      RoomStore.emitChange();
      break;
    case 'room.update':
      RoomStore.updateItem(action.room);
      RoomStore.emitChange();
      break;
    case 'plant.update':
      dispatcher.waitFor([PlantStore.dispatchToken]);
      RoomStore.refresh();
      RoomStore.emitChange();
      break;
  }
});

export default RoomStore;
