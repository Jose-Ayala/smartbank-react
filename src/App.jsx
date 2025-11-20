// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage'; 

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;