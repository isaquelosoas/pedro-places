import type { NextApiRequest, NextApiResponse } from 'next'
import Cards from './cards.json'

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(req)
  res.status(200).json(Cards)
}