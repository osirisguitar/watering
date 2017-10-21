'use strict';

import React from 'react';
import moment from 'moment';

export class WaterButton extends React.Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);
  }

  render () {
    return <button onClick={this.props.onClick}>{this.props.text ? this.props.text : 'I haz watered!'}</button>
  }
}
