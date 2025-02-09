import React, { useState, useEffect } from "react";
import Thumbnail from "./Thumbnail";
import "../css/cart.css";

export default function Cart() {

  const [data, setData] = useState({ urlData: [], cartData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchingCartProducts() {
      try {
        const [urlResponse, cartResponse] = await Promise.all([
          fetch("https://fakestoreapi.com/products", { signal }),
          fetch('https://fakestoreapi.com/carts', { signal }),
        ]);

        if (!urlResponse.ok || !cartResponse.ok) throw new Error("Data not fetched");

        const urlJsonData = await urlResponse.json();
        const cartJsonData = await cartResponse.json();

        setData({ urlData: urlJsonData, cartData: cartJsonData });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchingCartProducts();
    return () => controller.abort();
  }, []);

  // Create a lookup map for urlData (O(1) lookup time)
  const productMap = new Map(data.urlData.map((product) => [product.id, product]));

  // Deduplicate products (group by productId)
  const uniqueProducts = new Map();

  data.cartData.forEach((item) => {
    item.products.forEach((obj) => {
      if (!uniqueProducts.has(obj.productId)) {
        uniqueProducts.set(obj.productId, { ...obj, date: item.date });
      }
    });
  });


  return (
    <section className="cart">
        <div>Products in cart:</div>
        <div>
            {loading ? (<p>Loading items...</p>) : uniqueProducts.size === 0 ? (<p>Loading items...</p>) : (
                [...uniqueProducts.values()].map((obj) => {
                const product = productMap.get(obj.productId);
                if (!product) return null;

                const {image, title, description, price, rating} = product;

                let truncatedTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;
                let truncatedDescription = description.length > 60 ? description.slice(0, 60) + "..." : description;

                return (
                    <Thumbnail key={`${obj.userId}-${obj.productId}`} productId={obj.productId} image={image} title={truncatedTitle} description={truncatedDescription} price={price} rating={rating.rate} date={obj.date} quantity={obj.quantity} />
                );
                })
            )}
        </div>
    </section>
  );
}
