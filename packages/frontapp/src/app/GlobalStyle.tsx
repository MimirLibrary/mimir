import React, {FC} from "react";
import {css, Global} from "@emotion/react";

export const GlobalStyle: FC = () => (
  <Global
    styles={css`
      body {
        margin: 0 auto;
        max-width: 1440px;
        box-sizing: border-box;
      }
    `}
  />
)

