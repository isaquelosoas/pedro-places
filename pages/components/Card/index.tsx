import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './../../../styles/Card.module.css'
import { Star, StarBorder } from '@material-ui/icons';
import ImgButton from '../ImgButton';
interface CardProps{
    data:{
        img:string,
        title:string,
        district:string,
        city:string,
        state:string,
        postalCode:string    
    },
    handleAddImage:()=>void
}
const Card = ({data, handleAddImage}:CardProps) => {
    const [favorite, setFavorite] = useState<boolean>(false)
    const toggleFavorite = () =>{
        setFavorite(!favorite)
    }
    const { img, title, district, city, state, postalCode } = data
    return (
        <article className={favorite?styles.cardFavorite:styles.card}>
            <div>
                <div className={styles.imgContainer}>
                    {img?<img src={img}/>:<ImgButton onClick={handleAddImage}/>}
                </div>
                <h2>
                    {title}
                </h2>
                <div className={styles.details}>
                    <span>
                        {district}
                    </span>
                    <span>
                        {city} - {state}
                    </span>
                    <span>
                        {postalCode}
                    </span>
                </div>
            </div>
            <div className={styles.actions}>
                <button className={styles.btnMap}>Ver no Mapa</button>
                <button className={styles.btnFavorite} onClick={toggleFavorite}>
                    {
                        favorite?
                        <Star sx={{ color: '#FFBB33', fontSize:40 }} />:
                        <StarBorder sx={{ fontSize:40 }}/>
                    }
                </button>
            </div>
        </article>
  )
}

export default Card