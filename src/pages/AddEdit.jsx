import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CATEGORIES = ['Entertainment', 'Music', 'Productivity', 'Gaming', 'Other']

export default function AddEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', price: '', category: 'Entertainment', renewalDate: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (id) {
      const subs = JSON.parse(localStorage.getItem('subs') || '[]')
      const found = subs.find(s => s.id === id)
      if (found) setForm(found)
    }
  }, [id])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Enter your Service name'
    if (!form.price || form.price <= 0) e.price = 'Enter Valid Price'
    if (!form.renewalDate) e.renewalDate = 'Enter Correct Date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const subs = JSON.parse(localStorage.getItem('subs') || '[]')
    if (id) {
      const updated = subs.map(s => s.id === id ? { ...form, id } : s)
      localStorage.setItem('subs', JSON.stringify(updated))
    } else {
      localStorage.setItem('subs', JSON.stringify([...subs, { ...form, id: Date.now().toString() }]))
    }
    navigate('/')
  }

  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginTop: '6px' }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>{id ? 'Edit' : 'Add'} Subscription</h2>

      {[
        { label: 'Service Name', key: 'name', type: 'text' },
        { label: 'Monthly Price (₹)', key: 'price', type: 'number' },
        { label: 'Renewal Date', key: 'renewalDate', type: 'date' },
      ].map(f => (
        <div key={f.key} style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>{f.label}</label>
          <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={inputStyle} />
          {errors[f.key] && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors[f.key]}</p>}
        </div>
      ))}

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Category</label>
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate('/')}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', cursor: 'pointer', background: 'white' }}>
          Cancel
        </button>
        <button onClick={handleSubmit}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
          {id ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  )
}