import { VStack, HStack, Heading, Text, Textarea, IconButton, Input, useColorModeValue, useBreakpointValue} from '@chakra-ui/react'
import { SmallCloseIcon, MinusIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion'

export default function Notecard(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingText, setIsEditingText] = useState(false);

    const cardRef = useRef(null);

    const cardColor = useColorModeValue("light.card", "dark.card");
    const textColor = useColorModeValue("", "dark.text");
    const fontSize = useBreakpointValue({base: 'small', md: 'medium'});

    const MotionVStack = motion(VStack);

    function toggleEditing() {
        setIsEditing(!isEditing);
    }
    function toggleEditingText() {
        setIsEditingText(!isEditingText);
    }

    function handleEnter(event) {
        if (event.key === 'Enter') {
            event.target.blur();
        }
    }
    const textRef = useRef(null);
    function setTextareaHeight() {
        textRef.current.style.height = ""; 
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }

    useEffect(() => {
        if (textRef.current) {
            setTextareaHeight();
        }
    }, [textRef.current])
    return (
        <MotionVStack 
            ref={cardRef}
            cursor="grab" _active={{cursor: "grabbing"}} color={textColor} position="absolute" variant="notecard" w="full" maxW="18.75rem" p="1rem" alignItems="flex-start" bg={cardColor} boxShadow="base" borderRadius="2px" 
            left={props.content.position.x + 'px'} top={props.content.position.y + 'px'} 
            drag={(!isEditing && !isEditingText)} dragConstraints={props.constraints} dragMomentum={false}
            
            onDragEnd={(event, info) => props.handleDrag(info, props.content.id, cardRef)}
        >
            <HStack w="full" justifyContent="space-between">
                { isEditing ? 
                    <Input 
                        autoFocus
                        defaultValue={props.content.heading}
                        onChange={(e) => e.target.value} onFocus={(e) => e.target.select()}
                        onBlur={(e) => {toggleEditing(); props.handleEdit({...props.content, heading: e.target.value}, props.content.id)}}
                        onKeyPress={(e) => handleEnter(e)} fontSize={['1rem', '1rem', '1.25rem']}
                        fontWeight="700" border="none" p="0" h="fit-content" type="text" lineHeight="100%"
                    /> 
                    : 
                    <Heading onDoubleClick={toggleEditing} size={fontSize} lineHeight="100%" overflowWrap="anywhere">{props.content.heading}</Heading> 
                }
                <HStack alignSelf="flex-start" spacing="0.25rem">
                    <IconButton 
                        size="xs"
                        onClick={() => props.handleCollapse(props.content.id)} 
                        variant="onlyIcon" 
                        icon={<MinusIcon boxSize="0.875em" />} 
                    />
                    <IconButton 
                        size="xs"
                        onClick={() => props.handleDelete(props.content.id)} 
                        role="group" 
                        variant="onlyIcon" 
                        icon={<SmallCloseIcon boxSize="1.25em" _groupHover={{color: 'tomato'}} />} 
                    />
                </HStack>
            </HStack>
            { isEditingText ? 
                <Textarea 
                    ref={textRef}
                    autoFocus
                    defaultValue={props.content.text}
                    onChange={(e) => e.target.value}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => {toggleEditingText(); props.handleEdit({...props.content, text: e.target.value}, props.content.id)}}
                    onKeyPress={(e) => handleEnter(e)}
                    onInput={() => setTextareaHeight()}
                    resize="none" w="full" minH="unset" fontSize={['0.875rem', '0.875rem', '1rem']} fontWeight="400" lineHeight="140%" border="none" p="0" type="text"
                /> 
                : 
                <Text as="p" onDoubleClick={toggleEditingText} display={props.content.isCollapsed ? 'none' : 'block'} size={fontSize} lineHeight="140%" overflowWrap="anywhere">{props.content.text}</Text>
            }
        </MotionVStack>
    )
}