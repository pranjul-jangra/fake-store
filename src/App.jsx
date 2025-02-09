import React, { Suspense, lazy,useContext } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import './app.css'
import Navbar from './components/Navbar'
import Loading from './components/Loading';
import ErrorFallback from './components/ErrorFallback';
import { ActivePageContext } from './contexts/ActivePageProvider';
import { ThemeContext } from './contexts/ThemeContextProvider';
//lazy import a component to make it compatible with suspense
const Home = lazy(()=> import('./components/Home'));
const Cart = lazy(()=> import('./components/Cart'))
const ProductDetailPage = lazy(()=> import('./components/ProductDetailPage'))


export default function App() {

  const {activePage} = useContext(ActivePageContext);
  const {theme} = useContext(ThemeContext);

  return (
      <section className={`app ${theme}`}>
        <div>
          <Navbar />
        </div>
        <div>
          {
            activePage.home && (
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              </ErrorBoundary>)
          }

          {
            activePage.productDetail.isActive && (
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loading />}>
                  <ProductDetailPage productId={activePage.productDetail.productId} />
                </Suspense>
              </ErrorBoundary>)
          }

          {
            activePage.cart && (
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loading />}>
                  <Cart />
                </Suspense>
              </ErrorBoundary>)
          }
        </div>
      </section>
  );
}
