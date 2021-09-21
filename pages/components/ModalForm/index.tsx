import { useState } from 'react'
import styles from './../../../styles/ModalForm.module.css'
import {Close} from '@material-ui/icons';
interface ModalFormProps{
  onClick:()=>void
  formData:{
    handleSubmit:()=>void,
    buttonTitle:string,
    label:string,
    placeholder:string
  }
}
const  ModalForm = ({onClick,formData}:ModalFormProps) => {  
  const { handleSubmit, buttonTitle, label, placeholder} = formData
  return (
    <div className={styles.modalForm} onClick={(e)=>{e.preventDefault()}}>
      <div className={styles.closeButton}>
        <button type="button" onClick={onClick}>
          <Close sx={{fontSize:30}}/>
        </button>
      </div>
      <fieldset>
        <label htmlFor="image">{label}</label>
        <input type="text" placeholder={placeholder}/>
      </fieldset>
      <button className={styles.submitButton} onClick={handleSubmit}>{buttonTitle}</button>
    </div>
  )
}

export default ModalForm