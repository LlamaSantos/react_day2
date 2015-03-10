import React from 'react';
import SearchItunes from './SearchItunes';
import Griddle from 'griddle-react';
import ImageComponent from './image-component';
import UrlComponent from './url-component';

var App = React.createClass({

  getInitialState() {
    return { data: [] };
  },

  updateState(data) {
    this.setState({
      data: data
    });
  },

  render() {
    var griddleMeta = [
      {columnName: 'trackName',displayName: 'Name'},
      {columnName: 'artistName',displayName: 'Artist'},
      {columnName: 'primaryGenreName',displayName: 'Genre'},
      {columnName: 'artworkUrl100',displayName: 'Artwork',customComponent: ImageComponent},
      {columnName: 'trackPrice',displayName: 'Price'},{columnName: 'kind',displayName: 'Type'},
      {columnName: 'trackViewUrl',displayName: 'Online Link',customComponent: UrlComponent}
    ];

    var columns = griddleMeta.reduce((arr, item) => {
      return arr.concat(item.columnName);
    }, []);

    var styles = {
      navbar : {
        paddingTop: 7,
        marginBottom: -1
      }
    };

    return (
      <span>
        <div className="navbar navbar-default" role="navigation" style={styles.navbar}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <SearchItunes cb={this.updateState} />
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default" >
          <div className="panel-heading">
            <span>
              {this.state.data.length === 0 ? "Search for something" : "Your search results"}
            </span>
          </div>
          <div className="panel-body">
            <Griddle results={this.state.data}
                     columnMetadata={griddleMeta}
                     columns={columns}
                     className="table"
                     noDataMessage='' />
          </div>
        </div>
      </span>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
