import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import UrlContextProvider from './contexts/UrlContextProvider'
import ActivePageProvider from './contexts/ActivePageProvider'
import ActiveSidebarStateProvider from './contexts/ActiveSidebarStateProvider'
import FilterContextProvider from './contexts/FilterContextProvider'
import ThemeContextProvider from './contexts/ThemeContextProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UrlContextProvider>
      <ThemeContextProvider>
        <ActivePageProvider>
          <FilterContextProvider>
            <ActiveSidebarStateProvider>
              <App />
            </ActiveSidebarStateProvider>
          </FilterContextProvider>
        </ActivePageProvider>
      </ThemeContextProvider>
    </UrlContextProvider>
  </StrictMode>,
)
