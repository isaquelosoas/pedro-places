import type { NextApiRequest, NextApiResponse } from 'next'
import Cards from './cards.json'
import fs from 'fs'
interface BodyData{
    id:number,
    attr:"img",
    value:string
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id, attr, value}:BodyData = req.body
  const card = Cards.data.find(c=>c.id===id)
  if(card){
    card[attr] = value      
    fs.writeFileSync('cards.json',JSON.stringify(Cards))
    res.status(200).json(Cards)    
  }
  else{
    res.status(204).json({error:"No Content"})
  }
}