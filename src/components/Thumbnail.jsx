import React, {useContext} from 'react'
import '../css/thumbnail.css'
import { ThemeContext } from '../contexts/ThemeContextProvider'
import { ActivePageContext } from '../contexts/ActivePageProvider';

export default function Thumbnail({image,title, description, price, rating,date,quantity,productId}) {
  const {theme} = useContext(ThemeContext);
  const {setActivePage} = useContext(ActivePageContext);

  function handleProductClick(productId){
    console.log(productId)
    setActivePage({'home':false, 'cart':false, 'productDetail':{isActive: true, productId: productId}})
  }

  return (
    <section className={`thumbnail ${theme}`} onClick={()=> handleProductClick(productId)}>
        <img src={image} alt="image unavailable" loading='lazy' />
        <div>{title || 'title unavailable'}</div>
        <div>{description || 'description unavailable'}</div>
        <div>
            <div>Price: {price} INR</div>
            <div>Rating: {rating || '0'}</div>
        </div>
        <div>
          <div>{date && `Added-on: ${new Date(date).toLocaleDateString()}`}</div>
          <div>{quantity && `Quantity: ${quantity}`}</div>
        </div>
    </section>
  )
}
