import React, { useEffect } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import AccountCard from '../components/AccountCard'; 
import { useAccounts } from '../context/AccountContext';

const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
};

const recentTransactions = [
    { date: '11/15', description: 'Direct Deposit - Payroll', type: 'Credit', amount: '+$1,500.00' },
    { date: '11/16', description: 'Check #101 - Electric Co.', type: 'Debit', amount: '-$75.50' },
    { date: '11/17', description: 'ATM Withdrawal', type: 'Debit', amount: '-$100.00' },
    { date: '11/18', description: 'POS Purchase - Coffee Shop', type: 'Debit', amount: '-$5.80' },
    { date: '11/19', description: 'Online Transfer to Savings', type: 'Debit', amount: '-$200.00' },
];

function HomePage() {
  const { accounts, addAccount } = useAccounts();
  const userName = "John Doe";

  useEffect(() => {
    // 1. Get data from URL
    const searchParams = new URLSearchParams(window.location.search);
    const action = searchParams.get('action');
    const name = searchParams.get('name');
    const amount = searchParams.get('amount');

    // 2. If "add" action exists, format data for Context
    if (action === 'add' && name && amount) {
        
        // MATCHING THE CONTEXT EXPECTATION:
        // The context wants { product: { name: "..." }, amount: ... }
        const payloadForContext = {
            product: {
                name: name
            },
            amount: parseFloat(amount)
        };

        // 3. Send it. Context will handle ID and Number generation itself.
        addAccount(payloadForContext);

        // 4. Clean the URL
        window.history.replaceState({}, '', '/');
    }
  }, [addAccount]);
  
  return (
    <Container>
      
      {/* Welcome Header */}
      <h1 className="mb-1">Welcome Back, {userName}</h1>
      <p className="lead text-muted mb-4">Today is {getCurrentDate()}</p>
      
      <h2 className="mb-4">Dashboard Overview</h2>
      
      {/* Account Cards Container */}
      <Row className="g-4 mb-5">
        {accounts.map((account) => (
            <AccountCard 
              key={account.id}
              name={account.name}
              number={account.number}
              balance={account.balance}
              {...account} 
            />
        ))}
      </Row>

      <h2 className="mb-3 mt-5">Recent Transactions</h2>
      <Row>
        <Col xs={12}>
          <Table striped bordered hover responsive>
            <thead className="table-primary text-white">
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.date}</td>
                  <td>{tx.description}</td>
                  <td className={`text-end fw-bold ${tx.type === 'Credit' ? 'text-success' : 'text-danger'}`}>
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      
    </Container>
  );
}

export default HomePage;