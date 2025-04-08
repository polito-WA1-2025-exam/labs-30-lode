import startBackground from "../assets/startBackgroundWide_2.png";
import startLogo from "../assets/startLogo.png"
import "./Start.css";
import Difficulty from "./Difficulty";
import {useState} from "react";

function Start(){
    const [showDifficulty, setShowDifficulty] = useState(false);
    const [difficulty, setDifficulty] = useState("normal");

    const applyDifficulty = (diff) => setDifficulty(diff);


    // just for test
    const redirectToSomething = () => {
        window.open("https://www.youtube.com", "_blank");
    }

    if (showDifficulty){
        return (
            <div className="start-container">

                {/* <img src={startBackground} className="start-screen" alt="Start"/> */}
                <Difficulty difficulty={difficulty} applyDifficulty={applyDifficulty}/>
                {/* <h1>{difficulty}</h1> */}

            </div>
        )
    }

    return(
        <div className="start-container">

            <img src={startBackground} className="start-screen" alt="Start"/>

            <img src={startLogo} className="start-button" alt="Start Button" onClick={() => setShowDifficulty(true)}/>

        </div>

    );
}

export default Start;