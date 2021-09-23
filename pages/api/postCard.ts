import type { NextApiRequest, NextApiResponse } from 'next'
import Cards from './cards.json'
import fs from 'fs'

type Data = {
  data:{
    id:number,
    img:string,
    title:string,
    district:string,
    city:string,
    state:string,
    postalCode:string,
    favorite:boolean
  }[]
}
let lastId = 5
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonData = req.body
  console.log(jsonData)
  jsonData.id = lastId
  Cards.data.push(jsonData)

  fs.writeFileSync('cards.json',JSON.stringify(Cards))
  lastId++
  res.status(200).json(Cards)
}