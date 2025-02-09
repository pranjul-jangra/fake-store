import React, {Children, createContext, useState} from 'react'

export const ActiveSidebarStateContext = createContext();

export default function ActiveSidebarStateProvider({children}) {

  const [ActiveTabs, setActiveTabs] = useState({sort: 'asc', limit: 'default'});

    
  return (
    <ActiveSidebarStateContext.Provider value={{ActiveTabs, setActiveTabs}}>
        {children}
    </ActiveSidebarStateContext.Provider>
  )
}
