import React, {useContext} from 'react'
import '../css/sidebar.css'
import { UrlContext } from '../contexts/UrlContextProvider';
import { ActiveSidebarStateContext } from '../contexts/ActiveSidebarStateProvider';
import { FilterContext } from '../contexts/FilterContextProvider';
import { ThemeContext } from '../contexts/ThemeContextProvider';

export default function Sidebar() {
  const { setUrl} = useContext(UrlContext);
  const {ActiveTabs, setActiveTabs} = useContext(ActiveSidebarStateContext);
  const {filter, setFilter} = useContext(FilterContext);
  const {theme} = useContext(ThemeContext);

  function handleLimitChange(limit) {
    //ActiveTabs is not updated immediately (setState is async), using ActiveTabs.sort might reference an outdated value.
    setActiveTabs(prevState => ({ ...prevState, limit }));
    const sort = ActiveTabs.sort;
    if (limit === 'default') {
      setUrl(filter === 'all' 
        ? `https://fakestoreapi.com/products?sort=${sort}` 
        : `https://fakestoreapi.com/products/category/${filter}?sort=${sort}`
      );
    } else {
      setUrl(filter === 'all' 
        ? `https://fakestoreapi.com/products?limit=${limit}&sort=${sort}` 
        : `https://fakestoreapi.com/products/category/${filter}?limit=${limit}&sort=${sort}`
      );
    }
  }
  
  function handleSortChange(sort) {
    //ActiveTabs is not updated immediately (setState is async), using ActiveTabs.sort might reference an outdated value.
    setActiveTabs(prevState => ({ ...prevState, sort }));
    const limit = ActiveTabs.limit;
    if (limit === 'default') {
      setUrl(filter === 'all' 
        ? `https://fakestoreapi.com/products?sort=${sort}` 
        : `https://fakestoreapi.com/products/category/${filter}?sort=${sort}`
      );
    } else {
      setUrl(filter === 'all' 
        ? `https://fakestoreapi.com/products?limit=${limit}&sort=${sort}` 
        : `https://fakestoreapi.com/products/category/${filter}?limit=${limit}&sort=${sort}`
      );
    }
  }
  

  return (
    <section className={`sidebar ${theme}`}>
      <span>sort:</span>
      <div>
        <div data-sort='asc' data-active={ActiveTabs.sort === 'asc'} onClick={() => {handleSortChange('asc')}}>ascending</div>
        <div data-sort='desc' data-active={ActiveTabs.sort === 'desc'} onClick={() => {handleSortChange('desc')}}>descending</div>
      </div>
      <span>limit:</span>
      <div>
        <div data-limit='default' data-active={ActiveTabs.limit === 'default'} onClick={() => {handleLimitChange('default')}}>default</div>
        <div data-limit='5' data-active={ActiveTabs.limit === '5'} onClick={() => {handleLimitChange('5')}}>5</div>
        <div data-limit='10' data-active={ActiveTabs.limit === '10'} onClick={() => {handleLimitChange('10')}}>10</div>
        <div data-limit='15' data-active={ActiveTabs.limit === '15'} onClick={() => {handleLimitChange('15')}}>15</div>
      </div>
    </section>
  )
}
