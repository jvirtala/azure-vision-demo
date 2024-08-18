import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <div className="flex h-dvh">
      <nav
        className="flex flex-col flex-align-start pt-10 px-8 bg-gray-50">
        <ul className='list-none space-y-2 font-medium'>
          <li><Link to="/">Home</Link></li>
        </ul>
        <ul className='list-none space-y-2 font-medium text-gray-900'>
          <li><Link to="/photo-analysis">Photo Analysis</Link></li>
        </ul>
        <ul className='list-none space-y-2 font-medium'>
          <li><Link to="/sentiment-analysis">Sentiment Analysis</Link></li>
        </ul>
      </nav>
      <main
      className='flex-1 p-20'>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
