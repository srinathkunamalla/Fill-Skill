import React from "react";
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import { Developers } from "../../api/developers";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

var developers = [
  {}
];
var originalColumns = [{
  dataField: 'director',
  text: 'Director',
  sort: true,
  filter: textFilter(),
},{
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
        director: this.convertIdToName(dev.did),
        manager: this.convertIdToName(dev.mid)
      }
    })
    console.log(response)
    this.setState({developers: response})

  }

  convertIdToName(id) {
    return id.split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
  }

  render() {
    const defaultSorted = [{
      dataField: 'name',
      order: 'desc'
    }];
    return (
      <div style={{ margin: '50px' }}>
        <div>
          <h1>You are on Search</h1>
          <BootstrapTable
            bootstrap4
            condensed
            striped
            hover
            keyField="id"
            data={this.state && this.state.developers || developers}
            columns={columns}
            defaultSorted={ defaultSorted } 
            filter={ filterFactory() }
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