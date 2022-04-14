import React, {FC} from "react";
import StartPage from "./pages/StartPage";
import {GlobalStyle} from "./GlobalStyle";
import Sidebar from "./components/Sidebar";
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import HistoryOfClaimPage from "./pages/HistoryOfClaimPage";
import HistoryOfDonatePage from "./pages/HistoryOfDonatePage";
import SettingsPage from "./pages/SettingsPage";
import SearchPage from "./pages/SearchPage";
import {useAuth} from "./hooks/useAuth";

const App: FC = () => {
  const {isAuth} = useAuth()
  return (
    <>
      <GlobalStyle/>
      {
        isAuth ? <>
            <Sidebar/>
            <div>
              <Routes>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/search' element={<SearchPage/>}/>
                <Route path='/history-of-claim' element={<HistoryOfClaimPage/>}/>
                <Route path='/history-of-donate' element={<HistoryOfDonatePage/>}/>
                <Route path='/settings' element={<SettingsPage/>}/>
                <Route path='*' element={<HomePage/>}></Route>
              </Routes>
            </div>
          </>
          :
          <Routes>
            <Route path='/login' element={<StartPage/>}/>
            <Route path='*' element={<StartPage/>}></Route>
          </Routes>
      }
    </>
  );
}

export default App;


