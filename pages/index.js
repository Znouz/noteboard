import Head from 'next/head'
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import Notecard from '../components/notecard'
import AddButton from '../components/addButton'

import { clamp } from 'popmotion'

export default function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem('cards'));
    setCards(temp !== null ? temp : []);
    
  }, []);
  useEffect(() => {
      localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  function handleAdd() {
    setCards([...cards, { position: {x: 8, y: 80}, heading: "Heading" + (cards.length + 1), text: "Double click to start editing!", isCollapsed: false, id: Date.now()}])
  }

  function handleEdit(editedCard, id) {
    if (editedCard.heading.length < 1 || editedCard.text.length < 1) {
      return;
    }
    setCards(cards.map((card) => {
      if (card.id === id) {
        return editedCard;
      }
      return card;
    }));
  }

  function handleDelete(id) {
    setCards(cards.filter((card) => card.id != id))
  }

  function handleCollapse(collapsedCard) {
    setCards(cards.map((card) => {
      if (card.id === collapsedCard) {
        return { 
          ...card, isCollapsed: !card.isCollapsed
        }
      }
      return card;
    }))
  }

  function handleDrag(info, draggedCard, cardRef) {
    setCards(cards.map((card) => {
      if (card.id === draggedCard) {
        
        return { 
          ...card, position: {
            x: clamp(0, window.innerWidth - cardRef.current.offsetWidth, card.position.x + info.offset.x), 
            y: clamp(0, window.innerHeight - cardRef.current.offsetHeight, card.position.y + info.offset.y)
          }
        }
      }
      return card;
    }));
  }
  
  const constraints = useRef(null);
  const bgColor = useColorModeValue("light.bg", "dark.bg");
  return (
    <>
      <Head>
        <title>Noteboard</title>
      </Head>
      <Flex ref={constraints} h="100vh" w="full" bg={bgColor}>
        {cards.length > 0 ? 
          cards.map((card, i) => <Notecard constraints={constraints} handleEdit={handleEdit} handleDelete={handleDelete} handleCollapse={handleCollapse} handleDrag={handleDrag} key={card.id} index={i} id={card.id} content={card}/>) 
          : 
          <Heading as="h1" margin="auto" textAlign="center" fontWeight="400">Press the + button to add a note!</Heading>
        }
        <AddButton handleAdd={handleAdd} position="absolute" right="1rem" bottom="1rem"/>
      </Flex>
    </>
  )
}
