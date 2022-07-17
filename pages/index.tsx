import React from 'react'
import { GetStaticProps } from "next";
import { Button, Grid, Stack, Text, Flex } from "@chakra-ui/react";

import { Product } from "../product/types";
import api from "../product/api";
import Link from '../node_modules/next/link';


// Acá escribimos los tipos de props que definimos en la línea 20
// Tipo producto que va a ser un array de tipo elemento producto 
interface Props {
  products: Product[]
}

// Esta función lo que hace es recibir un valor del tipo number y va a devolver un string ya que queremos que devuelva el dato ya formateado con el peso el punto y demás
/*function parseCurrency(value: number): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
}*/

/*type Currency = 'CLP' | 'USD' | 'JPY'

type Price = {
    price: number;
    locale?: string
    currency?: Currency
}

export const currencyFormatter = ({price, locale = 'en-US', currency = 'USD' }: Price): string => {
    return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(price)
}*/


const IndexRoute: React.FC<Props> = ({ products }) => {

  // Vamos a necesitar un estado donde agreguemos todos los elementos que vamos a ir teniendo en el carrito 
  // Para estp vamos a tener un useState que se llame cart y tenga una función setcart

  const [cart, setCart] = React.useState<Product[]>([]);

  // Variable para generar un texto en base a la info del carrito
  const text = React.useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* ${product.title} - ${product.price}\n`), ``) // parseCurrency(product.price)
      .concat(`\nTotal: ${cart.reduce((total, product) => total + product.price, 0)}`) // ${parseCurrency(cart.reduce((total, product) => total + product.price, 0)
  }, [cart]);

  // (Para ver que nos trae de productos) return <div>{JSON.stringify(products)}</div>;
  return (
    <Stack spacing={6}>
      // Le decimos que por cada elemento que haya en productos vamos a mostrar un stack (componente de chakra que te permite ubicar las cosas en una horientazión vertical, horizontal y el espacio entre los elementos sin tener espacio en ellos)
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map((product) => (
          <Stack spacing={3} borderRadius="md" padding={4} backgroundColor="gray.100" key={product.id}>
            <Stack spacing={1}>
              <Text>{product.title}</Text>
              <Text fontSize="sm" fontWeight="500" color="black.500">{product.price}</Text> // parseCurrency(product.price)
            </Stack>
            <Button colorScheme="primary" variant="outline" size="sm" onClick={() => setCart((cart) => cart.concat(product))}>
              Agregar
            </Button>
          </Stack>
        ))}
      </Grid>
      {Boolean(cart.length) && (
        <Link isExternal href={`https://wa.me/5492954271140?text=${encodeURIComponent(text)}`}
          as={Link}>
          <Button
            width="100%"
            // Queda anclado en lavista mobile con bottom y positions sticky
            position="sticky"
            bottom={0}
            colorScheme="whatsapp"
          >
            Completar pedido ({cart.length} productos)
          </Button>
        </Link>

        /*<Flex bottom={0} position="sticky" alignItems="center" justifyContent="center">
         <Button
         isExternal
         as={Link}
         colorScheme="whatsapp"
         href={`https://wa.me/5492954271140?text=${encodeURIComponent(text)}`}
         width="fit-content"
         >
           Completar pedido ({cart.length} productos)
         </Button>
       </Flex>*/
      )}
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