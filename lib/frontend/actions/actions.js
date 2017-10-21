'use strict';

const dispatcher = require('../dispatcher/Dispatcher');

let actions = {
  addRoom: function (room) {
    dispatcher.dispatch({
      actionType: 'room.add',
      room: room
    });
  },
  updateRoom: function (room) {
    dispatcher.dispatch({
      actionType: 'room.update',
      room: room
    });
  },
  addPlant: function (plant) {
    dispatcher.dispatch({
      actionType: 'plant.add',
      plant: plant
    });
  },
  updatePlant: function (plant) {
    dispatcher.dispatch({
      actionType: 'plant.update',
      plant: plant
    });
  }
};

export default actions;
