import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        brand: {
            green: '#00C67D',
            darkGreen: '#019060'
        },
        light: {
            bg: '#F5F5EB',
            card: '#fff',
        },
        dark: {
            bg: '#1F1F1E',
            card: '#F4EDE4'
        }
    },
    styles: {
        global: {
            body: {
                bg: 'light.bg',
                overflow: 'hidden'
            }
        }
    },
    components: {
        VStack: {
            variants: {
            }
        },
        Heading: {
            sizes: {
                'small': {
                    fontSize: '16px',
                },
                'medium': {
                    fontSize: '20px',
                }
            }
        },
        Text: {
            sizes: {
                'small': {
                    fontSize: '14px',
                },
                'medium': {
                    fontSize: '16px',
                }
            }
        },
        IconButton: {
            variants: {
                'onlyIcon': {
                    bg: 'transparent',
                }
            },
            
        },
        Button: {
            baseStyle: {
                _focus: {
                    ring: 0
                },
                _focusVisible: {
                    ring: 2
                }
            }
        },
    }
});

export default theme;