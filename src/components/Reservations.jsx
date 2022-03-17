// here we're going to fetch all the reservations in the DB and present them
// to the user!

import { Component } from "react";
import { ListGroup, Spinner, Alert } from "react-bootstrap";
import { parseISO, format } from "date-fns";

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
    isLoading: true,
    isError: false,
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
    // 3)
    // 4)
    this.fetchReservations();
    // so we're going to do your fetch() right here!
  };

  fetchReservations = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/reservation"
      );
      if (response.ok) {
        // everything went well
        let data = await response.json();
        console.log("reservations:", data);
        // 5)
        this.setState({
          reservations: data,
          isLoading: false,
        });
        // every time you set the state or you receive a new prop,
        // the render() method fires again!
      } else {
        // something was wrong on the server or if my endpoint is incorrect
        console.log("an error occurred");
        this.setState({
          isLoading: false,
          isError: true,
        });
      }
    } catch (error) {
      console.log(error);
      // I will fall here if there's a network problem on my side
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  };

  render() {
    console.log("I'm render!");
    // can we do the fetch here? the answer is NO
    return (
      <div>
        <h2>BOOKED TABLES</h2>
        {/* I want the Spinner to be there if isLoading === true */}
        {/* I want the Spinner to disappear if isLoading === false */}

        {/* SHORT CIRCUIT && */}
        {this.state.isLoading && (
          <Spinner animation="border" variant="success" />
        )}

        {this.state.isError && (
          <Alert variant="danger">An error occurred 😔</Alert>
        )}

        {/* 2) (initial render) */}
        {/* 6) (after the setState) */}
        <ListGroup>
          {/* having this.state.reservations ALWAYS as an array allows me to map it in every moment */}
          {!this.state.isLoading &&
          !this.state.isError &&
          this.state.reservations.length === 0 ? (
            //   in this case I don't have any reservations to show!
            <ListGroup.Item>No reservations yet! 🙄</ListGroup.Item>
          ) : (
            this.state.reservations.map((res) => (
              <ListGroup.Item key={res._id}>
                {/* the process of converting dateTime into something more */}
                {/* humanly readable goes through initially converting it into */}
                {/* a proper Date */}
                {/* once we figure out the Date from that string, we can at that point */}
                {/* convert it into another string, something better */}
                {/* 1) taking our string and converting it into a Date object (using parseISO()) */}
                {/* 2) taking that Date and convert it back into another, better, string (using format()) */}
                {res.name} for {res.numberOfPeople} at{" "}
                {format(parseISO(res.dateTime), "MMMM do yyyy | HH:mm")}
              </ListGroup.Item>
            ))
            // I want to show this message if we're not in the initial fetch
            // (because in that case the reservations array will be indeed empty)
            // and the resulting array from the API is an empty one
          )}
        </ListGroup>
      </div>
    );
  }
}

export default Reservations;
