import '@fontsource-variable/fraunces';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/noto-sans-arabic';
import '@fontsource/noto-sans-tifinagh';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)