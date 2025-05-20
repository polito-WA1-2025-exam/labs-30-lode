import {state, useState} from "react";
import { Button, Form } from "react-bootstrap";


// import "./ShowAnimals.css";

function ShowButtons(props) {
    const [selectedQuestion, setSelectedQuestion] = useState(undefined);
    const [selectedAnswer, setSelectedAnswer] = useState(false);


    const handleClick = (questionId) => {
        setSelectedQuestion(questionId);
    }

    const handleAnswerClick = (value) => {
        setSelectedAnswer(value);
    }

    return(
        <div className="form-wrapper">

                <Form.Select className="big-select-1" aria-label="Default select example" onChange={(e) => {handleClick(e.target.value); handleAnswerClick(false)}}>
                    <option>Choose Question</option>
                    <option value="Diet Type">Diet Type</option>
                    <option value="Color">Color</option>
                    <option value="Number Of Legs">Number Of Legs</option>
                    <option value="Lays Eggs">Lays Eggs</option>
                    <option value="Can Fly">Can Fly</option>
                </Form.Select>

                {selectedQuestion && <ShowPossibleAnswers value={selectedQuestion} isAnswered={selectedAnswer} handleAnswerClick={handleAnswerClick} handleClick={props.handleClick}/>}

   
        </div>
    )

}

function ShowPossibleAnswers(props){

    // la2enno l names lezm ykoono exact kermel l query
    let stupidMapper = {
        "Diet Type": "dietType",
        "Color": "color",
        "Number Of Legs": "numberOfLegs",
        "Lays Eggs": "laysEggs",
        "Can Fly": "canFly"
    }

    if (props.isAnswered == false){
        return (
            <>
                <br />
                <Form.Select className="big-select-2" aria-label="Default select example" onChange={(e) => {props.handleAnswerClick(true); props.handleClick(stupidMapper[props.value], e.target.value)}}>
                    <option>Choose Answer</option>

                    {props.value == "Diet Type" && 
                        <>
                            <option value="carnivore">Carnivore</option>
                            <option value="herbivore">Herbivore</option>
                            <option value="omnivore">Omnivore</option>
                        </>}
                    
                    {props.value == "Color" && 
                        <>
                            <option value="black">Black</option>
                            <option value="blue">Blue</option>
                            <option value="brown">Brown</option>
                            <option value="green">Green</option>
                            <option value="grey">Grey</option>
                            <option value="orange">Orange</option>
                            <option value="pink">Pink</option>
                            <option value="red">Red</option>
                            <option value="white">White</option>
                        </>}

                    {props.value == "Number Of Legs" && 
                        <>
                            <option value="0">0</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </>}

                    {props.value == "Lays Eggs" && 
                        <>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </>}

                    {props.value == "Can Fly" &&
                        <>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </>}

                </Form.Select>   

                {/* // {console.log(props.value)}  */}

        </>
        )
    }
}

export default ShowButtons;