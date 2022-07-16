// Así como creamos un archivo de types, creamos un archivo de api

// Acá vamos a guardar un método con objetos que nos permite interactuar con nuestros datos 

// Importamos Axios 

import axios from "axios";
import Papa from "papaparse";

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
        ).then((response => {
            // Papaparse no funciona con promise, lo que es medio una cagada si queremos que nuestro método list funcione con promise

            // Lo que vamos hacer es usar el constructor de promise, dónde le decimos que devuelve una promesa que es un array de productos 
            return new Promise<Product[]>((resolve, reject) => {
                Papa.parse(response.data, {
                    // Le pasamos un objeto como parametro header true que lo que hace es indicarle a papa parse que el primer elemento de nuestro array son los headers de la tabla, con eso nos arma el JSON correctamente 
                    header: true,
                    // Y segundo le vamos a pasar una propiedad complete que es una función que tiene los resultados de parsear los objetos en un formato podemos decir rari
                    complete: (results) => {
                        return resolve(results.data as Product[]);
                    },
                    error: (error) => {
                        return reject(error.message);
                    },
            });
        });
    },
};