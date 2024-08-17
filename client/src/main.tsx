import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.tsx'
import Home from './routes/home.tsx'
import PhotoAnalysis from './routes/photoanalysis.tsx'
import SentimentAnalysis from './routes/sentimentanalysis.tsx'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/photo-analysis',
        element: <PhotoAnalysis />,
      },
      {
        path: '/sentiment-analysis',
        element: <SentimentAnalysis />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
