import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './../../../styles/Map.module.css'
import FavIcon from './../../../public/favorite.svg'
import Image from 'next/image'
const Card: NextPage = () => {
    return (
        <article>
            <div>
                <img src="https://placeimg.com/1080/750"/>
                <h2>
                        Rua Otacílio Fortes
                </h2>
                <span>
                        Parque Sul
                </span>
                <span>
                    Teresina - PI
                </span>
                <span>
                        64036-410
                </span>
            </div>
            <div>
                <button>Ver no Mapa</button>
                <button>
                    <Image src={FavIcon}/>
                </button>
            </div>
        </article>
  )
}

export default Card