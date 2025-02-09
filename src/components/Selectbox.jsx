import React, {useContext} from 'react'
import '../css/selectbox.css'
import { UrlContext } from '../contexts/UrlContextProvider'
import { FilterContext } from '../contexts/FilterContextProvider';
import { ActiveSidebarStateContext} from '../contexts/ActiveSidebarStateProvider';
import { ThemeContext } from '../contexts/ThemeContextProvider';

export default function Selectbox() {
  const {setUrl} = useContext(UrlContext)
  const {filter, setFilter} = useContext(FilterContext);
  const {ActiveTabs} = useContext(ActiveSidebarStateContext);
  const {theme} = useContext(ThemeContext);


  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setFilter(category);

    if(category === 'all') {
      ActiveTabs.limit === 'default' ?
      setUrl(`https://fakestoreapi.com/products?sort=${ActiveTabs.sort}`):
      setUrl(`https://fakestoreapi.com/products?limit=${ActiveTabs.limit}&sort=${ActiveTabs.sort}`);
    }else{
      ActiveTabs.limit === 'default' ?
      setUrl(`https://fakestoreapi.com/products/category/${category}?sort=${ActiveTabs.sort}`):
      setUrl(`https://fakestoreapi.com/products/category/${category}?limit=${ActiveTabs.limit}&sort=${ActiveTabs.sort}`);
    }
  }

  return (
    <select name="categories" className={`selectbox ${theme}`} onChange={()=> handleCategoryChange(event)} defaultValue={filter}  >
      <option value="all">All</option>
      <option value="electronics">Electronics</option>
      <option value="jewelery">Jewelery</option>
      <option value="men's clothing">Men's Clothing</option>
      <option value="women's clothing">Women's Clothing</option>
    </select>
  )
}
