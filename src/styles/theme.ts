import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Card } from "./components/Card/Card";
import { CardBody } from "./components/Card/CardBody";
import { Button } from "./components/Button/Button";


const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme(config, {
  components: {
    Button,
    Card,
    CardBody
  },

  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#797D9A",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
      "10": "#f6f6f8"
    },
    lime: {
      "500": "#d4f5e3",
    },
    littlePink: {
      "500": "#f5d4d4",
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
      }
    }
  }
})
