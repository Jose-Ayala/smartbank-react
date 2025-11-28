import { Outlet } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import SmartBankLogo from '../assets/smartbanklogo.jpg'; 
import React, { useState } from 'react';
import SelectAccountDialog from './SelectAccountDialog';

function Layout() {
    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
  
    const renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );
  
  {/* Navbar */}
  return (
    <div className="d-flex flex-column min-vh-100"> 
      
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top"> 
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img
              src={SmartBankLogo} 
              width="60"        
              height="60"       
              className="d-inline-block me-2" 
              alt="SmartBank Logo"
            />
            SmartBank
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"> 
                <Nav.Link href="/" active>Dashboard</Nav.Link>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => renderTooltip(props, "Payments feature coming soon!")}
                >
                    <Nav.Link as="span" className="cursor-default">Payments</Nav.Link> 
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => renderTooltip(props, "Transfers feature coming soon!")}
                >
                    <Nav.Link as="span" className="cursor-default">Transfers</Nav.Link>
                </OverlayTrigger>
            </Nav>
            
            <Button 
              variant="warning"
              onClick={handleOpen}
            >
              Open Account
            </Button>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="py-3 flex-grow-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto">
        <Container>
        <p className="mb-0 text-muted">
            &copy; {new Date().getFullYear()} SmartBank
        </p>
        <p className="mb-0 text-muted">123 Main Street, Orlando, FL 32810</p>
        </Container>
      </footer>

      {/* Dialog */}
        <SelectAccountDialog 
            show={showModal}
            handleClose={handleClose}
        />

    </div>
  );
}

export default Layout;