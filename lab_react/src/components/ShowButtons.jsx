import {state, useState} from "react";
import { Button, Form } from "react-bootstrap";


// import "./ShowAnimals.css";

function ShowButtons(props) {
    const [selectedQuestion, setSelectedQuestion] = useState(undefined);

    const handleClick = (questionId) => {
        setSelectedQuestion(questionId);
    }


    return(
        <div className="form-wrapper">

                <Form.Select className="big-select-1" aria-label="Default select example" onChange={(e) => handleClick(e.target.value)}>
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>

                {selectedQuestion && <ShowPossibleAnswers value={selectedQuestion}/>}

   
        </div>
    )

}

function ShowPossibleAnswers(props){

    return (
        <>
            <br />
            <Form.Select className="big-select-2" aria-label="Default select example">
                <option>Open this select menu</option>

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

export default ShowButtons;