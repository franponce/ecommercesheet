import { execSync } from 'child_process';
import React from 'react'

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
// Ejemplo: parsear el CSV que nos vamos a traer desde Google Sheet 
// ¿Cómo hacemos para traernos esa información?
// Para el caso de nextjs lo que tenemos que hacer es definir un método que se llama getStaticProps

// Exportamos una variable 
export const getStaticProps: GetStaticProps = async () => {
  // Va a ser una función async 
  return {
    // que devuelva props productos siendo un array vacio
    props: {
      products: [],
    },
  };
};

// Ahora ya sabemos que nuestro componente index va a recibir productos


export default IndexRoute;