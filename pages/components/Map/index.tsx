import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from './../../../styles/Map.module.css'
import { Loader } from "@googlemaps/js-api-loader"
interface MapProps{
  setHidden:any,
  hidden:boolean,
}
const Map= ({setHidden,hidden}:MapProps) => {
  const toggleHidden = () =>{
    setHidden(!hidden)
  }
  return (
    <div className={hidden?styles.map:styles.hiddenMap}>
      <h1 id="title">
        Pedro<strong>Places</strong>
      </h1>
      <div className={hidden?styles.fullImg:styles.img} id="map">
        {/* <img src="https://outraspalavras.net/wp-content/uploads/2020/08/mapa1.png" placeholder="imagem de mapa"/> */}
      </div>
      <div>
        <button onClick={()=>{toggleHidden()}}>{hidden?"Ocultar Mapa":"Ver Mapa"}</button>
      </div>
    </div>
  )
}

export default Map