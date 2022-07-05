import { Flex, FormLabel, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'

interface SearchInputProps {
  onHandleSubmit: (props) => void;
  onHandleChange: (props) => void;
}

export function SearchInput({ onHandleSubmit, onHandleChange }: SearchInputProps) {
  return (
    <Flex bg='gray.100' w='100%'>
      <Flex justify='space-between' align='center' w='100%' maxWidth={1230} mx='auto' p='6'>
        <Text fontSize='2xl' fontWeight='bold'>
          Select your pokémon
        </Text>

        <form onSubmit={onHandleSubmit}>
          <Flex bg='white' p='2' borderRadius='full' border='none' align='center'>
            <Input
              type="text"
              placeholder='Search name or id'
              bg='white'
              border='none'  
              w='50vh'     
              focusBorderColor='none'
              onChange={onHandleChange}
            />        

            <SearchIcon color='blue.300' w={5} h={5} style={{ marginRight: 10 }}   />
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}