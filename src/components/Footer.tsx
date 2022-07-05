import { HStack, Link, Text } from "@chakra-ui/react";

export function Footer() {
  return(
    <HStack bgGradient='linear(to-b, blue.500, #305AB1)' w='100%' mt='auto' minH='100' justify='center' >
      <Text color='white'>
        Pokedex Project - Developed by 
        <Link href='https://github.com/douglassantiagos' ml='1'>
          Douglas Santiago
        </Link>
      </Text>
    </HStack>
  )
}