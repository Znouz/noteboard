import { IconButton } from "@chakra-ui/button";
import { AddIcon } from '@chakra-ui/icons';

export default function AddButton(props) {
    

    return (
        <IconButton 
          onClick={props.handleAdd}
          boxShadow="base"
          z-index="1400" 
          bg="brand.green" 
          position={props.position} 
          right={props.right} bottom={props.bottom} 
          _active={{bg: 'brand.darkGreen'}} 
          _hover={{bg: 'brand.darkGreen'}} 
          icon={<AddIcon color="white" />}
        />
    )
}