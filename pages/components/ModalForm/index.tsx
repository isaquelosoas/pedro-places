import { useRef, useState } from 'react'
import styles from './../../../styles/ModalForm.module.css'
import {Close} from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputMask from "react-input-mask";
interface ModalFormProps{
  onClick:()=>void
  handleSubmit?:(value:string, id?:number)=>void,
  formData:{
    mask?:string,
    id?:number,
    buttonTitle:string,
    label:string,
    placeholder:string
  }
}
const  ModalForm = ({handleSubmit,onClick,formData}:ModalFormProps) => {  
  const [loading, setLoading] = useState<boolean>(false)
  const input = useRef(null)
  const { buttonTitle,mask, label, placeholder, id} = formData
  const submit = async ()=>{
    setLoading(true)
    handleSubmit&&await handleSubmit(input.current?input.current:"",id?id:undefined) //Post Card or Add Image function on index
    setLoading(false)
  }
  return (
    <form onSubmit={(e)=>{e.preventDefault;submit()}} className={styles.modalForm} onClick={(e)=>{e.preventDefault()}}>
      <div className={styles.closeButton}>
        <button type="button" onClick={onClick}>
          <Close sx={{fontSize:30}}/>
        </button>
      </div>
      <fieldset>
        <label htmlFor="image">{label}</label>
        <InputMask ref={input} mask={mask?mask:""} type="text" placeholder={placeholder}/>
      </fieldset>
      <button disabled={loading} className={styles.submitButton} onClick={submit}>{loading?<CircularProgress size={20} color="inherit"/>:buttonTitle}</button>
    </form>
  )
}

export default ModalForm