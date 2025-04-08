import { useState } from "react";
import {Button} from "react-bootstrap";
import Start from "./Start";
import ShowAnimals from "./ShowAnimals";

function Difficulty(props){
    const [showAnimals, setShowAnimals] = useState(false);

    if (showAnimals == true){
        return (
            <ShowAnimals difficulty={props.difficulty}/>
        )
    }

    return(
        <div>
            <h1>Select Difficulty</h1>
            <Button variant="success" onClick={() => {props.applyDifficulty("Easy"); setShowAnimals(true)}}>Easy</Button> 
            <Button variant="warning" onClick={() => {props.applyDifficulty("Normal"); setShowAnimals(true)}}>Normal</Button> 
            <Button variant="danger" onClick={() => {props.applyDifficulty("Hard"); setShowAnimals(true)}}>Hard</Button>
        </div>

    );
}

export default Difficulty