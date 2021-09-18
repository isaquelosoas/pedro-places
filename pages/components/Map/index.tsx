import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './../../../styles/Map.module.css'

const Map: NextPage = () => {
  const [hidden,setHidden] = useState<boolean>(false)
  const toggleHidden = () =>{
    setHidden(!hidden)
  }
  return (
    <div className={hidden?styles.map:styles.hiddenMap}>
      <h1>
        Pedro<strong>Places</strong>
      </h1>
      <div>
        <img src="https://outraspalavras.net/wp-content/uploads/2020/08/mapa1.png" placeholder="imagem de mapa"/>
      </div>
      <div>
        <button onClick={toggleHidden}>{hidden?"Ocultar Mapa":"Ver Mapa"}</button>
      </div>
    </div>
  )
}

export default Map