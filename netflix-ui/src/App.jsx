import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import MyList from "./pages/MyList";
import Netflix from "./pages/Netflix";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={<Netflix/>}/>
      <Route path="/movies" element={<Movies/>}/>
      <Route path="/tv" element={<TVShows/>}/>
      <Route path="/mylist" element={<MyList/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
