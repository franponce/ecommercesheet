// Así como creamos un archivo de types, creamos un archivo de api

// Acá vamos a guardar un método con objetos que nos permite interactuar con nuestros datos 

// Importamos Axios 

import axios from "axios";

export default {
    // Hacemos un método que se llame list, que nos va a traer una lista de productos
    // Le vamos a decir que nos devuelva una promesa con un array de productos 

    // Lo hacemos async para que entienda que es una promesa
    list: async (): Promise<Product[]> => {
        return axios.get(
            `https://docs.google.com/spreadsheets/d/e/2PACX-1vRm2aT8iwz6iMY4UXndtWWgbTrsZyDzfCuYRRgbIddF7UvBxJqeWmv-DCFh-OVH0DsrpeJ4RMOF3l5f/pub?gid=0&single=true&output=csv`,
            {
                responseType: 'blob'
            }
        ).then(response => {
            console.log(response.data);

            return response.data;
        });
    },
};