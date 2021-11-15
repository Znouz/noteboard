import { VStack, HStack, Heading, Text, IconButton, Input, useColorModeValue, useBreakpointValue} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion'

export default function Notecard(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const cardColor = useColorModeValue("light.card", "dark.card");
    const fontSize = useBreakpointValue({base: 'small', md: 'medium'});

    const MotionVStack = motion(VStack);

    function collapse() {
        setIsOpen(!isOpen);
    }

    function toggleEditing() {
        setIsEditing(!isEditing);
    }

    function handleEnter(event, value) {
        if (event.key === 'Enter') {
            event.target.blur();
        }
    }

    return (
        <MotionVStack variant="notecard" maxW="18.75rem" p="1rem" alignItems="flex-start" bg={cardColor} boxShadow="md" borderRadius="2px" drag dragConstraints={props.constraints} dragMomentum={false}>
            <HStack w="full" justifyContent="space-between">
                { isEditing ? 
                    <Input autoFocus defaultValue={props.content} onChange={(e) => e.target.value} onFocus={(e) => e.target.select()} onBlur={(e) => {toggleEditing(); props.handleEdit(e.target.value, props.id)}} onKeyPress={(e) => handleEnter(e, e.target.value)} fontSize={['1rem', '1rem', '1.25rem']} fontWeight="700" border="none" p="0" w="fit-content" type="text" /> 
                    : 
                    <Heading onDoubleClick={toggleEditing} size={fontSize}>{props.content}</Heading> 
                }
                <IconButton onClick={() => props.handleDelete(props.id)} role="group" variant="onlyIcon" icon={<SmallCloseIcon boxSize="1.25em" _groupHover={{color: 'tomato'}} />} />
            </HStack>
            <Text as="p" display={isOpen ? 'block' : 'none'}   size={fontSize}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus in ex sed commodo. Phasellus luctus blandit finibus. In tristique leo sit amet velit pretium, eu congue nisl egestas.</Text>
        </MotionVStack>
    )
}