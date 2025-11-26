import { Card, Col } from 'react-bootstrap';

function AccountCard(props) {
  const account = props; 
  
  return (
    <Col xs={12} md={6} lg={4} className="mb-4"> 
      <Card bg="white" text="dark" className="shadow-lg h-100">
        <Card.Header className="bg-warning text-dark" >
          <span>{account.name || 'Account Details'}</span>
        </Card.Header>
        <Card.Body>
          
          {Object.keys(account).map((key) => {
            let value = account[key];
            
            if (key === 'id' || key === 'type' || key === 'name') {
              return null;
            }

            if (key === 'balance' && value !== null) {
              value = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            } else if (value === null) {
              value = 'N/A';
            }
            
            return (
              <p key={key} className="mb-1 fs-6">
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
            );
          })}
          
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AccountCard;