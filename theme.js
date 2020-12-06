import { extendTheme } from '@chakra-ui/react'

const font = `
  "Inter var",
  "Helvetica Neue Light",
  "Helvetica Neue",
  Helvetica,
  Arial,
  "Lucida Grande",
  sans-serif
`

const theme = {
  config: {
    initialColorMode: 'dark'
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.900',
        fontSize: '1.25rem',
        lineHeight: '1.75'
      }
    }
  },
  fonts: {
    body: font,
    heading: font
  }
}

export default extendTheme(theme)
