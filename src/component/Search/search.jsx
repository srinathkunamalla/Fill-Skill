import React from "react";
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import { Developers } from "../../api/developers";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { convertIdToName } from "../../service/util";

var developers = [
  {}
];
var originalColumns = [{
  dataField: 'director',
  text: 'Director',
  sort: true,
  filter: textFilter(),
}, {
  dataField: 'manager',
  text: 'Manager',
  sort: true,
  filter: textFilter(),
}];
var columns = originalColumns;


class Search extends React.Component {

  componentDidMount() {
    this.search()
    if (this.props.columns && this.props.columns.length) {
      this.updateColumns()
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.columns.length !== this.props.columns.length && columns.length === 2) {
      this.updateColumns()
    }
    if (prevProps.match.params.query !== this.props.match.params.query) {
      this.search()
    }
  }
  updateColumns = () => {
    this.props.columns[0].text = 'Developer'
    this.props.columns.forEach(col => {
      col.formatter = this.ratingFormatter
    })
    columns = [
      ...originalColumns,
      ...this.props.columns
    ]
  }

  search = async () => {
    const cid = this.props.match.params.cid
    const query = this.props.match.params.query
    let response = await Developers.search(cid, query)
    response = response.map(dev => {
      return {
        ...dev,
        director: convertIdToName(dev.did),
        manager: convertIdToName(dev.mid)
      }
    })
    console.log(response)
    this.setState({ developers: response })

  }

  ratingFormatter(cell, row) {
    let color = 'black'
    if (cell == '5') {
      color = '#0E8540'
    } else if (cell == '4'){
      color = '#6C850E'
    } else if (cell == '3') {
      color = '#85660E'
    } else if (cell == '2') {
      color = `#854D0E`
    } else if (cell == '1') {
      color = '#85240E'
    }
    return (
      <span>
        <strong style={ { color } }>{ cell }</strong>
      </span>
    )
  }

  render() {
    const defaultSorted = [{
      dataField: 'name',
      order: 'desc'
    }];
    return (
      <div>
        <div fluid style={{ height: '60px', backgroundColor: '#CCD8E2' }}>
          <div className="row pt-3">
            <div className="col-sm-5">
            </div>
            <div className="col-sm-5">
              <h5>Search Results</h5>
            </div>
          </div>
        </div>
        <div>
          <BootstrapTable
            bootstrap4
            condensed
            striped
            hover
            keyField="id"
            data={this.state && this.state.developers || developers}
            columns={columns}
            defaultSorted={defaultSorted}
            filter={filterFactory()}
          />
        </div>
      </div>
    );
  }

};
function mapStateToProps(state, ownProps) {
  return {
    columns: state.columns
  };
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)