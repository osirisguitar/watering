'use strict';

import React from 'react';
import moment from 'moment';
import {WaterButton} from '../waterButton/WaterButton';
import PlantStore from '../../stores/PlantStore';

export class PlantList extends React.Component {
  constructor(props) {
    super(props);
    this.plantsChanged = this.plantsChanged.bind(this);
    this.filterPlants = this.filterPlants.bind(this);
    this.state = { room: props.room, plants: this.filterPlants(PlantStore.getAll(), props.room.id) };
  }

  render () {
    return (
      <div>
        <h1>{this.state.room.name}</h1>
        <WaterButton onClick={() => {
          this.waterAll(this.state.plants);
        }} text='I haz watered all!'/>
        <ul>
          {this.state.plants ? this.state.plants.map(plant => {
            return <li key={plant.id}>{ plant.name } (every {plant.waterInterval} days)<br /><span className={this.getWateringClass(plant)}>Watered {this.getDurationString(plant)}</span> <WaterButton onClick={() => { this.waterPlant(plant); }}/></li>;
          }) : ''}
        </ul>
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
