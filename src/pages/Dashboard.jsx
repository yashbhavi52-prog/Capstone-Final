import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SubscriptionCard from '../components/SubscriptionCard'

export default function Dashboard() {
  const [subs, setSubs] = useState(() => JSON.parse(localStorage.getItem('subs') || '[]'))
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    localStorage.setItem('subs', JSON.stringify(subs))
  }, [subs])

  const onDelete = (id) => setSubs(subs.filter(s => s.id !== id))

  const filtered = subs
    .filter(s => category === 'All' || s.category === category)
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  const total = subs.reduce((sum, s) => sum + Number(s.price), 0)

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Subscriptions', value: subs.length },
          { label: 'Monthly Spend', value: `₹${total}` },
          { label: 'Categories', value: [...new Set(subs.map(s => s.category))].length },
        ].map(stat => (
          <div key={stat.label} style={{ background: 'white', borderRadius: '12px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#4f46e5' }}>{stat.value}</p>
            <p style={{ fontSize: '13px', color: '#888' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}>
          {['All', 'Entertainment', 'Music', 'Productivity', 'Gaming', 'Other'].map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '60px', color: '#888' }}>
          <p style={{ fontSize: '48px', marginBottom: '12px' }}>📭</p>
          <p>No subscriptions yet. <Link to="/add" style={{ color: '#4f46e5' }}>Add one!</Link></p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {filtered.map(sub => <SubscriptionCard key={sub.id} sub={sub} onDelete={onDelete} />)}
        </div>
      )}
    </div>
  )
}