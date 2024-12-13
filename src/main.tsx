import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import Routes from './routes'
import { store } from './store'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes />
        <Toaster position='top-center' richColors />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
