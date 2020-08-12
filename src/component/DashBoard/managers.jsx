import React from "react";
import { Managers } from "../../api/managers";
import { Card, CardColumns, Button, Modal, Form, Col, InputGroup, Jumbotron } from "react-bootstrap";
import Director from "./director";
import { Directors } from "../../api/directors";
import { convertIdToName } from "../../service/util";
import { Link } from "react-router-dom";


class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { managers: [], show: false, isNew: false, managerObj: {}, validated: false };
    this.managerDefaultObj = { id: '', name: '', org: '', email: '' };
  }

  componentDidMount() {
    this.getManagers();
  }

  async getManagers() {
    const cid = this.props.match.params.cid
    const did = this.props.match.params.did
    const managers = await Managers.getAll(cid, did)
    console.log("Manager123", +managers)
    this.setState({ managers });
  }


  goToDevelopersPage = (mid) => {
    this.props.history.push(`${this.props.history.location.pathname}/manager/${mid}`)
  }


  render() {
    return (
      <div>
        <div fluid style={{ height: '60px', backgroundColor: '#CCD8E2' }}>
          <div className="row pt-3">
            <div className="col-sm-5">
            </div>
            <div className="col-sm-5">
              <h4>
                <span style={{color: '3082C4', }}>
                  <Link to={`/company/${this.props.match.params.cid}`}>{convertIdToName(this.props.match.params.did)} / </Link> 
                </span> 
                <span> Managers</span>
              </h4> 
            </div>
          </div>
        </div>

        <div className="row m-3">
          {this.state.managers.map((managers, i) => {
            return (
              <Card
                key={i}
                className="m-3"
                style={{ width: '250px' }}
              >
                <a style={{ cursor: 'pointer' }} onClick={() => { this.props.history.push(`${this.props.history.location.pathname}/manager/ravi`) }} >
                  <Card.Header >{managers.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>{managers.id} </Card.Title>
                  </Card.Body>
                </a>
              </Card>
            );

          })
          }

        </div>
      </div>

    );
  }

};

export default Manager;