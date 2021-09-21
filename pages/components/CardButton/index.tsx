import { useState } from 'react'
import Image from 'next/image'
import styles from './../../../styles/CardButton.module.css'
import AddIcon from "./../../../public/addIcon.svg"
interface ImgButtonProps{
  onClick:()=>void
}
const CardButton = ({onClick}:ImgButtonProps) => {  
  return (
    <button className={styles.cardButton} onClick={onClick}>
        <Image src={AddIcon} />
    </button>
  )
}

export default CardButton