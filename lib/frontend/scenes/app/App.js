'use strict';

import React from 'react';
import moment from 'moment';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { House } from '../house/House';
import { EditPlant } from '../../scenes/editPlant/EditPlant';
import HouseStore from '../../stores/HouseStore';

export class App extends React.Component {
  constructor (props) {
    super(props);
    this.housesChanged = this.housesChanged.bind(this);
    this.state = {rooms: HouseStore.getAll()};
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={props => { return (
          <div>
            <div className="navbar-fixed">
              <nav>
                <div className="nav-wrapper green lighten-2 black-text">
                  <a className="brand-logo black-text">Watering</a>
                  <ul id="nav-mobile" className="right">
                    <li><a href="addhouse.html"><i className="material-icons black-text">more_verts</i></a></li>
                  </ul>
                </div>
              </nav>
            </div>
            <div>
              <div className="row">
                <div className="col s12 m6">
                  <div className="card">
                    <div className="card-content">
                      <span className="card-title">Houses</span>
                      {this.state.houses ? this.state.houses.map(house => {
                        return <Link key={house.id} to={ `/house?id=${house.id}` }>{house.name}</Link>
                      }) : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}} />
        <Route path="/house" component={House} />
        <Route path="/editplant/:roomId" component={ EditPlant } />
        </div>
    );
  }

  housesChanged () {
    let loadedHouses = HouseStore.getAll();
    if (loadedHouses) {
      this.setState({ houses: loadedHouses });
    }
  }

  componentDidMount () {
    HouseStore.addChangeListener(this.housesChanged);
  }

  componentWillUnmount () {
    HouseStore.removeChangeListener(this.housesChanged);
  }
}
