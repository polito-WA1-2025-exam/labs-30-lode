import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";

import Start from './components/Start'
import Difficulty from "./components/Difficulty"
import ShowAnimals from "./components/ShowAnimals"
import ShowButtons from './components/ShowButtons';

// import { randomAnimal } from "../../guess_who.mjs"

function App() {
  const [score, setScore] = useState(1000); // noteAmjad: this will NOT be used till 1 month later ...

  const [difficulty, setDifficulty] = useState("normal"); // the default is normal

  // const [animal, setAnimal] = useState(randomAnimal());

  // const applyDifficulty = (diff) => {setDifficulty(() => diff)};
  // we can do directly in the following way because here updating the value
  // does NOT depend on the previous one, instead we have a parameter
  const applyDifficulty = (diff) => setDifficulty(diff);

  


  return (
    <>

      <Start ShowButtons={ShowButtons} score={score}/>
      {/* <Difficulty applyDifficulty={applyDifficulty}/> */}
      {/* <h2>{difficulty}</h2>  */}


      {/* <ShowButtons /> */}

      {/* <ShowAnimals difficulty={difficulty}/> */}

      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      <div>
        <h1>hello</h1>
        <img src={eagleImage} className="logo react" alt="React logo"/>
        <img src={duckImage} className="logo react" alt="React logo"/>
        <img src={bat} className="logo react" alt="React logo"/>
      </div>


      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
