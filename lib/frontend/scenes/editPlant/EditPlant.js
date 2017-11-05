'use strict';

import React from 'react';
import moment from 'moment';

import RoomStore from '../../stores/RoomStore';
import PlantStore from '../../stores/PlantStore';

export class EditPlant extends React.Component {
  constructor(props) {
    super(props);
    this.getRoom = this.getRoom.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.daysChange = this.daysChange.bind(this);
    this.savePlant = this.savePlant.bind(this);
    this.cancel = this.cancel.bind(this);
    this.state = { room: props.room, plant: { roomId: props.room.id }, onClose: props.onClose };
  }

  nameChange(event) {
    let plant = this.state.plant;
    plant.name = event.target.value;
    this.setState({plant: plant});
  }

  daysChange(event) {
    let plant = this.state.plant;
    plant.waterInterval = parseInt(event.target.value, 10);
    this.setState({ plant: plant });
  }

  render() {
    return (
      <div className="col s12 m6 editmodal">
        <div className="card">
          <div className="card-content">
            <span className="card-title">New plant in {this.state.room.name}</span>
            <div className="row">
              <div className="input-field col s12">
                <input id="plantName" type="text" className="validate" onChange={this.nameChange} />
                <label htmlFor="plantName">Plant name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="waterEvery" type="number" className="validate" onChange={this.daysChange} />
                <label htmlFor="waterEvery">Water every (days)</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <a onClick={this.savePlant}>Save</a>
            <a onClick={this.cancel}>Cancel</a>
          </div>
        </div>
      </div>
    );
  }
  
  getRoom (rooms, roomId) {
    return rooms.find(room => {
      return room.id === roomId;
    });
  }

  savePlant () {
    PlantStore.addItem(this.state.plant);
    this.props.onClose();
  }

  cancel () {
    this.props.onClose(); 
  }
}
