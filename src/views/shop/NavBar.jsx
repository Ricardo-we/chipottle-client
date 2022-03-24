import { getTotal } from "../../libs/sessions-utils";
import { Navbar, Nav, Container } from "react-bootstrap";
import chipottleIcon from './../../img/chipottle-icon-transparent.png';
import '../../css/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavBar({ cartTotals=getTotal() }) {
    return ( 
    <Navbar bg="black" variant="white" expand="lg">
        <Container>
            <Navbar.Brand href="/">
                <img width="100" height="60" src={chipottleIcon} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
                <FontAwesomeIcon color="white" icon={faBars}/>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Link className="nav-link main-nav-item" to="/">Home</Link>
                    <Link className="nav-link main-nav-item" to="/shop/1">Tienda</Link>
                    <Link className="nav-link main-nav-item" to="/events">Eventos</Link>
                    <Link className="nav-link main-nav-item ms-auto" to="/cart">
                        <FontAwesomeIcon icon={faCartShopping}/> Q{cartTotals}
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default NavBar;