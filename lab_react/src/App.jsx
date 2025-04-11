import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import eagleImage from "./assets/animals/eagle.jpg"
import duckImage from "./assets/animals/duck.jpg"
import bat from "./assets/animals/bat.jpg"
import "bootstrap/dist/css/bootstrap.min.css";

import Start from './components/Start'
import Difficulty from "./components/Difficulty"
import ShowAnimals from "./components/ShowAnimals"

function App() {
  const [score, setScore] = useState(0); // noteAmjad: this will NOT be used till 1 month later ...

  const [difficulty, setDifficulty] = useState("normal"); // the default is normal


  // const applyDifficulty = (diff) => {setDifficulty(() => diff)};
  // we can do directly in the following way because here updating the value
  // does NOT depend on the previous one, instead we have a parameter
  const applyDifficulty = (diff) => setDifficulty(diff);




  return (
    <>

      <Start/>
      {/* <Difficulty applyDifficulty={applyDifficulty}/> */}
      {/* <h2>{difficulty}</h2>  */}

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
