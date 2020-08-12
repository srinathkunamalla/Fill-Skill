import React from "react";
import { Directors } from "../../api/directors";
import { Card, Button, Modal, Form, Col, InputGroup, Jumbotron } from "react-bootstrap";

class Director extends React.Component {
  constructor(props) {
    super(props);
    this.state = { directors: [], show: false, isNew: false, directorObj: {}, validated: false };
    this.directorDefaultObj = { id: '', name: '', org: '', email: '' };
    this.deleteDirector = this.deleteDirector.bind(this);
  }

  componentDidMount() {
    this.getDirectors();
  }

  async getDirectors() {
    const cid = this.props.match.params.cid
    const directors = await Directors.getAll(cid)
    this.setState({ directors: directors });
  }

  handleClose = () => this.setState({ show: false, isNew: false, directorObj: this.directorDefaultObj });

  handleShow = (isNew, directorObj) => this.setState({ show: true, isNew: isNew, directorObj: directorObj });

  async deleteDirector(did) {
    const cid = this.props.match.params.cid
    await Directors.delete(cid, did);
    this.getDirectors();
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
      this.AddEditDirector(name, org, email);
    }
    event.preventDefault();
    event.stopPropagation();
  };

  async AddEditDirector(name, org, email) {
    const cid = this.props.match.params.cid;
    if (this.state.isNew) {
      const director = await Directors.create(cid, name, org, email);
      this.getDirectors();
      this.setState({ show: false, isNew: false, directorObj: this.directorDefaultObj });
    } else {
      // code to edit director
      const director = await Directors.update(cid, this.state.directorObj.id, name, org);
      this.getDirectors();
      this.setState({ show: false, isNew: false, directorObj: this.directorDefaultObj });
    }
  }

  goToManagersPage = (did) => {
    this.props.history.push(`${this.props.history.location.pathname}/director/${did}`)
  }

  render() {
    return (
      <div>
        <div fluid style={{ height: '60px', backgroundColor: '#CCD8E2' }}>

          <div className="row pt-3">
            <div className="col-sm-5">
            </div>
            <div className="col-sm-5">
              <h4>Directors </h4>
            </div>
            <div className="col-sm-2">
              <Button className="btn btn-sm" onClick={() => { this.props.history.push(`${this.props.history.location.pathname}/director/chirag`) }} variant="primary">Select Director</Button>&nbsp; &nbsp;
            <Button className="btn btn-sm" onClick={() => this.handleShow(true, this.directorDefaultObj)} variant="primary">Add Director</Button>
            </div>
          </div>
        </div>

        <div className="row m-3">
          {this.state.directors.map((director, i) => {
            return (
              <Card
                key={i}
                className="m-3"
                style={{ width: '250px' }}
              >
                <a style={{ cursor: 'pointer' }} onClick={() => this.goToManagersPage(director.id)}>
                  <Card.Header >{director.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>{director.id} </Card.Title>
                    <Card.Text>
                      <strong>Organization:</strong>&nbsp;&nbsp;{director.org}
                    </Card.Text>
                  </Card.Body>
                </a>
                <Card.Footer className="text-muted">
                  <div className="row">
                    <div className="col-sm-8">
                      <Button className="btn btn-sm" onClick={() => this.handleShow(false, director)} variant="outline-primary">Edit</Button>
                    </div>
                    <div className="col-sm-4">
                      <Button className="btn btn-sm" variant="outline-danger" onClick={() => this.deleteDirector(director.id)}>Delete</Button>
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
            <Modal.Title>{this.state.isNew ? 'Add Director' : 'Edit Director'}</Modal.Title>
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
                    defaultValue={this.state.directorObj.name}
                  />
                  <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="validationOrg">
                  <Form.Label>Organization</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Organization"
                    required
                    defaultValue={this.state.directorObj.org}
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
                    defaultValue={this.state.directorObj.email}
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

export default Director;