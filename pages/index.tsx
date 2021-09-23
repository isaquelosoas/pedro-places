import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Card from './components/Card'
import Map from './components/Map'
import Modal from './components/Modal'
import CardButton from './components/CardButton'
import {  GetServerSideProps } from 'next'
import Alert from '@material-ui/core/Alert';
import Collapse from '@material-ui/core/Collapse';
import { Loader } from "@googlemaps/js-api-loader"
interface FormData{
  mask?:string
  id:number
  handleSubmit:(value:any, id?:number)=>void,
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
    favorite:boolean,
    location:{
      lat:number,
      lng:number
    }
}
interface HomeProps{
  data:Data[]
}
const Home = ({data}:HomeProps) => {
  const [hidden,setHidden] = useState<boolean>(false)
  const [cardData,setCardData] = useState<Data[] | []>(data)
  const [currentLocation,setCurrentLocation] =  useState<google.maps.LatLng|google.maps.LatLngLiteral|null>(null)
  const [alert, setAlert] = useState<{status:boolean,msg:string}>({status:false,msg:""})
  const [modal, setModal] = useState<boolean>(false)
  const [formData,setFormData] = useState<FormData>({handleSubmit:()=>{}, buttonTitle:"buttonTitle",label:"label",placeholder:"placeholder",id:1})
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
  // Google Maps Platform Variables
  let map: google.maps.Map;
  let geocoder: google.maps.Geocoder
  useEffect(()=>{
    console.log(process.env.API_KEY, process.env,BASE_URL)

    const loader = new Loader({
      apiKey: process.env.API_KEY || "AIzaSyCj0Y95gv2GvRQlcmUbcLPdcStPKQ52v30",
      version: "weekly",
    });
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: currentLocation?currentLocation:{lat:-5.2021871,lng:-42.7348691},
        zoom: currentLocation?14:10,
      }); 
      const h1 = document.getElementById("title")
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(h1);
      data.map(d=>{
        const location = d.location
        new google.maps.Marker({
          position: location,
          label:d.id.toString(),
          map: map,
        }); 
      })
    });
  },[])
  function addMarker(location:google.maps.LatLng, id?:number){  
    new google.maps.Marker({
      position: location,
      label: id?id.toString():"N",
      map: map,
    }); 
    
  }
  const toggleModal = () =>{
    setModal(!modal)
  }
  const addImageModal = (id:number) =>{      
    setFormData({handleSubmit:addImage,id,buttonTitle:"Adicionar Imagem",label:"Insira a url da imagem",placeholder:"https://dominiodaimagem.com"})
    setModal(true)
  }
  const addNewCard = () =>{
    setFormData({id:0,handleSubmit:postCard,mask:"99999-999",buttonTitle:"Adicionar Endereço",label:"Insira o CEP do endereço",placeholder:"00000-000"})
    setModal(true)
  }
  const addImage = async (value:any ,id?:number) =>{
    console.log(value)
    if(value){
      const url = value.value
      const request = await axios.put(`${BASE_URL}/api/updateCard`,{id,attr:"img",value:url})
      console.log(request) 
      setCardData(request.data.data)     
      setModal(false)
    }
  }
  const zoomMap = async (location:google.maps.LatLng|google.maps.LatLngLiteral) =>{
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: currentLocation?currentLocation:{lat:-5.2021871,lng:-42.7348691},
      zoom: currentLocation?14:10,
    }); 
    const h1 = document.getElementById("title")
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(h1);
    data.map(d=>{
      const location = d.location
      new google.maps.Marker({
        position: location,
        label:d.id.toString(),
        map: map,
      }); 
    })
    console.log(location)
    map.setCenter(location)
    map.setZoom(15)
    setCurrentLocation(location)
    setHidden(true)
    
  }
  const postCard = async (value:any) =>{
    if(value){
      const jsonData = await getAddress(value.value)
      if(jsonData){
            
        console.log(jsonData)
        const request = await axios.post(`${BASE_URL}/api/postCard`,jsonData)
        setCardData(request.data.data)
        setModal(false)
        console.log(jsonData.location)
        addMarker(new google.maps.LatLng(jsonData.location),request.data.data.id)
      }
      else{
        setAlert({status:true,msg:"Não foi possível encontrar o endereço"})
        setTimeout(()=>{setAlert({status:false, msg:""})},3000)
      }
    }
  }
  const getAddress = async (value:string) => {
    try{
      const res = await axios.get(`https://viacep.com.br/ws/${value}/json`);
      const { logradouro, cep, uf, localidade, bairro } = res.data;
      const jsonData = {
        title: logradouro,
        postalCode:cep,
        state: uf,
        district: bairro,
        city: localidade,
        location:{lat:0,lng:0}
      };
      geocoder = new google.maps.Geocoder()
      const location = await geocoder.geocode( { 'address': `${logradouro} ${bairro} ${localidade}`}, function(results, status) {
        if (status == 'OK') {
         if(results){
           console.log(results)
          const {lat,lng} = results[0].geometry.location 
          const location = {lat: lat(), lng:lng()}
          console.log(location)
          return location
          
        } 
        } else {
          setAlert({status:true,msg:'Geocode was not successful for the following reason: ' + status});
          setTimeout(()=>{setAlert({status:false,msg:""})},3000)
          return false
        }
      });

      if(location){
        const {lat,lng} = location.results[0].geometry.location
        jsonData.location = {lat:lat(),lng:lng()}
        return jsonData;
      }
      else{
        return false
      }
    }
    catch(e){
      return false
      
    }
  };
  console.log(data)
  return (
    <div className={styles.container}>
        <Map hidden={hidden} setHidden={setHidden}/>
      <main className={styles.main} >
        
            <div className={styles.alertContainer}>
              <Collapse in={alert.status}>
                <Alert variant="filled" severity="error">
                  {alert.msg}
                </Alert>
              </Collapse>          
            </div>
          
        
        {modal&&<Modal handleSubmit={formData.handleSubmit} formData={formData} onClick={toggleModal}/>}
        {cardData.map(data=>{
          const {img,title,district,state,city,id,postalCode,favorite, location} = data 
          console.log(postalCode)      
          return  <Card zoomMap={zoomMap} key={id} favorite={favorite} handleAddImage={addImageModal} data={{location,id,img,title,district,city,state,postalCode}}/>
        })}
        
      </main>
      {!modal&&<CardButton onClick={addNewCard}/>}
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
  const res = await fetch(`${BASE_URL}/api/cards`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: data, 
  }
}

export default Home
