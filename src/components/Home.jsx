import React, {useEffect, useContext, useState} from 'react'
import Thumbnail from './Thumbnail';
import Selectbox from './Selectbox';
import Sidebar from './Sidebar'
import { UrlContext } from '../contexts/UrlContextProvider';
import '../css/home.css';

export default function Home() {
    const {url} = useContext(UrlContext);
    
    const [data, setData] = useState([]);


    useEffect(()=>{
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetchData(){ 
        try{
            const response = await fetch(url , {signal})
            if(!response.ok) throw new Error('data not fetched')
            const jsonData = await response.json()
            setData(jsonData)

          }catch(error){
            if (error.name !== 'AbortError') {
              console.error(error);
            }
          }
        };
        fetchData();
    
        return ()=>{
          controller.abort();
        }
    
    }, [url]);


  return (
    <div className="content">
        <div>
          <Sidebar />
        </div>
        <div className='app-container'>
          <div>
            Filter: <Selectbox />
          </div>
          <div className="thumbnail-container">
            {data.map((item) => {
              const { id, image, title, description, price, rating } = item;
              const truncatedTitle = title.length > 30 ? title.slice(0, 30) + '...' : title;
              const truncatedDescription = description.length > 60 ? description.slice(0, 60) + '...' : description;
            
              return <Thumbnail key={id} productId={id} image={image} title={truncatedTitle} description={truncatedDescription} price={price} rating={rating.rate}/>;
            })}
        </div>
        </div>
    </div>
  )
}