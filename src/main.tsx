import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from './rtk/store'
import { Provider } from 'react-redux'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner';
import './assets/global.scss';
import './i18n/i18n.ts'
import '../node_modules/react-phone-input-2/lib/bootstrap.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-center" />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)


