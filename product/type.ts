// En este tipo, vamos a definir que tipo de datos nos va a venir desde nuestro Google Sheet 

// Vamos a importar una interface que se llama product y le definimos el tipo de dato que nos va a dar
export interface Product {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
}

