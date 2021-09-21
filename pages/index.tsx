import type { NextPage } from 'next'
import type { AppProps  } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Card from './components/Card'
import Map from './components/Map'
import Modal from './components/Modal'
import CardButton from './components/CardButton'
import {  GetServerSideProps } from 'next'
interface FormData{
  handleSubmit:(value:any)=>void,
  buttonTitle:string,
  label:string,
  placeholder:string
}
interface Data{
    id:number,
    img:string,
    title:string,
    district:string,
    city:string,
    state:string,
    postalCode:string,
    favorite:boolean
}
interface HomeProps{
  data:Data[]
}
const Home = ({data}:HomeProps) => {
  const [cardData,setCardData] = useState<Data[] | []>(data)
  const [modal, setModal] = useState<boolean>(false)
  const [formData,setFormData] = useState<FormData>({handleSubmit:(value)=>{},buttonTitle:"",label:"",placeholder:""})
  const toggleModal = () =>{
    setModal(!modal)
  }
  const addImageModal = () =>{
    setFormData({handleSubmit:()=>{},buttonTitle:"Adicionar Imagem",label:"Insira a url da imagem",placeholder:"https://dominiodaimagem.com"})
    setModal(true)
  }
  const addNewCard = () =>{
    setFormData({handleSubmit:postCard,buttonTitle:"Adicionar Endereço",label:"Insira o CEP do endereço",placeholder:"00000-000"})
    setModal(true)
  }
  const postCard = (value:any) =>{
    if(value){
      console.log(value.value)
    }
  }
  return (
    <div className={styles.container}>
        <Map/>
      <main className={styles.main}>
        {modal&&<Modal formData={formData} onClick={toggleModal}/>}
        {cardData.map(data=>{
          const {img,title,district,state,city,id,postalCode,favorite} = data
          return  <Card key={id} favorite={favorite} handleAddImage={addImageModal} data={{img,title,district,city,state,postalCode}}/>
        })}
        
      </main>
      {!modal&&<CardButton onClick={addNewCard}/>}
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/cards`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: data, // will be passed to the page component as props
  }
}

export default Home
