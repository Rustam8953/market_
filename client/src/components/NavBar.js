import React, { useContext } from 'react';
import { Context } from '..';
import {Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {observer} from 'mobx-react-lite'
import UserStore from '../store/UserStore';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import '../assets/style/nav.css';

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <Navbar expand="lg">
            <Container className=''>
                <Navbar.Brand href={SHOP_ROUTE}>Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll justify-content-flex-end">
                    {user.isAuth ? 
                        <Nav
                            className="my-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href={SHOP_ROUTE}>Home</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown" className='d-flex align-items-center justify-content-center'>
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link>
                                <Button onClick={() => navigate(ADMIN_ROUTE)}>Admin</Button>
                            </Nav.Link>
                            <Nav.Link>
                                <Button onClick={() => logOut()}>Выйти</Button>
                            </Nav.Link>
                        </Nav>
                        :
                        <Nav
                            className="my-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href={SHOP_ROUTE}>Home</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action32">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action43">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action54">Something else here</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link>
                                <Button onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
                            </Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
})

export default NavBar;