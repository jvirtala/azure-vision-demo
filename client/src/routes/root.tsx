import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{
        width: '200px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh'
      }}>
        <h2>Navigation</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/photo-analysis">Photo Analysis</Link></li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
