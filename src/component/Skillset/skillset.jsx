import React from "react";
import { connect } from 'react-redux'
import { addCategory, removeCategory, addSkill, removeSkill } from "../../store/company/actions";
import { Button, Badge } from "react-bootstrap";
import "./style.scss";

class Skillset extends React.Component {

  addCategory = async () => {
    const name = prompt("Please enter category name")
    if (name) {
      await this.props.addCategory(name)
    }
  }
  removeCategory = async (id) => {
    if (window.confirm("are you sure to remove this categrory?")) {
      await this.props.removeCategory(id)
    }
  }
  addSkill = async (categoryId) => {
    const name = prompt("Please enter skill name")
    if (name) {
      await this.props.addSkill(categoryId, name)
    }
  }
  removeSkill = async (categoryId, id) => {
    if (window.confirm("are you sure to remove this skill?")) {
      await this.props.removeSkill(categoryId, id)
    }
  }
  renderCategories() {
    const skillsetKeys = (this.props.skillset && Object.keys(this.props.skillset)) || []
    return skillsetKeys.map((key) =>
      <div>
        <div fluid className="row">
          <div className="col-sm-9">
            <span className="category">{this.props.skillset[key].name}</span>
          </div>
          <div className="col-sm-3">
            <Button className="btn btn-sm" variant="outline-danger" onClick={() => this.removeCategory(key)}>Remove Category</Button>
            <Button className="btn btn-sm" variant="outline-primary" onClick={() => this.addSkill(key)}>Add Skill</Button>
          </div>

        </div>

        <div className="skills-container">
          {this.rednerSkills(this.props.skillset[key].skills, key)}
        </div>
        <hr />
      </div>
    );
  }
  rednerSkills(skills, categoryId) {
    const skillKeys = (skills && Object.keys(skills)) || []
    return skillKeys.map((key) =>
      <span key={key} >
        <Button variant="secondary" onClick={() => this.removeSkill(categoryId, key)}>
          <span className="btn-span">{skills[key]}</span><Badge variant="light">X</Badge>
        </Button>
      </span>
    )
  }
  render() {
    return (
      <div>
        <div fluid style={{ height: '60px', backgroundColor: '#CCD8E2' }}>
          <div className="row pt-3">
            <div className="col-sm-5">
            </div>
            <div className="col-sm-5">
              <h5>Skillset</h5>
            </div>
            <div className="col-sm-2">
              <Button className="btn btn-sm" onClick={this.addCategory}>Add Category</Button>
            </div>
          </div>
        </div>
        <div className="container">
          <ul>
            {this.renderCategories()}
          </ul>
        </div>
      </div>
    );
  }

};

function mapStateToProps(state, ownProps) {
  return {
    skillset: state.skillset
  };
}
// const mapStateToProps = state => ({
//   skillset: state.skillset
// })

const mapDispatchToProps = dispatch => ({
  // getCompany: id => dispatch(getCompany(id)),
  // getDirectors: () => dispatch(getDirectors())
  addCategory: (name) => dispatch(addCategory(name)),
  removeCategory: (id) => dispatch(removeCategory(id)),
  addSkill: (categoryId, name) => dispatch(addSkill(categoryId, name)),
  removeSkill: (categoryId, skillId) => dispatch(removeSkill(categoryId, skillId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Skillset)
