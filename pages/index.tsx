import React from 'react'
import {GetStaticProps} from "next";
import {Product} from "../product/types";
import api from "../product/api";

// Acá escribimos los tipos de props que definimos en la línea 20
// Tipo producto que va a ser un array de tipo elemento producto 
interface Props {
  products: Product[]
}

const IndexRoute: React.FC<Props> = () => {
  return <div>{`<IndexRoute />`}</div>;
};

// Empezamos trayendonos los datos desde Google Sheets 
// ¿Cómo interactuamos con estos datos?
// Para traernos estos datos en next tenemos un ambiente, que es el del server, en el que podemos interactuar o manejar data sin ejecutar muchas acciones, toda esa información se ejecuta en el server 
// Ejemplo: parsear el .CSV que nos vamos a traer desde Google Sheet 
// ¿Cómo hacemos para traernos esa información?
// Para el caso de nextjs lo que tenemos que hacer es definir un método que se llama getStaticProps

// Exportamos una variable 
export const getStaticProps: GetStaticProps = async () => {
  // Va a ser una función async 
  const products = await api.list();

  return {
    // que devuelva props productos siendo un array vacio
    props: {
      // Ahora nos vamos a traer los datos de la API de Google Sheet
      // El primer paso es traernos el Google Sheet en formato .CSV
      // El segundo paso es instalar alguna libreria que nos permita hacer una request desde nuestra aplicación next hacia otro lado (lo vamos a hacer con Axios) // Vamos a usar la libreria de papaparse.com que nos permite parsear .CSV <> JSON 
      products,
    },
  };
};

// Ahora ya sabemos que nuestro componente index va a recibir productos


export default IndexRoute;