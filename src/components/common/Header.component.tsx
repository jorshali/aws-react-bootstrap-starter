
import React from 'react';

import { observer } from 'mobx-react-lite';
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLogin } from '../../hooks/useLogin';
import { useStores } from '../../hooks/useStores';
import { IoLogOutOutline } from 'react-icons/io5';

const Header: React.FC<{}> = observer(() => {
  const { logout } = useLogin();
  const { asyncStore } = useStores();

  const handleLogout = () => {
    asyncStore.showLoading(async () => {
      await logout();
    });
  };

  return (
    <Navbar expand="lg" variant="dark" fixed="top" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img alt="focus.dev" className="brand-logo" src={ require('../../welcome_logo.png') } />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link href="/">
                HOME
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link onClick={handleLogout}><IoLogOutOutline style={{ fontSize: 30 }} /> LOGOUT</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export { Header };