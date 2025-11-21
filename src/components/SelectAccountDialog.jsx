import React, { useState } from 'react';
import { Modal, Button, Table, Form, InputGroup } from 'react-bootstrap';

const BACKEND_URL = 'http://localhost:3000/create-checkout-session';

const accountProducts = [
  { id: 'checking', name: 'Checking Account', rate: 0.0, minDeposit: 50.00 },
  { id: 'mm', name: 'Money Market', rate: 0.025, minDeposit: 500.00 },
  { id: 'savings', name: 'Savings Account', rate: 0.030, minDeposit: 100.00 },
  { id: 'cd6m', name: 'Certificate of Deposit (6 Month)', rate: 0.040, minDeposit: 1000.00 },
  { id: 'cd1y', name: 'Certificate of Deposit (1 Year)', rate: 0.055, minDeposit: 1000.00 }
];

function SelectAccountDialog({ show, handleClose }) {
  const [selectedAccount, setSelectedAccount] = useState(accountProducts[0].id);
  const [depositAmount, setDepositAmount] = useState('');
  
  const selectedProduct = accountProducts.find(p => p.id === selectedAccount);

  const onModalClose = () => {
    handleClose();
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const amount = parseFloat(depositAmount);

    // 1. Construct the payload for the API
    // We send 'name' so the backend can attach it to the Success URL
    const apiPayload = {
        name: selectedProduct.name, 
        amount: amount,          
    };

    // NOTE: We are NOT saving to sessionStorage here anymore.
    // We are trusting the API to return this data in the success_url.

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiPayload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Payment launch failed: ${errorData.error || response.statusText}`);
            return;
        }

        const data = await response.json();
        
        // Redirect to Stripe
        // The Backend must have success_url configured to return params:
        // e.g. .../payment-success?name=Checking&amount=500
        window.location.href = data.url; 

    } catch (error) {
        console.error('Error starting Stripe process:', error);
        alert('There was an error connecting to the payment server.');
        onModalClose();
    }
  };

  return (
    <Modal show={show} onHide={onModalClose} size="lg" centered>
      <Modal.Header closeButton className="bg-warning text-dark">
        <Modal.Title>Open New Account</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <h4>Select Account Type</h4>
          <Table striped bordered hover responsive size="sm" className="mb-4">
            <thead className="table-primary text-dark">
              <tr>
                <th>Select</th>
                <th>Account Name</th>
                <th>Interest Rate</th>
                <th>Min. Deposit</th>
              </tr>
            </thead>
            <tbody>
              {accountProducts.map((product) => (
                <tr 
                  key={product.id} 
                  onClick={() => setSelectedAccount(product.id)} 
                  className={selectedAccount === product.id ? 'table-warning' : ''}
                >
                  <td>
                    <Form.Check 
                      type="radio" 
                      name="accountType" 
                      id={product.id} 
                      checked={selectedAccount === product.id}
                      onChange={() => setSelectedAccount(product.id)}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{(product.rate * 100).toFixed(1)}%</td>
                  <td>${product.minDeposit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {selectedProduct && (
            <>
              <h4>Enter Opening Deposit Amount</h4>
              <Form.Label>
                You are opening a {selectedProduct.name}. The minimum deposit is ${selectedProduct.minDeposit}.00.
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="0.00"
                  min={selectedProduct.minDeposit}
                  step="0.01"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                />
              </InputGroup>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="warning" 
            type="submit" 
            disabled={!selectedProduct || parseFloat(depositAmount) <= 0}
          >
            Open Account & Fund
          </Button>
          <Button variant="secondary" onClick={onModalClose}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default SelectAccountDialog;