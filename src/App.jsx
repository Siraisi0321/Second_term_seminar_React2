import { useState } from "react";
import axios from "axios";
import Title from "./components/Title.jsx";
import Form from "./components/Form.jsx";
import Results from "./components/Results.jsx";
import Foot from "./components/Foot.jsx"; 
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [photo, setPhoto] = useState([]);

  const getPhotData = (e) => { 
    e.preventDefault();
    
  if (!word.trim()) {
    alert("検索キーワードを入力してください。");
    return;
  }

    axios
    .get(`https://api.unsplash.com/search/photos?query=${word}&client_id=8DnDrRE1szXcnCxiOY8ciV-MHmIq_sMe0Az73K4Ntow`)
    .then((res) => { console.log(res.data.results);setPhoto(res.data.results);})
    .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <Title />
      <Form setWord={setWord} getPhotoData={getPhotData} />
      <Results photo={photo} />
      <Foot />
    </div>
  );
}

export default App;