import React from 'react';
import $ from 'jquery';

export default React.createClass({
  propTypes : {
    cb : React.PropTypes.func.isRequired
  },

  formatUrl() {
    var search = this.refs.searchInput.getDOMNode().value;
    var type = this.refs.selectInput.getDOMNode().value;
    return `https://itunes.apple.com/search?term=${search}&entity=${type}`;
  },

  handleSubmit() {
    $.ajax({
      url: this.formatUrl(),
      dataType: "JSONP",
      error: function (e){
        console.info(e);
      },
      success: function (data){
        this.props.cb(data.results);
        this.refs.searchInput.getDOMNode().value = '';
      }.bind(this)
    });
  },

  render: function(){
    var styles={
      field: {
        minWidth: "100px"
      }
    }
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="input-group-inline col-sm-4">
            <input ref='searchInput' type="input" className="form-control" style={styles.field} />
          </div>
          <div className="input-group-inline col-sm-4">
            <select ref='selectInput' className="form-control">
              <option value='musicTrack'>Music</option>
              <option value='movie'>Movie</option>
            </select>
          </div>
          <div className="input-group-inline col-sm-4">
            <button onClick={this.handleSubmit} className="form-control">Submit</button>
          </div>
        </div>
      </div>
    );
  }
});
