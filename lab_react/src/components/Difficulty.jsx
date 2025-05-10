import { useState, useEffect } from "react";
import {Button} from "react-bootstrap";
import Start from "./Start";
import ShowAnimals from "./ShowAnimals";
import { useNavigate } from "react-router";

function Difficulty(props){
    const navigate = useNavigate();
    const [message, setMessage] = useState(true);

    useEffect(() => {setTimeout(() => {setMessage(false)}, 2000)}, [props.difficulty]);

    return(
        <div>
            <h1>Select Difficulty</h1>
            <Button variant="success" onClick={() => {props.applyDifficulty("Easy"); navigate("/animals")}}>Easy</Button> 
            <Button variant="warning" onClick={() => {props.applyDifficulty("Normal"); navigate("/animals")}}>Normal</Button> 
            <Button variant="danger" onClick={() => {props.applyDifficulty("Hard"); navigate("/animals")}}>Hard</Button>

            <br/>

            <Button variant="secondary" onClick={() => {navigate("/")}}>Back</Button>

            {
                message && <h2>Stupid Just For Testing</h2>
            }

        </div>

    );
}

export default Difficulty