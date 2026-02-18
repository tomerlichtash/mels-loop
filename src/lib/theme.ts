import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "var(--ml-font-latin)",
  fontFamilyMonospace: "var(--ml-font-mono)",
  headings: {
    fontFamily: "var(--ml-font-latin)",
    fontWeight: "500",
  },
  colors: {
    blue: [
      "#e7f1ff",
      "#c4d9f7",
      "#9dbfef",
      "#6fa3e6",
      "#3770c5",
      "#274f8c",
      "#1a355f",
      "#122647",
      "#0b1830",
      "#040b1a",
    ],
    pink: [
      "#ffe7ed",
      "#ffc4d4",
      "#ffa0bb",
      "#fd658a",
      "#f178b6",
      "#bd5e91",
      "#9a4d77",
      "#783d5e",
      "#572d46",
      "#371d2f",
    ],
  },
});
