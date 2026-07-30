import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from '@dotss/ui/core/ThemeProvider'
import App from './App.jsx'
import './styles/global.css'

// 째깍악어 디자인 시스템(@dotss/ui) — 학부모용 라이트 테마 + 글로벌 스타일
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider
      themeConfig={{ mode: 'light', type: 'tictoccroc-parent' }}
      disableGlobalStyle
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
