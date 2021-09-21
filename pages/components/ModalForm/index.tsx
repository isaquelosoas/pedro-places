import { useRef, useState } from 'react'
import styles from './../../../styles/ModalForm.module.css'
import {Close} from '@material-ui/icons';
interface ModalFormProps{
  onClick:()=>void
  formData:{
    handleSubmit:(value:string)=>void,
    buttonTitle:string,
    label:string,
    placeholder:string
  }
}
const  ModalForm = ({onClick,formData}:ModalFormProps) => {  
  const input = useRef(null)
  const { handleSubmit, buttonTitle, label, placeholder} = formData
  console.log(input.current)
  return (
    <div className={styles.modalForm} onClick={(e)=>{e.preventDefault()}}>
      <div className={styles.closeButton}>
        <button type="button" onClick={onClick}>
          <Close sx={{fontSize:30}}/>
        </button>
      </div>
      <fieldset>
        <label htmlFor="image">{label}</label>
        <input ref={input} type="text" placeholder={placeholder}/>
      </fieldset>
      <button className={styles.submitButton} onClick={()=>{handleSubmit(input.current?input.current:"")}}>{buttonTitle}</button>
    </div>
  )
}

export default ModalForm