import './App.css';
import {useState} from 'react';

const getImages = async query => {
  const url =  'https://sless-api.tithi-karla.workers.dev';
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({query}), // {'query': query}
    headers: { 'Content-type': 'Application/json'}
  });
  return resp.json();
}

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const updateQuery = evt => setQuery(evt.target.value);
  const search = async () => {
    console.log(`searching for ${query}`);
    const results = await getImages(query);
    setImages(results);
  }

  return (
    <div className="App">
      <div className = "form">
        <input id='query' type='text' onChange={updateQuery} placeholder='Search query' />
        <button onClick={search}>Search</button>
      </div>
      {images.map(image => (
        <a key={image.id} href={image.link} target="_blank" rel="noreferrer">
          <img src={image.image} alt={query}/>
        </a>
      ))}
    </div>
  );
}

export default App;
