import { Palette } from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createTheme" {
  //   interface Theme {
  //   }
  //   interface ThemeOptions {
  //   }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    nav: Palette["primary"];
  }
  interface PaletteOptions {
    nav: PaletteOptions["primary"];
  }
}
