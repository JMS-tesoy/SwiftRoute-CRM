import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Inject debug outline when URL contains `?debugBorders=1`
if (typeof window !== 'undefined' && window.location && window.location.search.includes('debugBorders=1')) {
	const s = document.createElement('style')
	s.id = 'debug-borders'
	s.textContent = `
		* { outline: 1px solid rgba(255,0,0,0.32) !important; }
		/* make outlines less intrusive on overlay elements */
		header, nav, main, footer, button, input, select, textarea { outline-offset: 0px; }
	`
	document.head.appendChild(s)
}

createRoot(document.getElementById('root')).render(<App />)
