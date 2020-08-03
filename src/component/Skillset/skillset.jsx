import React from "react";
import { connect } from 'react-redux'
import { addCategory, removeCategory, addSkill , removeSkill} from "../../store/company/actions";

class Skillset extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount() {

  }
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
      <li key={key}>
        {this.props.skillset[key].name} 
        <button onClick={()=>this.removeCategory(key)}>Remove Category</button>
        <button onClick={()=>this.addSkill(key)}>Add Skill</button>
        <ul>
          {this.rednerSkills(this.props.skillset[key].skills, key)}
        </ul>
      </li>
    );
  }
  rednerSkills(skills, categoryId) {
    const skillKeys = (skills && Object.keys(skills)) || []
    return skillKeys.map((key) =>
      <li key={key}>
        {skills[key]}
        <button onClick={()=>this.removeSkill(categoryId, key)}>Remove Skill</button>
      </li>
    )
  }
  render() {
    return (
      <div>
        <h3>Skillset</h3>
        <button onClick={this.addCategory}>Add Category</button>
        <div>
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
