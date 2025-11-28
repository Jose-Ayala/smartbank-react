import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';

function PaymentSuccess() {
    // Read params from the URL (Browser's address bar)
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get('name');
    const amount = searchParams.get('amount');

    // If no name/amount in URL, show error
    if (!name || !amount) {
        return (
            <Container className="text-center py-5">
                <Alert variant="danger">Error: Missing transaction details.</Alert>
                <Button href="/">Return to Dashboard</Button>
            </Container>
        );
    }

    return (
        <Container className="text-center py-5">
            <Alert variant="success">
                <Alert.Heading>Payment Successful</Alert.Heading>
                <p>Your new <strong>{name}</strong> has been opened with <strong>${amount}</strong>.</p>
            </Alert>
            
            <Button 
                variant="warning" 
                href={`/?action=add&name=${encodeURIComponent(name)}&amount=${amount}`}
            >
                Return to Dashboard
            </Button>
        </Container>
    );
}

export default PaymentSuccess;