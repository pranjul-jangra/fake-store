import React, {createContext, useState} from 'react'

export const CartContext = createContext();

export default function CartContextProvider({children}) {

    const [cartUrl, setCartUrl] = useState('https://fakestoreapi.com/carts');

  return (
    <CartContext.Provider value={{cartUrl, setCartUrl}}>
        {children}
    </CartContext.Provider>
  )
}
