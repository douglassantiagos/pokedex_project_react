import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { SmallCloseIcon } from '@chakra-ui/icons'
import { NavLink } from "./NavLink";

interface BoxCardProps {
  onPokemonType: () => void;
}

export function Sidebar({ onPokemonType }: BoxCardProps) {
  return (
    <Box as='aside' w='22%' borderRightWidth={1} borderColor='gray.100'>
      {onPokemonType.map(data => {
        return (
          <HStack key={data.data.name} spacing='8' align='center' mb='6'>
            <SmallCloseIcon />

            <Text fontWeight='bold' >
              {data.data.name.charAt(0).toUpperCase() + 
              (data.data.name).slice(1)}
            </Text>
          </HStack>
        )
      })}
    </Box>
  )
}