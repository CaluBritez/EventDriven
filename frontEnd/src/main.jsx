import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter.jsx'
import { Toaster } from 'sonner'
import './index.css'

import { store } from './store/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
