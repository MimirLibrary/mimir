import React, {FC} from "react";
import StartPage from "./components/StartPage";
import {GlobalStyle} from "./GlobalStyle";

const App: FC = () => {
  return (
    <>
      <GlobalStyle/>
      <StartPage/>
    </>
  );
}

export default App;


