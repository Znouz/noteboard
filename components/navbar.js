import { HStack, IconButton, useColorMode} from "@chakra-ui/react"

import { SunIcon, MoonIcon } from "@chakra-ui/icons"

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <HStack w="full" p="1rem" position="fixed" justifyContent="flex-end">
            <IconButton 
              onClick={ toggleColorMode }
              bg={ "#E0D7BC"}
              _hover={{bg: "#BAB39C"}}
              boxShadow="base"
              icon={ colorMode === "light" ? <MoonIcon /> : <SunIcon /> } 
            />
        </HStack>
    )
}