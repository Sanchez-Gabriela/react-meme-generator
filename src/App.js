import React, { useState, useEffect } from 'react';

function App() {
  const [meme, setMeme] = useState('https://memegen.link/afraid');
  const [firstLine, setFirstLine] = useState('Gaby');
  const [secondLine, setSecondLine] = useState('c`mon');
  const [allMemes, setAllMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState('https://memegen.link/afraid');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMeme(`${currentMeme}/${firstLine}/${secondLine}.jpg`);
  };

  //Only Style
  const styleHeader = {
    backgroundColor: '#F18AE6',
    color: '#F6F2F6',
    textAlign: 'center',
    height: '100px',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  const styleLabel = {
    fontWeight: 'bold',
    marginRight: '20px',
  };

  const styleButton = {
    display: 'inline-block',
    padding: '0.35em 1.2em',
    border: '0.1em solid #FFFFFF',
    margin: '0 0.3em 0.3em 0',
    borderRadius: '0.12em',
    boxSizing: 'border-box',
    textDecoration: 'none',
    fontFamily: 'Impact, Charcoal, sans-serif',
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
  };

  const inputField = {
    border: '3px solid #555',
  };

  // fetching images

  useEffect(() => {
    fetch('https://memegen.link/api/templates/', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        const imgData = Object.values(data);
        setAllMemes(imgData);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(allMemes);

  return (
    <>
      <div className="App" style={styleHeader}>
        <header className="App-header">
          <h1
            style={{
              letterSpacing: '2px',
              fontFamily: 'Impact, Charcoal, sans-serif',
              fontSize: '40px',
              border: '#f8c291 5px solid',
            }}
          >
            Meme Generator
          </h1>
        </header>
      </div>
      <div style={{ backgroundColor: '#f8c291' }}>
        <div
          style={{
            marginTop: '20px',
            marginLeft: '420px',
          }}
        >
          <form
            className="Meme-form"
            style={{ styleLabel }}
            onSubmit={handleSubmit}
          >
            <select
              value={currentMeme}
              onChange={(e) => {
                setCurrentMeme(e.target.value);
              }}
            >
              {allMemes.map((item, i) => {
                return (
                  <option value={item.replace('/api/templates', '')}>
                    {item.replace('/api/templates', '')}
                  </option>
                );
              })}
            </select>
            <input
              style={{ inputField }}
              type="text"
              name="topText"
              placeholder="firstLine"
              value={firstLine}
              onChange={(e) => {
                setFirstLine(e.target.value);
              }}
            ></input>

            <input
              style={{ inputField }}
              type="text"
              name="bottomText"
              placeholder="secondLine"
              value={secondLine}
              onChange={(e) => {
                setSecondLine(e.target.value);
              }}
            ></input>

            <button type="button" style={{ styleButton }}>
              ENTER
            </button>
          </form>
        </div>
        <div
          className="defaultMeme"
          style={{ marginTop: '50px', textAlign: 'center' }}
        >
          <img
            src={currentMeme + '/' + firstLine + '/' + secondLine + '.jpg'}
            alt="not loaded"
          />
        </div>
      </div>
    </>
  );
}

export default App;
