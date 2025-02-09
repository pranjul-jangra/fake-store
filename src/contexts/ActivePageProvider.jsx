import React,{createContext, useState} from 'react'

export const ActivePageContext = createContext();

export default function ActivePageProvider({children}) {
  const [activePage, setActivePage] = useState({'home':true, 'cart':false, 'productDetail':{isActive: false, productId: null}});
  return (
    <ActivePageContext.Provider value={{activePage, setActivePage}}>
      {children}
    </ActivePageContext.Provider>
  )
}
