import { Navbar, Nav } from "react-bootstrap";

const CustomNavbar = (props) => (
  <Navbar
    className={"mt-" + props.margin}
    collapseOnSelect
    expand="lg"
    bg="dark"
    variant="dark"
  >
    <Navbar.Brand href="#home">Strivestaurant - {props.payoff}</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="#menu">Menu</Nav.Link>
        <Nav.Link href="#reservation">Reservation</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default CustomNavbar;
