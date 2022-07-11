import { useEffect, useState } from 'react';
import { Flex, Stack, Text, HStack } from '@chakra-ui/react';
import { motion } from "framer-motion"
import { typeColors } from '../utils/typeColors';
import { formattedID } from '../utils/formattedID';

export type ColorsData = {
  primary: string;
}

export default function Modal({ data, onType }) { 
  const [colors, setColors] = useState<ColorsData>({} as ColorsData)

  async function getTypesNameData() {      
    const promisesTypesData = await data.types.map((item) => item.type.name); 

    const typesData = await Promise.all(promisesTypesData);    
    
    setColors(typeColors(typesData))
  }
  
  useEffect(() => {  
    getTypesNameData();

  }, [])

  return (
    <>      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: "auto" }}
        className="overlay"
      >
      </motion.div>

      <div className="card-content-container open">
        <motion.div className="card-content" layoutId={`card-container-${data.id}`}>
          <Stack bg='white'>
            <motion.div
              className="card-image-container"
              layoutId={`card-image-container-${data.id}`}
            >
              <Flex
                bg={colors.primary} 
                bgImage="./pokeballBg.svg"
                bgPosition='left'
                bgRepeat='no-repeat'
                bgSize='contain'
                w="50%"
                h='39%'
                align='center'
                pt='20'               
              >
                <img className="card-image" src={data.image} alt="ImagePokemon" />
              </Flex>
            </motion.div>

            <motion.div
              className="title-container"
              layoutId={`title-container-${data.id}`}
            >
              <HStack>
                <Text fontSize='3xl' fontWeight='bold' >
                  {data.name.charAt(0).toUpperCase() + 
                  (data.name).slice(1)}
                </Text>
                <Text>{formattedID(data.id)}</Text>
              </HStack>
              <HStack mt='1'>
                <Text fontSize='sm' color='white' bg='whiteAlpha.300' fontWeight='normal' borderRadius='20' p='1' px='4'>
                  {onType[0]}
                </Text>
                {onType[1] === undefined ? null :
                <Text fontSize='sm' color='white' fontWeight='normal' ml='1' bg={onType[1] === 'undefined' ? null : 'whiteAlpha.300'} w='auto' borderRadius='20' p='1' px='4'>   
                  {(onType[1] + " ").charAt(0).toUpperCase() + 
                  (onType[1] + " ").slice(1)}         
                </Text>            
              }
              </HStack>
              <Text fontSize='sm' color='white' mt='5'>Height</Text>
              <Text fontWeight='bold' fontSize='md'>{data.height}m</Text>

              <Text fontSize='sm' color='white' mt='2'>Weight</Text>
              <Text fontWeight='bold' fontSize='md'>{data.weight}kg</Text>

              <Text fontSize='sm' color='white' mt='2'>Abilities</Text>
              <Text fontWeight='bold' fontSize='md'>XXX</Text>

              <Text fontSize='sm' color='white' mt='2'>Weakness</Text>
              <Text fontWeight='bold' fontSize='md'>XXX</Text>
            </motion.div>

            <motion.div className="content-container" animate>
              <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed similique alias rem, suscipit quas ex quisquam non voluptas eaque sequi tempore modi odit eveniet recusandae voluptate optio exercitationem cum numquam!</Text>
            </motion.div>
          </Stack>
        </motion.div>
      </div>
    </>    
  )
}