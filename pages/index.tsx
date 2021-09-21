import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Card from './components/Card'
import Map from './components/Map'
import Modal from './components/Modal'
import CardButton from './components/CardButton'
interface FormData{
  handleSubmit:()=>void,
  buttonTitle:string,
  label:string,
  placeholder:string
}
const Home: NextPage = () => {
  const [modal, setModal] = useState<boolean>(true)
  const [formData,setFormData] = useState<FormData>({handleSubmit:()=>{},buttonTitle:"",label:"",placeholder:""})
  const toggleModal = () =>{
    setModal(!modal)
  }
  const addImageModal = () =>{
    setFormData({handleSubmit:()=>{},buttonTitle:"Adicionar Imagem",label:"Insira a url da imagem",placeholder:"https://dominiodaimagem.com"})
    setModal(true)
  }
  const addNewCard = () =>{
    setFormData({handleSubmit:()=>{},buttonTitle:"Adicionar Endereço",label:"Insira o CEP do endereço",placeholder:"00000-000"})
    setModal(true)
  }
  return (
    <div className={styles.container}>      
        <Map/>      
      <main className={styles.main}>
        {modal&&<Modal formData={formData} onClick={toggleModal}/>}
        <Card handleAddImage={addImageModal} data={{img:"https://placeimg.com/250/450",title:"Rua Doutor Manoel Ayres Neto",district:"Parque Sul",city:"Teresina",state:"PI",postalCode:"64036-410"}}/>  
        <Card handleAddImage={addImageModal} data={{img:"https://placeimg.com/500/450",title:"Quadra J Bloco 17",district:"Pedra Miúda",city:"Teresina",state:"PI",postalCode:"64036-410"}}/>  
        <Card handleAddImage={addImageModal} data={{img:"https://placeimg.com/1000/250",title:"Rua Barcarena",district:"Esplanada",city:"Teresina",state:"PI",postalCode:"64036-410"}}/>  
        <Card handleAddImage={addImageModal} data={{img:"",title:"Alberto Saddi",district:"Liberdade",city:"Rondonópolis",state:"MT",postalCode:"64036-410"}}/>        
      </main>
      {!modal&&<CardButton onClick={addNewCard}/>}
    </div>
  )
}

export default Home
