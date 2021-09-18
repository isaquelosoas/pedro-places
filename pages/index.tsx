import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from './components/Card'
import Map from './components/Map'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      
        <Map/>
      
      <main className={styles.main}>
        <Card data={{img:"https://placeimg.com/250/450",title:"Rua Doutor Manoel Ayres Neto",district:"Parque Sul",city:"Teresina",state:"PI",postalCode:"64036-410"}}/>  
        <Card data={{img:"https://placeimg.com/500/450",title:"Quadra J Bloco 17",district:"Pedra Miúda",city:"Teresina",state:"PI",postalCode:"64036-410"}}/>  
        <Card data={{img:"https://placeimg.com/1000/250",title:"Rua Barcarena",district:"Esplanada",city:"Teresina",state:"PI",postalCode:"64036-410"}}/>  
        <Card data={{img:"",title:"Alberto Saddi",district:"Liberdade",city:"Rondonópolis",state:"MT",postalCode:"64036-410"}}/>  
          
      </main>
    </div>
  )
}

export default Home
