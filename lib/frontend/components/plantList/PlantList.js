'use strict';

import React from 'react';
import moment from 'moment';
import { WaterButton } from '../waterButton/WaterButton';
import PlantStore from '../../stores/PlantStore';
// import { House } from '../../scenes/house/House';
import { EditPlant } from '../../scenes/editPlant/EditPlant';
import { Link, Route } from 'react-router-dom';
import { Modal } from 'react-materialize';

export class PlantList extends React.Component {
  constructor(props) {
    super(props);
    this.plantsChanged = this.plantsChanged.bind(this);
    this.filterPlants = this.filterPlants.bind(this);
    this.state = { 
      room: props.room, 
      plants: this.filterPlants(PlantStore.getAll(), props.room.id),
      showEditPlants: false
    };
  }

  render () {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <span className="card-title">{this.state.room.name}</span>
              <a className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => {
                this.setState({ showEditPlants: true });
              }}><i className="material-icons">add</i></a>
              <ul className="room">
                {this.state.plants ? this.state.plants.map(plant => {
                  return <li key={plant.id}>
                    <div><WaterButton onClick={() => { this.waterPlant(plant); }} /></div>
                    <div>{plant.name} (water every {plant.waterInterval} days)<br /><span className={this.getWateringClass(plant)}>Watered {this.getDurationString(plant)}</span></div>
                    <div>
                      <Modal
                        header='Modal Header'
                        trigger={<a><i className="material-icons black-text">more_verts</i></a>}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                      </Modal>
                    </div>
                  </li>;
                }) : ''}
              </ul>
            </div>
            <div className="card-action"><WaterButton onClick={() => {
                this.waterAll(this.state.plants);
              }} text='Watered all in room' />
            </div>
          </div>
        </div>
        { this.state.showEditPlants ? <EditPlant room={this.state.room} onClose={() => { this.setState({ showEditPlants: false }); }} /> : <div/> }
      </div>
    );
  }

  getWateringClass (plant) {
    let diffDays = moment.duration(moment().diff(plant.lastWatered)).asDays();

    if (diffDays > plant.waterInterval) {
      return 'overdue';
    } else if ((plant.waterInterval - diffDays) / plant.waterInterval < 0.2) {
      return 'warning';
    } else {
      return 'ok';
    }
  }

  getDurationString (plant) {
    return Math.round(moment.duration(moment().diff(plant.lastWatered)).asDays(), 10) + ' days ago';
  }

  waterPlant (plant) {
    plant.lastWatered = new Date();

    PlantStore.updateItem(plant);
  }

  waterAll (plants) {
    plants.forEach(plant => {
      this.waterPlant(plant);
    });
  }

  filterPlants (plants, roomId) {
    return plants ? plants.filter(plant => {
      return plant.roomId === roomId;
    }) : null;
  }

  plantsChanged() {
    let loadedPlants = PlantStore.getAll();
    if (loadedPlants) {
      this.setState({ plants: this.filterPlants(loadedPlants, this.state.room.id) });
    }
  }

  componentDidMount() {
    PlantStore.addChangeListener(this.plantsChanged);
  }

  componentWillUnmount() {
    PlantStore.removeChangeListener(this.plantsChanged);
  }

}
