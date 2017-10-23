'use strict';

import React from 'react';
import moment from 'moment';

export class WaterButton extends React.Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);
  }

  render () {
    return <button className={"waves-effect waves-light btn"} onClick={this.props.onClick}><i className="material-icons">check</i>{this.props.text ? this.props.text : ''}</button>
  }
}
