import React from 'react'
import '../css/loading.css'

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading products...</p>
    </div>
  )
}
