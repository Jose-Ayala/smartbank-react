import { Container } from 'react-bootstrap';

const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
};

function HomePage() {
  return (
    <Container className="text-center">
      <h2>Welcome Back John Doe!</h2>
      <p>Today is {getCurrentDate()}</p>
    </Container>
  );
}

export default HomePage;