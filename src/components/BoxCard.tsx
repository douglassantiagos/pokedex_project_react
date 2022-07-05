import { Flex, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { formattedID } from "../utils/formattedID";

interface BoxCardProps {
  onPokemonData: () => void;
}

export function BoxCard({ onPokemonData }: BoxCardProps) {
  return (
    <>
      {onPokemonData.map((data) => {
        return (
          <button>
            <Stack key={data.data.id} direction='column' minW='250' minH='280' bg='yellow.400' borderRadius='16' p='2' >
              <HStack justify='space-between'>
                <Text fontSize='sm' color='white' fontWeight='normal' bg='whiteAlpha.300' w='auto' borderRadius='20' p='1' pl='4' pr='4' >
                  {data.data.types.map(item => {
                    return (
                      <span key={item.type.name}>
                        {(item.type.name + " ").charAt(0).toUpperCase() + 
                        (item.type.name + " ").slice(1)}
                      </span>
                    )})
                  }
                </Text>
                <Text textAlign='start' pr='2' fontSize='smaller' fontWeight='medium'>{formattedID(data.data.id)}</Text>
              </HStack>
              
              <Flex
                m='auto' 
                w='200' 
                h='180' 
                justifyContent='center' 
                bgImage="./pokeballBg.svg" 
                bgRepeat='no-repeat' 
                bgPosition='center'
                bgSize='cover'
              >
                <Image 
                  src={data.data.sprites.other["official-artwork"].front_default} 
                  maxW='80%' maxH='170' p='2' mt='2' justifyContent='center'
                />
              </Flex>

              <Flex direction='column' align='center' bg='whiteAlpha.300' p='5' boxShadow='md' borderRadius='10' >
                <Text fontWeight='bold'>{data.data.name.charAt(0).toUpperCase() + (data.data.name + " ").slice(1)}</Text>
              </Flex> 
            </Stack>
          </button>
        )
      })}    
    </>
  )
}