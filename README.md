This webapp was developed to save address cards passing the Brazilian postal code and display them on the map. For this application we used [ViaCEP API](https://viacep.com.br/) for zip code search and [Google Maps Platform](https://cloud.google.com/maps-platform) for map display and geocoding  
## Getting Started

First, clone this repository and then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Google Maps Integration
It's important to provide a Google Maps API Key. To do this, create a .env file and add API_KEY={YOUR API KEY} 

The app is an easy to use single-page application:

## Adding a new address

To add a new address click on right-bottom button '+'.
It will display a modal with the cep input. The CEP mask is 00000-000, please make sure to insert a valid and well formatted CEP then click "Adicionar Endereço"

## Adding image to address

To add a new image to address, the address must not have another image. If it's the case, click "Add Photo" button.
It will display a modal with URL input. Copy and paste the image URL then click "Adicionar Foto"

## Adding address to favorite

To add an address to favorite, click the star button. It must change card color to yellow and center the map on selected place

## Centering map

To center the map on a specific address click "Ver no Mapa" button 

## Contribute

You can check out [pedro-places repository](https://github.com/isaquelosoas/pedro-places) - your feedback and contributions are welcome!


