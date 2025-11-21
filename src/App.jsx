// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { AccountProvider } from './context/AccountContext';
import PaymentSuccess from './pages/PaymentSuccess';

// Router Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
      {
        path: '*',
        element: <HomePage />,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />,
      }
    ],
  },
]);

function App() {
  return (
    <AccountProvider>
      <RouterProvider router={router} />
    </AccountProvider>
  );
}

export default App;