import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './../../../styles/Modal.module.css'
import ModalForm from './../ModalForm'
interface ModalProps{
    onClick:()=>void,
    handleSubmit:(value:any, id?:number)=>void,
    formData:{
        buttonTitle:string,
        label:string,
        placeholder:string
    }
}
const Modal = ({onClick, formData, handleSubmit}:ModalProps) => {  
  return (
    <div className={styles.modal}>

        <div className={styles.modal} onClick={onClick}>
        </div>
        <ModalForm formData={formData} handleSubmit={handleSubmit} onClick={onClick}/>
    </div>    
    
  )
}

export default Modal