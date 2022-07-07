import { Box, VStack, Text, Stack, Flex, Button, Image } from "@chakra-ui/react";
import { SmallCloseIcon } from '@chakra-ui/icons'

export function Sidebar({ handleClickCallback, onListTypeNames, ...rest }) {

  return (
    <Box as='aside' w='18%' borderRightWidth={1} borderColor='gray.100'>     
      <Stack spacing='4' align='start'>
        <Button
          onClick={() => handleClickCallback('All')}
          style={{ 
            display: 'flex',
            alignItems: 'center',
          }}
          bg='none'
          p='0'
          _hover={{ color: 'blue.500'}}
          _active={{ color: 'orange.400'}}
          {...rest}
        >
          <Image src='../pokebolaS.png' w='5' h='5' />
      
          <Text ml='5'>All</Text>
        </Button>      
        {onListTypeNames.map((name, index) => (
          <Button
            key={index}
            onClick={() => handleClickCallback(name)}
            style={{ 
              display: 'flex',
              alignItems: 'center',
            }}
            bg='none'
            p='0'
            _hover={{ color: 'blue.400'}}
            {...rest}
          >
            <Image src='../pokebolaP.png' w='5' h='5' />
        
            <Text ml='5'>
              {name.charAt(0).toUpperCase() + (name).slice(1)}
            </Text>
          </Button>        
        ))}
      </Stack>
    </Box>
  )
}
