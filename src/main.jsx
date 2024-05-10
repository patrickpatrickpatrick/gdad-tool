import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalStyle } from 'govuk-react' 
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'

const root = document.getElementById('root');
const routePrefix = root.getAttribute('data-route-prefix');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <GlobalStyle />
    <Router basename={routePrefix || ""}>
      <App routePrefix={routePrefix} />
    </Router>
  </React.StrictMode>,
)
