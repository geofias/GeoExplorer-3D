import React from 'react'
import SiteCard from './SiteCard'


export default function Sidebar({ sites, onSelect }) {
    return (
        <div style={{ padding: 12 }}>
            <h2>GeoExplorer</h2>
            <p>Total sites: {sites.length}</p>


            <div style={{ display: 'grid', gap: 8 }}>
                {sites.map((f) => (
                    <SiteCard key={f.id} feature={f} onClick={() => onSelect(f.id)} />
                ))}
            </div>


        </div>
    )
}