import React from "react";
import { Directors } from "../../api/directors";
import { Card, CardColumns, Button, Modal } from "react-bootstrap";

class Director extends React.Component {
  constructor(props) {
    super(props);
    this.state = { directors: [] };
  }

  async componentDidMount() {
    const cid = this.props.match.params.cid
    console.log(cid)
    const directors = await Directors.getAll(cid)
    console.log('directors', directors);
    this.setState({ directors: directors })
    console.log(this.state.directors)

  }
  render() {
    return (
      <div>
        <div>
          <h1>Dashboard</h1>
          <h1>You are on Director Page</h1>
          <button type="button" onClick={() => { this.props.history.push(`${this.props.history.location.pathname}/director/chirag`) }} className="btn">
            select one director
          </button>
        </div>
        <div className="row">

        </div>
        <div className="row">
          <CardColumns className="m-5">
            {this.state.directors.map((director, i) => {
              return(
                <Card
                key={i}
              className="mb-2"
            >
              <Card.Header>{director.name}</Card.Header>
              <Card.Body>
                <Card.Title>{director.id} </Card.Title>
                <Card.Text>
                  <strong>Organization:</strong>&nbsp;&nbsp;{director.org}
            </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
              <Button className="btn btn-sm" variant="outline-primary">Edit</Button> &nbsp;&nbsp;
              <Button className="btn btn-sm" variant="outline-danger">Delete</Button>
              </Card.Footer>
            </Card>
              );

            })
          }
            
          </CardColumns>
        </div>
      </div>
    );
  }

};

export default Director;