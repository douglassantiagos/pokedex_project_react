import { Box, Text, Stack, Button, Image } from "@chakra-ui/react";

export function Sidebar({ handleClickCallback, onListTypeNames, selected, ...rest }) {

  return (
    <Box as='aside' w='18%' borderRightWidth={1} borderColor='gray.100'>     
      <Stack spacing='4' align='start'>
        <Button
          p='0'
          w='90%'
          bg={selected === 'All' ? 'yellow.400' : 'none'}
          _hover={{ bg: 'gray.100', color: 'black' }}
          color={selected === 'All' ? '' : 'gray.500'}
          display='flex'
          alignItems='center'
          justifyContent={selected === "All" ? 'center' : 'start'}
          borderWidth={selected === 'All' ? 3 : 0}
          borderColor='blue.500'
          boxShadow={selected === 'All' ? 'lg' : ''}
          onClick={() => handleClickCallback('All')}
          {...rest}
        >
          <Image 
            src={selected === 'All' ? '../pokebolaA.png' : '../pokebolaS.png'} 
            w={selected === 'All' ? '7' : '5'} 
            h={selected === 'All' ? '7' : '5'}  
          />
      
          <Text 
            ml={selected === 'All' ? '3' : '5'}  
            fontWeight={selected === 'All' ? 'bold' : 'hairline'}
          >              
            All
          </Text>
        </Button>  

        {onListTypeNames.map((name, index) => (
          <Button
            key={index}
            p='0'
            w='90%'
            bg={selected === name ? 'yellow.400' : 'none'}
            _hover={{ bg: 'gray.100', color: 'black' }}
            color={selected === name ? '' : 'gray.500'}
            display='flex'
            alignItems='center'
            justifyContent={selected === name ? 'center' : 'start'}
            borderWidth={selected === name ? 3 : 0}
            borderColor='blue.500'
            boxShadow={selected === name ? 'lg' : ''}
            onClick={() => handleClickCallback(name)}
            {...rest}
          >
            <Image 
              src={selected === name ? '../pokebolaA.png' : '../pokebolaS.png'} 
              w={selected === name ? '7' : '5'}
              h={selected === name ? '7' : '5'} 
              />

            <Text 
              ml={selected === name ? '3' : '5'} 
              fontWeight={selected === name ? 'bold' : 'hairline'}
            >
              {name.charAt(0).toUpperCase() + (name).slice(1)}
            </Text>
          </Button>        
        ))}
      </Stack>
    </Box>
  )
}
