# SmartBank: A Modern Neobank Prototype - Frontend

## Project Overview

SmartBank is a high-fidelity, interactive prototype exploring what a modern, user-centric digital banking (neobank) experience could be. This project focuses on creating a clean, intuitive, and seamless React frontend interface.

Domain: Digital Banking, Payment Systems (FinTech)


---

## Minimum Viable Product (MVP)

The primary goal of this frontend application is to simulate the full user experience for opening and funding a new bank account by managing the necessary state and integrating with the separate backend API.

### Key User Flow Handled by the Frontend:

1.  **Dashboard Display:** The user lands on the dashboard (`HomePage.jsx`) displaying a set of sample, hardcoded accounts, managed via **React Context** (`AccountContext.jsx`).
2.  **Initiate Account Opening:** The user clicks **"Open Account"**, triggering the `SelectAccountDialog.jsx` modal.
3.  **API Integration:** The frontend sends a request to the separate Express backend to initiate a **Stripe Checkout session**.
4.  **Redirection Handling:** The frontend redirects the user to the Stripe payment page.
5.  **Post-Payment State Management:** Upon returning to the site, the frontend checks the URL for transaction parameters and uses the `addAccount` function from `AccountContext` to **temporarily add the new, funded account** to the dashboard.

> **Note on Scope:** This is a prototype. Account data is managed via **React context** and is **not persistent** across sessions. Full user authentication is excluded from this MVP.

---

## Technology Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **User Interface** | **React** (with Vite) | Building the interactive, high-fidelity UI components (e.g., `Layout`, `AccountCard`). |
| **Styling** | **React-Bootstrap / CSS** | Modern, responsive design and pre-built components. |
| **State Management** | **React Context** | Managing the list of accounts (`AccountContext.jsx`). |
| **Routing** | **React Router DOM** | Handling page navigation (Dashboard, Payment Success). |
| **Backend Dependency** | **Node.js / Express** | (External) The frontend relies on a minimal separate Express API for handling the Stripe Checkout session. |

---

## Project Setup & Running Locally

### Prerequisites

* Node.js (LTS version)
* The separate **SmartBank Express Backend** must be running (typically on `http://localhost:3000`).

### Running the Frontend

1.  Clone this repository and navigate to the project directory.
2.  Install all required dependencies:
    ```bash
    npm install
    ```
3.  Start the React application. This command opens the frontend in your browser (typically on `http://localhost:5173`):
    ```bash
    npm run dev
    ```

### Key Files and Components

* **`src/components/Layout.jsx`**: The main structure, including the `Navbar` and `Footer`.
* **`src/pages/HomePage.jsx`**: The main dashboard view where accounts are displayed. Includes the `useEffect` hook to handle account creation after payment success.
* **`src/context/AccountContext.jsx`**: Manages the global state of the accounts and provides the `addAccount` function.
* **`src/components/SelectAccountDialog.jsx`**: Contains the logic for selecting an account and initiating the API call to the backend for payment.