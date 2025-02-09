import React, {createContext, useState} from 'react'

export const FilterContext = createContext();

export default function FilterContextProvider({children}) {
  const [filter, setFilter] = useState('all');
  return (
    <FilterContext.Provider value={{filter, setFilter}}>
      {children}
    </FilterContext.Provider>
  )
}
