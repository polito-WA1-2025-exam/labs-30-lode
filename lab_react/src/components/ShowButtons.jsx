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
                    <option value="1">Question1</option>
                    <option value="2">Question2</option>
                    <option value="3">Question3</option>
                </Form.Select>

                {selectedQuestion && <ShowPossibleAnswers value={selectedQuestion} isAnswered={selectedAnswer} handleAnswerClick={handleAnswerClick}/>}

   
        </div>
    )

}

function ShowPossibleAnswers(props){

    

    if (props.isAnswered == false){
        return (
            <>
                <br />
                <Form.Select className="big-select-2" aria-label="Default select example" onChange={(e) => props.handleAnswerClick(true)}>
                    <option>Choose Answer</option>

                    {props.value == "1" && 
                        <>
                            <option value="1">yes</option>
                            <option value="2">no</option>
                        </>}
                    
                    {props.value == "2" && 
                        <>
                            <option value="1">TRUE</option>
                            <option value="2">FALSE</option>
                        </>}

                    {props.value == "3" && 
                        <>
                            <option value="1">OKAY</option>
                            <option value="2">NOT OKAY</option>
                        </>}

                </Form.Select>   

                {/* // {console.log(props.value)}  */}

        </>
        )
    }
}

export default ShowButtons;