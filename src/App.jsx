import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddEdit from './pages/AddEdit'

function App() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/edit/:id" element={<AddEdit />} />
        </Routes>
      </div>
    </>
  )
}

export default App