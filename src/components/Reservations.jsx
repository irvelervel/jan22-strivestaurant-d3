// here we're going to fetch all the reservations in the DB and present them
// to the user!

import { Component } from "react";
import { ListGroup } from "react-bootstrap";

class Reservations extends Component {
  // for managing my reservations, I need to tell the interface HOW to present them
  // from that point on, my only task is managing the state

  // how can a react component show dynamic data?
  // 1) prepare your state for collecting the data
  // 2) instruct your interface on how to show the data
  // 3) now we just have to manage the reservations array: we want to fill it up!
  //    time to fetch the reservations from the DB
  // 4) the perfect place for fetching data in a react class component is a method
  //    called componentDidMount: let's do our fetch there
  // 5) after fetching the data with a normal fetch() we can set the component's state
  //    with the result: setting the state triggers a new invokation of render()
  //    because render() fires EVERY TIME there's a change in the STATE or in the PROPS
  // 6) this time the reservations array in the state is filled up! the .map() statement
  //    will create a <li> for every reservation in the state

  state = {
    // 1)
    reservations: [], // <-- reservations is ALWAYS going to be an array, let's default it with an empty one
  };

  componentDidMount = () => {
    // what is this?
    // componentDidMount is a method automatically called by React if present
    // features:
    // a) this method will be called ONCE and that's it
    // b) it gets called just AFTER the initial mounting process
    // ...turns out this is the PERFECT place for invoking a fetch()
    console.log("I'm componentDidMount!");
    // it's getting called just AFTER the initial render!
    this.fetchReservations();
    // so we're going to do your fetch() right here!
  };

  fetchReservations = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/reservationSSSS"
      );
      if (response.ok) {
        // everything went well
        let data = await response.json();
        console.log("reservations:", data);
        this.setState({
          reservations: data,
        });
        // every time you set the state or you receive a new prop,
        // the render() method fires again!
      } else {
        // something was wrong
        console.log("an error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log("I'm render!");
    // can we do the fetch here? the answer is NO
    return (
      <div>
        <h2>BOOKED TABLES</h2> {/* 2) */}
        <ListGroup>
          {/* having this.state.reservations ALWAYS as an array allows me to map it in every moment */}
          {this.state.reservations.map((res) => (
            <ListGroup.Item key={res._id}>
              {res.name} for {res.numberOfPeople} at {res.dateTime}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default Reservations;
