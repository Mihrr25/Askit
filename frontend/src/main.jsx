import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './lib/store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered.', reg))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        <App />
    </Provider>
)
