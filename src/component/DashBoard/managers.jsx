import React from "react";
import { Managers } from "../../api/managers";
import { Card, CardColumns, Button, Modal, Form, Col, InputGroup, Jumbotron } from "react-bootstrap";
import { convertIdToName } from "../../service/util";
import { Link } from "react-router-dom";


class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { managers: [], show: false, isNew: false, managerObj: {id: "", name: ""}, validated: false };
    this.managerDefaultObj = { id: '', name: '', org: '', email: '' };
    this.deleteManager = this.deleteManager.bind(this);

  }

  componentDidMount() {
    this.getManagers();
  }

  async getManagers() {
    const cid = this.props.match.params.cid
    const did = this.props.match.params.did
    console.log("Manager123", cid, did)
    const managers = await Managers.getAll(cid, did)
    this.setState({ managers: managers });

  }

  handleClose = () => this.setState({ show: false, isNew: false, managerObj: this.managerDefaultObj });

  handleShow = (isNew, managerObj) => this.setState({ show: true, isNew: isNew, managerObj: managerObj });



  goToDevelopersPage = (mid) => {
    this.props.history.push(`${this.props.history.location.pathname}/manager/${mid}`)
  }

  async deleteManager(mid) {
    const cid = this.props.match.params.cid
    const did = this.props.match.params.did
    console.log("+++", cid, did, mid)
    await Managers.delete(cid, did, mid);
    this.getManagers();
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.setState({ validated: true });
      const name = form.elements.validationName.value;
      const org = form.elements.validationOrg.value;
      const email = form.elements.validationEmail.value;
      this.AddEditManager(name, org, email);
    }
    event.preventDefault();
    event.stopPropagation();
  };

  async AddEditManager(name, org, email) {
    const cid = this.props.match.params.cid;
    const did = this.props.match.params.did;
    if (this.state.isNew) {
      const manager = await Managers.create(cid, did, name, email);
      this.getManagers();
      this.setState({ show: false, isNew: false, managerObj: this.managerDefaultObj });
    } else {
      // code to edit director
      const manager = await Managers.update(cid, this.state.managerObj.id, name, did, email);
      this.getManagers();
      this.setState({ show: false, isNew: false, managerObj: this.managerDefaultObj });
    }
  }


  render() {
    return (
      <div>
        <div fluid style={{ height: '60px', backgroundColor: '#CCD8E2' }}>
          <div className="row pt-3">
            <div className="col-sm-5">
            </div>
            <div className="col-sm-5">
              <h5>
                <span style={{color: '3082C4', }}>
                  <Link to={`/company/${this.props.match.params.cid}`}>{convertIdToName(this.props.match.params.did)} / </Link> 
                </span> 
                <span> Managers</span>
              </h5> 
            </div>
            <Button className="btn btn-sm" onClick={() => this.handleShow(true, this.managerDefaultObj)} variant="primary">Add Manager</Button>
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
                <a style={{ cursor: 'pointer' }} onClick={() => { this.props.history.push(`${this.props.history.location.pathname}/manager/${managers.id}`) }} >
                <Card.Header ><strong>{managers.name}</strong></Card.Header>
                  <Card.Body>
                    <Card.Text><i>{managers.email}</i> </Card.Text>
                  </Card.Body>
                </a>
                <Card.Footer className="text-muted">
                  <div className="row">
                    <div className="col-sm-8">
                      <Button className="btn btn-sm" onClick={() => this.handleShow(false, managers)} variant="outline-primary">Edit</Button>
                    </div>
                    <div className="col-sm-4">
                      <Button className="btn btn-sm" variant="outline-danger" onClick={() => this.deleteManager(managers.id)}>Delete</Button>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            );

          })
          }

        </div>


        <Modal backdrop="static" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.isNew ? 'Add Manager' : 'Edit Manager'}</Modal.Title>
          </Modal.Header>
          <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Modal.Body>

              <Form.Row>

                <Form.Group as={Col} md="5" controlId="validationName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name"
                    defaultValue={this.state.managerObj.name}
                  />
                  <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="validationOrg">
                  <Form.Label>Organization</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Organization"
                    required
                    defaultValue={this.state.managerObj.org}
                  />
                  <Form.Control.Feedback type="invalid">
                    Origanization is required
                    </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Email"
                    required
                    defaultValue={this.state.managerObj.email}
                  />
                  <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
          </Button>
              <Button variant="primary" type="submit">
                Save Changes
          </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>

    );
  }

};

export default Manager;