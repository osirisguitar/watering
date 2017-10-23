'use strict';

import React from 'react';
import {PlantList} from '../../components/plantList/PlantList';
import moment from 'moment';

import RoomStore from '../../stores/RoomStore';

export class App extends React.Component {
  constructor (props) {
    super(props);
    this.roomsChanged = this.roomsChanged.bind(this);
    this.state = {rooms: RoomStore.getAll()};
  }

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper yellow lighten-2 black-text">
              <a className="brand-logo black-text">Rättaregården</a>
            </div>
          </nav>
        </div>
        <div>
          {this.state.rooms ? this.state.rooms.map(room => {
            return <PlantList key={room.id} room={room} />
          }) : ''}
        </div>
      </div>
    );
  }

  roomsChanged () {
    let loadedRooms = RoomStore.getAll();
    if (loadedRooms) {
      this.setState({ rooms: loadedRooms });
    }
  }

  componentDidMount () {
    RoomStore.addChangeListener(this.roomsChanged);
  }

  componentWillUnmount () {
    RoomStore.removeChangeListener(this.roomsChanged);
  }
}
