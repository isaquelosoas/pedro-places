import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from './components/Card'
import Map from './components/Map'

const Home: NextPage = () => {
  return (
    <>
      <header>
        <Map/>
      </header>
      <main>
        <Card/>  
      </main>
    </>
  )
}

export default Home
