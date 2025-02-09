import React from 'react'

export default function ErrorComponent() {
  return (
    <section style={{color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center',width: '100vw', fontSize: '30px', textShadow: '0 0 2px black'}}>
      <h2>Something went wrong.</h2>
      <p>Please try again.</p>
    </section>
  )
}
