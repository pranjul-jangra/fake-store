import React, {useContext} from 'react'
import '../css/navbar.css'
import { ActivePageContext } from '../contexts/ActivePageProvider'
import { ThemeContext } from '../contexts/ThemeContextProvider';

export default function Navbar() {

  const {activePage,setActivePage} = useContext(ActivePageContext);
  const {theme, setTheme} = useContext(ThemeContext);

  function handleThemeChange(){
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <nav className='navbar'>
        <div>FakeHub</div>
        <div data-active={activePage.home} onClick={()=> setActivePage({'home':true, 'cart':false, 'productDetail':{isActive: false, productId: null}})}>Products</div>
        <div data-active={activePage.cart} onClick={()=> setActivePage({'home':false, 'cart':true, 'productDetail':{isActive: false, productId: null}})}>Cart</div>
        {/* <input className='search-bar' type="search" placeholder='search...'/> */}
        <div className={`theme-toggle ${theme}`} onClick={()=> handleThemeChange()}></div>Dark mode
    </nav>
  )
}
