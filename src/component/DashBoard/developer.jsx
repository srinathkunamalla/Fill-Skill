import React from "react";
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Developers } from "../../api/developers";
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
      
      this.setState({developers: response})
      // developers = this.state.developers
      // console.log(developers)

    })

  }
  componentDidUpdate() {
    columns = this.props.columns
    // developers = this.state.developers
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
    this.setState({developers: devs})
    console.log(this.state.developers)
    // developers = this.state.developers
  }

  handleOnSelect = async (row, isSelect) => {
    console.log(row)
    console.log(isSelect)
    if (row && row.id && isSelect && window.confirm("Are you sure to remove this developer?")) {
      await Developers.delete(cid, did, mid, row)
      const response = await Developers.getAll(cid, did, mid)
      this.setState({developers: response})
    }
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
    return (
      <div style={{ margin: '50px' }}>
        <div>
          <h1>You are on Developers Page</h1>
          <button onClick={this.addDeveloper}>Add Developer</button>
          <BootstrapTable
            condensed
            striped
            hover
            keyField="id"
            data={this.state && this.state.developers || developers}
            columns={columns}
            cellEdit={ cellEditFactory({
              mode: 'click',
              blurToSave: true,
              onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
              beforeSaveCell: (oldValue, newValue, row, column) => {  },
              afterSaveCell: (oldValue, newValue, row, column) => { 
                console.log(row); 
                Developers.set(cid, did, mid, row)
              }
            }) }
            selectRow={ selectRow }
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