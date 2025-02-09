import React, { createContext, useState } from 'react'

export const UrlContext = createContext();   //it creates a context object

//this component will be used to provide the context to the children and it accepts the children props
export default function UrlContextProvider({children}) {

  const [url, setUrl] = useState('https://fakestoreapi.com/products');  //it's the state we want to use in context

  return (    //wrap the children in the context.Provider so that all the childrens can access the state
    <UrlContext.Provider value={{url, setUrl}}>
        {children}
    </UrlContext.Provider>
  )
}

//we can use the context in any component by using the useContext hook