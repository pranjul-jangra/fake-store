import React, {useEffect, useContext, useState} from 'react'
import { ThemeContext } from '../contexts/ThemeContextProvider';
import '../css/productDetailPage.css'

export default function ProductDetailPage({productId}) {

    const {theme} = useContext(ThemeContext);
    const [data, setData] = useState({});

  useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetchData(){
        try{
            console.log(productId)
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {signal});
            if(!response.ok) throw new Error('data not fetched')
            const jsonData = await response.json()
            setData(jsonData)
        }catch(error){
            if (error.name !== 'AbortError') {
              console.error(error);
            }
        }
    }
    fetchData();

    return ()=>{
      controller.abort();
    }
  },[productId]);


  return (
    <section className={`detailPage ${theme}`}> 
        <img src={data.image} alt="image not found" />
        <pre><span>Title:</span>   {data.title}</pre>
        <pre><span>Description:</span>   {data.description}</pre>
        <pre><span>Price:</span>   {data.price}</pre>
        <pre><span>Rating:</span>   {data.rating?.rate}</pre>
        <pre><span>Rate Count:</span>   {data.rating?.count}</pre>
    </section>
  )
}
