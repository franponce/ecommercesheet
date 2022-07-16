import React from 'react'
import { GetStaticProps } from "next";
import { Button, Grid, Stack, Text } from "@chakra-ui/react";

import { Product } from "../product/types";
import api from "../product/api";


// Acá escribimos los tipos de props que definimos en la línea 20
// Tipo producto que va a ser un array de tipo elemento producto 
interface Props {
  products: Product[]
}

const IndexRoute: React.FC<Props> = ({ products }) => {

  // Vamos a necesitar un estado donde agreguemos todos los elementos que vamos a ir teniendo en el carrito 
  // Para estp vamos a tener un useState que se llame cart y tenga una función setcart

  const [cart, setCart] = React.useState<Product[]>([]);

  function handleAddToCart(product: Product) {
    setCart((cart => cart.concat(product))
  }

  // (Para ver que nos trae de productos) return <div>{JSON.stringify(products)}</div>;
  return (
    <Stack>
      // Le decimos que por cada elemento que haya en productos vamos a mostrar un stack (componente de chakra que te permite ubicar las cosas en una horientazión vertical, horizontal y el espacio entre los elementos sin tener espacio en ellos)
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map((product) => (
          <Stack backgroundColor="gray.100" key={product.id}>
            <Text>{product.title}</Text>
            <Text>{product.price}</Text>
            <Button onClick={ () => handleAddToCart(product)} colorScheme="blue">Agregar</Button>
          </Stack>
        ))}
      </Grid>
      {Boolean(cart.length) && <Button>Completar pedido ({cart.length} productos)</Button>}
    </Stack>
  );
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
    // A getStaticProps le pasamos una prop que se llama revalidate y le pasamos una cantidad de segundos. A los x segundos van a ver la información cacheada del primer usuario que entro y después de los 10 el próximo que entra va a ver la info vieja pero va a triggerear un requet que va a ir hasta Google Sheet, va a traer la información, la va a parser y el próximo usuario lo va a ver actualizado
    // Con este parametro podemos manipular cuantas veces nuestra aplicación va a ir al servidor. Esto permite ahorrar mucho en costo (SE DEJA COMENTADO)
    // revalidate: 10
  };
};

// Ahora ya sabemos que nuestro componente index va a recibir productos


export default IndexRoute;