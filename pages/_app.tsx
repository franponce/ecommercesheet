import React from 'react';
import { ChakraProvider, Divider, Box, Heading, Text, Image, Container, VStack } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import theme from "../theme";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
      <Container borderRadius="sm" backgroundColor="white" boxShadow="md" maxWidth="container.xl" padding={4}>
        <VStack marginBottom={6}>
          // En src poner link a una imagen 
          <Image borderRadius={9999} src=""></Image>
          <Heading>EcommerceSheets</Heading>
          <Text>El Ecommerce de Fran es un Sheets</Text>
        </VStack>
        <Divider marginY={6}/>
        <Component {...pageProps} />
      </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
