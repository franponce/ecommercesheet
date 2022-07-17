// Indice de theme para cambiar de forma más fácil los estilos

import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
    colors: {
        primary: theme.colors['purple'],
    },
    // estilos globales
    styles: {
        global: {
            body: {
                // Esto viene de la styled system themes specifications de chakra
                backgroundColor: "primary.50",
            }
        }
    }
})
