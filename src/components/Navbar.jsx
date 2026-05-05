import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ background: '#4f46e5', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', textDecoration: 'none' }}>
        Subscription Tracker 
      </Link>
      <Link to="/add" style={{ background: 'white', color: '#4f46e5', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
        + Add
      </Link>
    </nav>
  )
}