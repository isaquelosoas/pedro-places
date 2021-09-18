import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './../../../styles/ImgButton.module.css'
import {AddCircleOutline} from '@material-ui/icons';

const ImgButton = () => {  
  return (
    <button className={styles.btnAddImage}>
        <AddCircleOutline sx={{color:"#fffff", fontSize:30}} />
        <h3>Add Photo</h3>
    </button>
  )
}

export default ImgButton