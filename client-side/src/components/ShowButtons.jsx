import { state, useState } from "react";
import { Button, Form } from "react-bootstrap";


// import "./ShowAnimals.css";

function ShowButtons(props) {

    const [localScore, setLocalScore] = useState(1000);

    const decreaseLocalScore = () => setLocalScore((score) => score - 100);

    const [selectedQuestion, setSelectedQuestion] = useState(undefined);
    // const [selectedAnswer, setSelectedAnswer] = useState(false);

    // map for options and possible answers
    const OPTIONS_MAP = {
        "Diet Type": [
            { label: "Carnivore", value: "carnivore" },
            { label: "Herbivore", value: "herbivore" },
            { label: "Omnivore", value: "omnivore" }
        ],
        "Color": [
            { label: "Black", value: "black" },
            { label: "Blue", value: "blue" },
            { label: "Brown", value: "brown" },
            { label: "Green", value: "green" },
            { label: "Grey", value: "grey" },
            { label: "Orange", value: "orange" },
            { label: "Pink", value: "pink" },
            { label: "Red", value: "red" },
            { label: "White", value: "white" }
        ],
        "Number Of Legs": [
            { label: "0", value: "0" },
            { label: "2", value: "2" },
            { label: "4", value: "4" },
            { label: "6", value: "6" },
            { label: "8", value: "8" }
        ],
        "Lays Eggs": [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ],
        "Can Fly": [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ],
        "Lives In Water": [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ],
        "Is Domestic": [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ],
        "Has Tail": [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ],
        "Has Fur": [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ],
        "Active Time": [
            { label: "Crepuscular", value: "crepuscular" },
            { label: "Diurnal", value: "diurnal" },
            { label: "Nocturnal", value: "nocturnal" }
        ]
    };

    const [availableOptions, setAvailableOptions] = useState(OPTIONS_MAP);


    const handleClick = (questionId) => {
        setSelectedQuestion(questionId);
    }

    const handleAnswerClick = (question, selectedValue) => {
        decreaseLocalScore();

        setAvailableOptions((prevOptions) => {
            const updatedOptions = { ...prevOptions };



            // Filter out the selected answer
            const remainingOptions = updatedOptions[question]?.filter(
                (opt) => opt.value !== selectedValue
            );

            if (remainingOptions && remainingOptions.length > 1) {
                // Update the question with remaining options
                updatedOptions[question] = remainingOptions;
            } else {
                // If no options remain, remove the question
                delete updatedOptions[question];
            }

            return updatedOptions;
        });
    };

    return (
        <>
        <h3>Score: {localScore}</h3>
        <div className="form-wrapper">

            <Form.Select className="big-select-1" aria-label="Default select example" onChange={(e) => { handleClick(e.target.value) }}>
                <option>Choose Question</option>
                {/* <option value="Diet Type">Diet Type</option>
                <option value="Color">Color</option>
                <option value="Number Of Legs">Number Of Legs</option>
                <option value="Lays Eggs">Lays Eggs</option>
                <option value="Can Fly">Can Fly</option> */}

                {/* instead let's use a map */}

                {Object.keys(availableOptions).map((question) => (
                    <option key={question} value={question}>
                        {question}
                    </option>
                ))}


            </Form.Select>

            {selectedQuestion && availableOptions[selectedQuestion] && <ShowPossibleAnswers value={selectedQuestion} handleAnswerClick={handleAnswerClick} handleClick={props.handleClick} availableOptions={availableOptions} />}


        </div>
        </>
    )

}

function ShowPossibleAnswers(props) {

    // la2enno l names lezm ykoono exact kermel l query
    let stupidMapper = {
        "Diet Type": "dietType",
        "Color": "color",
        "Number Of Legs": "numberOfLegs",
        "Lays Eggs": "laysEggs",
        "Can Fly": "canFly",
        "Lives In Water": "livesInWater",
        "Is Domestic": "isDomestic",
        "Has Tail": "hasTail",
        "Has Fur": "hasFur",
        "Active Time": "activeTime"
    }




    return (
        <>
            <br />
            <Form.Select className="big-select-2" aria-label="Default select example" onChange={(e) => { props.handleAnswerClick(props.value, e.target.value); props.handleClick(stupidMapper[props.value], e.target.value) }}>
                <option>Choose Answer</option>

                {props.availableOptions[props.value]?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}

            </Form.Select>


        </>
    )

}

export default ShowButtons;