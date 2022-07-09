import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, } from '@chakra-ui/react'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalDetailsPokemons({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque architecto aspernatur minima consequuntur autem. Laborum ad necessitatibus, quae nesciunt repudiandae consequuntur, magnam suscipit non consectetur numquam, sunt ab impedit doloremque.</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}