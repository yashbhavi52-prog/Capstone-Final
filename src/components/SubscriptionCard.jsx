import { useNavigate } from 'react-router-dom'

export default function SubscriptionCard({ sub, onDelete }) {
  const navigate = useNavigate()

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '18px' }}>{sub.name}</h3>
        <span style={{ background: '#ede9fe', color: '#4f46e5', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>
          {sub.category}
        </span>
      </div>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4f46e5', marginBottom: '4px' }}>
        ₹{sub.price}<span style={{ fontSize: '14px', color: '#888', fontWeight: 'normal' }}>/mo</span>
      </p>
      <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>Renewal: {sub.renewalDate}</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate(`/edit/${sub.id}`)}
          style={{ flex: 1, padding: '8px', background: '#ede9fe', color: '#4f46e5', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Edit
        </button>
        <button onClick={() => onDelete(sub.id)}
          style={{ flex: 1, padding: '8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Delete
        </button>
      </div>
    </div>
  )
}