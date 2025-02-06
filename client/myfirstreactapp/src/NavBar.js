import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Book Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#read" onClick={() => {props.setActive("read")}}>Completed Books</Nav.Link>
            <Nav.Link href="#reading" onClick={() => {props.setActive("reading")}}>Currently Reading</Nav.Link>
            <Nav.Link href="#toRead" onClick={() => {props.setActive("toRead")}}>Want to Read</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;