import type { NextPage } from 'next'
import { useState } from 'react'
import axios from 'axios'
import styles from './../../../styles/Card.module.css'
import { Star, StarBorder, ZoomOutMap } from '@material-ui/icons';
import ImgButton from '../ImgButton';
import { Zoom } from '@material-ui/core';
interface CardProps{
    favorite:boolean
    zoomMap: (location:google.maps.LatLngLiteral|google.maps.LatLng)=>void
    data:{
        id:number
        img:string,
        title:string,
        district:string,
        city:string,
        state:string,
        postalCode:string  ,
        location:{
            lat:number,
            lng:number
        }  
    },
    handleAddImage:(id:number)=>void
}
const Card = ({data,favorite, handleAddImage, zoomMap}:CardProps) => {
    const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
    const [favoriteCard, setFavoriteCard] = useState<boolean>(favorite)
    const { id=1, img, title, district, city, state, postalCode, location } = data
    const toggleFavorite = async () =>{
        setFavoriteCard(!favoriteCard)
        const request = await axios.put(`${BASE_URL}/api/updateCard`,{id,attr:"favorite",value:!favoriteCard})
        console.log(request)
    }
    return (
        <article className={favoriteCard?styles.cardFavorite:styles.card}>
            <div>
                <div className={styles.imgContainer}>
                    {img?<img src={img}/>:<ImgButton onClick={()=>{handleAddImage(id)}}/>}
                </div>
                <h2>
                    {`${id}. ${title}`}
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
                <button className={styles.btnMap} onClick={()=>{zoomMap(location)}}>Ver no Mapa</button>
                <button className={styles.btnFavorite} onClick={()=>{toggleFavorite();zoomMap(location)}}>
                    {
                        favoriteCard?
                        <Star sx={{ color: '#FFBB33', fontSize:40 }} />:
                        <StarBorder sx={{ fontSize:40 }}/>
                    }
                </button>
            </div>
        </article>
  )
}

export default Card