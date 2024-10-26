import { Route, Routes, BrowserRouter, Router } from "react-router-dom";
import HomePage from "./page/user/homepage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
