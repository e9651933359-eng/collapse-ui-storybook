import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './theme/tokens.css'
import './styles.css'
import './components/ui/ui.css'
import { applyShellTheme, readShellTheme } from './theme/shellTheme'

applyShellTheme(readShellTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
