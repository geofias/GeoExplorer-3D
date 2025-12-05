import React from 'react'


export default function SiteCard({ feature, onClick }) {
    const p = feature.properties || {}
    return (
        <div onClick={onClick} style={{ cursor: 'pointer', padding: 8, border: '1px solid #eee', borderRadius: 6 }}>
            <strong>{p.name}</strong>
            <div style={{ fontSize: 12 }}>{p.country} — {p.geological_type}</div>
            <div style={{ fontSize: 11, color: '#666' }}>{p.description?.slice(0, 120)}</div>
        </div>
    )
}