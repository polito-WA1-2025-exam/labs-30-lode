import startBackground from "../assets/startBackgroundWide_2.png";
import startLogo from "../assets/startLogo.png"
import "./Start.css";
import Difficulty from "./Difficulty";
import {useState} from "react";
import ShowButtons from "./ShowButtons";
import { useNavigate } from "react-router";


function Start(props){

    const navigate = useNavigate();

    return(
        <div className="start-container">

            <img src={startBackground} className="start-screen" alt="Start"/>

            <img src={startLogo} className="start-button" alt="Start Button" onClick={() => {navigate("/difficulty");}}/>

        </div>

    );
}

export default Start;