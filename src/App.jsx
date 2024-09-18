import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DiscoveryFeed from './components/DiscoveryFeed';
import ProductPage from './components/ProductPage';
import SubmitProduct from './components/ProductSubmissionForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <Router>
        <nav>
          <ul className="flex space-x-4 mb-8">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/submit">Submit Product</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<DiscoveryFeed />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/submit" element={<SubmitProduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
