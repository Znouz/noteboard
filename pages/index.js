import Head from 'next/head'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import { useRef, useState } from 'react'

import Notecard from '../components/notecard'
import AddButton from '../components/addButton'

export default function Home() {
  const [entries, setEntries] = useState(["Wash your toes then fingers then *****", "Heading2", "Heading3", "Heading4"]);
  const bgColor = useColorModeValue("light.bg", "dark.bg");

  function handleAdd() {
    setEntries([...entries, "Heading" + (entries.length + 1)])
  }

  function handleEdit(value, id) {
    if (value.length < 1) {
      return;
    }
    setEntries(entries.map((entry, i) => {
      if (i === id) {
        return value;
      }
      return entry;
    }));
  }

  function handleDelete(id) {
    setEntries(entries.filter((entry, i) => i != id))
    console.log("delete")
  }

  const constraints = useRef(null);
  return (
    <>
      <Head>
        <title>Noteboard</title>
      </Head>
      <Flex ref={constraints} h="100vh" w="full" justifyContent="center" alignItems="center" bg={bgColor}>
        {entries.map((entry, i) => <Notecard handleEdit={handleEdit} handleDelete={handleDelete} id={i} key={i} content={entry}/>)}
        <AddButton handleAdd={handleAdd} position="absolute" right="1rem" bottom="1rem"/>
      </Flex>
      
    </>
  )
}
