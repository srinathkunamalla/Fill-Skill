import React from "react";
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Developers } from "../../api/developers";
import filterFactory from 'react-bootstrap-table2-filter';
import { Button } from "react-bootstrap";
import { convertIdToName } from "../../service/util";
import { Link } from "react-router-dom";


var developers = [
  {}
];
var columns = [{
  dataField: 'js',
  text: 'Javascript',

}];
var cid = ''
var did = ''
var mid = ''


class Developer extends React.Component {

  componentDidMount() {
    cid = this.props.match.params.cid
    did = this.props.match.params.did
    mid = this.props.match.params.mid
    Developers.getAll(cid, did, mid).then((response) => {
      response.forEach(dev => {
        columns.forEach(col => {
          if (!dev[col.dataField]) {
            dev[col.dataField] = ''
          }
        })
      })
      this.setState({ developers: response })
    })
    this.updateColumns()
  }
  componentDidUpdate() {
    this.updateColumns()
  }

  addDeveloper = () => {
    let devs = this.state.developers
    let dev = {
      name: 'test',
    }
    columns.forEach(col => {
      dev[col.dataField] = ''
    })
    devs.push(dev)
    this.setState({ developers: devs })
    console.log(this.state.developers)
    // developers = this.state.developers
  }

  handleOnSelect = async (row, isSelect) => {
    console.log(row)
    console.log(isSelect)
    if (row && row.id && isSelect && window.confirm("Are you sure to remove this developer?")) {
      await Developers.delete(cid, did, mid, row)
      const response = await Developers.getAll(cid, did, mid)
      this.setState({ developers: response })
    }
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

  updateColumns() {
    this.props.columns.forEach(col => {
      col.formatter = this.ratingFormatter
    })
    columns = this.props.columns
  }

  render() {
    const selectRow = {
      mode: 'radio',
      selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
        <span></span>
      ),
      selectionRenderer: ({ mode, ...rest }) => (
        <span>X</span>
      ),
      onSelect: this.handleOnSelect
    };
    const defaultSorted = [{
      dataField: 'name',
      order: 'asc'
    }];
    return (
      <div>
        <div>
          <div fluid style={{ height: '60px', backgroundColor: '#CCD8E2' }}>
            <div className="row pt-3">
              <div className="col-sm-5">
              </div>
              <div className="col-sm-5">
                <h5>
                  <span style={{color: '3082C4', }}>
                    <Link to={`/company/${this.props.match.params.cid}`}>{convertIdToName(this.props.match.params.did)} / </Link> 
                    <Link to={`/company/${this.props.match.params.cid}/director/${this.props.match.params.did}`}>{convertIdToName(this.props.match.params.mid)} / </Link> 
                  </span> 
                  <span> Developers</span>
                </h5> 
              </div>
              <div className="col-sm-2">
                <Button className="btn btn-sm" onClick={this.addDeveloper}>Add Developer</Button>
              </div>
            </div>
          </div>
          <BootstrapTable
            bootstrap4
            condensed
            striped
            hover
            keyField="id"
            data={this.state && this.state.developers || developers}
            columns={columns}
            cellEdit={cellEditFactory({
              mode: 'click',
              blurToSave: true,
              onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
              beforeSaveCell: (oldValue, newValue, row, column) => { },
              afterSaveCell: (oldValue, newValue, row, column) => {
                console.log(row);
                Developers.set(cid, did, mid, row)
              }
            })}
            selectRow={selectRow}
            defaultSorted={defaultSorted}
            filter={filterFactory()}
            noDataIndication="No Developers Found"
          />
        </div>
      </div>
    );
  }

};
function mapStateToProps(state, ownProps) {
  return {
    skillset: state.skillset,
    columns: state.columns
  };
}
// const mapStateToProps = state => ({
//   skillset: state.skillset
// })

const mapDispatchToProps = dispatch => ({
  // getCompany: id => dispatch(getCompany(id)),
  // getDirectors: () => dispatch(getDirectors())
  // addCategory: (name) => dispatch(addCategory(name)),
  // removeCategory: (id) => dispatch(removeCategory(id)),
  // addSkill: (categoryId, name) => dispatch(addSkill(categoryId, name)),
  // removeSkill: (categoryId, skillId) => dispatch(removeSkill(categoryId, skillId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Developer)