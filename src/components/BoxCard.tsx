import { Box, Flex, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { formattedID } from "../utils/formattedID";

export function BoxCard({ onPokemonData }) {
  return (
    <>
      {onPokemonData.map((pokemon, index) => {
        return (
          // <button>
            <Stack key={index} direction='column' minW='290' minH='300' bg='yellow.400' borderRadius='16' p='2' shadow='md'>
              <HStack justify='space-between'>
                <Text fontSize='sm' color='white' fontWeight='normal' bg='whiteAlpha.300' w='auto' borderRadius='20' p='1' pl='4' pr='4' >
                  {pokemon.types.map(item => {
                    return (
                      <span key={item.type.name}>
                        {(item.type.name + " ").charAt(0).toUpperCase() + 
                        (item.type.name + " ").slice(1)}
                      </span>
                    )})
                  }
                </Text>
                <Text textAlign='start' pr='2' fontSize='smaller' fontWeight='medium'>{formattedID(pokemon.id)}</Text>
              </HStack>
              
              <Flex
                m='auto' 
                w='200' 
                h='200' 
                justifyContent='center' 
                bgImage="./pokeballBg.svg" 
                bgPosition='center'
                bgRepeat='no-repeat'
                bgSize='cover'
              >
                <Image 
                  src={pokemon.image} 
                  maxW='70%' maxH='170' p='2' mt='2' justifyContent='center'
                />
              </Flex>

              <Flex direction='column' align='center' bg='whiteAlpha.300' p='5' boxShadow='md' borderRadius='10' >
                <Text fontWeight='bold'>
                  {pokemon.name.charAt(0).toUpperCase() + 
                  (pokemon.name).slice(1)}
                </Text>
              </Flex> 
            </Stack>
          // </button>
        )
      })}    
    </>
  )
}