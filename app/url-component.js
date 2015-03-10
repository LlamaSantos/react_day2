'use strict';

import React from 'react';

export default React.createClass({

  render () {
    return (
      <a href={this.props.data}>{this.props.rowData.trackName}</a>
    );
  }

});
