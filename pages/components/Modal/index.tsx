import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './../../../styles/Modal.module.css'
import ModalForm from './../ModalForm'
interface ModalProps{
    onClick:()=>void,
    formData:{
        handleSubmit:()=>void,
        buttonTitle:string,
        label:string,
        placeholder:string
    }
}
const Modal = ({onClick, formData}:ModalProps) => {  
  return (
    <div className={styles.modal}>

        <div className={styles.modal} onClick={onClick}>
        </div>
        <ModalForm formData={formData} onClick={onClick}/>
    </div>    
    
  )
}

export default Modal