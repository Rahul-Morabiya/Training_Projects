import { useState } from 'react'
import './App.css'
import StarRating from './components/StarRating'
import ImageSlider from './components/ImageSlider'
import LoadMore from './components/LoadMore'
import QrCodeGen from './components/QrCodeGen';
import LightDarkMode from './components/LightDarkMode'

function App() {
  
  return (
    <>
      {/* <StarRating noOfStars={10}/> */}
      {/* <ImageSlider url={'https://picsum.photos/v2/list'} limit={10} page={1}></ImageSlider> */}
      {/* <LoadMore/> */}
      {/* <QrCodeGen/> */}
      <LightDarkMode/>
    </>
  )
}

export default App
