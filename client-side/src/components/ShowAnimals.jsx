import { useEffect, useState } from "react";
import cat from "../assets/animals/cat.jpg";
 
import "./ShowAnimals.css";
import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

import { getAnimals, getAnimalsByAttributes, retrieveByDifferentAttributesExclusion } from "../API/API.mjs";

function ShowAnimals(props){
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [gameAnimals, setGameAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialAnimals = async () => {
            const allAnimals = await getAnimals(); // from DB
            let count = props.difficulty === "Easy" ? 12 :
                props.difficulty === "Normal" ? 24 :
                    allAnimals.length;

            const selectedAnimals = allAnimals.slice(0, count); // or random selection
            setGameAnimals(selectedAnimals);
            setFilteredAnimals(selectedAnimals); // no filters at the start
            setLoading(false);
        };

        fetchInitialAnimals();
    }, [props.difficulty]);


    useEffect(() => {
        // 
    })

    const [index, setIndex] = useState(0);
    const increaseIndex = () => setIndex((index) => index + 1);

    const images = import.meta.glob('../assets/animals/*', { eager: true });
    const imagesList1 = Object.values(images).map((img) => img.default);

    let imagesList;

    let freq = 4;

    if (props.difficulty == "Easy"){
        freq = 4;
        imagesList = imagesList1.slice(0, 12);
    }
    else if (props.difficulty == "Normal"){
        freq = 6;
        imagesList = imagesList1.slice(0, 24);
    }
    else {
        freq = 6;
        imagesList = imagesList1;
    }

    const [j, setJ] = useState(0);
    const increaseJ = () => setJ((j) => j + 1);
    const [chunkedImages, setChunkedImages] = useState([]);
    useEffect(() => {
        // 1. Map from normalized file name (e.g. 'cat') to image path
        const imageMap = Object.entries(images).reduce((acc, [path, mod]) => {
            const fileName = path.split('/').pop();        // 'cat.png'
            const baseName = fileName.split('.')[0].toLowerCase(); // 'cat'
            acc[baseName] = mod.default;
            return acc;
        }, {});

        console.log(filteredAnimals);

        // 2. Match current filtered animals to their image
        const matchedImages = [];
        if (Array.isArray(filteredAnimals)) {
            for (const animal of filteredAnimals) {
                const nameKey = animal.name?.toLowerCase?.(); // safe access
                const img = imageMap[nameKey];
                if (img) {
                    matchedImages.push(img);
                }
            }
        }

        // 3. Chunk by difficulty frequency
        const freq = props.difficulty === "Easy" ? 4 : 6;

        const chunked = [];
        for (let i = 0; i < matchedImages.length; i += freq) {
            chunked.push(matchedImages.slice(i, i + freq));
        }

        setChunkedImages(chunked);
    }, [filteredAnimals, props.difficulty]);


const handleClick = async (attribute, value) => {
    const filter = {};
    // if (attribute === "carnivore") filter.dietType = "carnivore";
    // else if (attribute === "herbivore") filter.dietType = "herbivore";

    filter[attribute] = value;

    console.log(filter);

    const allowedNames = filteredAnimals.map((a) => a.name);

    try {
        const result = await getAnimalsByAttributes(filter, allowedNames);

        // check if selectedAnimal is in the result
        if (result.some(animal => animal.name === selectedAnimal)) {
            // if it is, then normally excute the query
            setFilteredAnimals(result);
            increaseJ();
        }
        else {
            // if NOT found, we need to execute the query to filter all the animals that do NOT have the attribute value
            const result2 = await retrieveByDifferentAttributesExclusion(attribute, value, allowedNames);
            setFilteredAnimals(result2);
            increaseJ();
        }

    } catch (err) {
        console.error("Failed to fetch filtered animals: ", err);
    }
};

    return(
        <>
        <h3>Difficulty: {props.difficulty}</h3>
        <h2> 
            <Button variant="secondary" onClick={() => navigate("/")}> Back To Start </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/difficulty")}>Back To Difficulty</Button>

            {/* test if I can filter animals using this button */}
{/* 
            <Button onClick={() => handleClick("carnivore")}> Carnivore </Button>

            <Button onClick={() => handleClick("herbivore")}> Herbivore </Button> */}

        </h2>
        <div className="main-layout">
            <div className="image-grid">


                <table>
                    <tbody>


                        {chunkedImages.map((imagesList, i) => 
                            <RowImage 
                                key={i} 
                                imagesList={imagesList} 
                                increaseIndex={increaseIndex}
                                difficulty={props.difficulty}  selectedAnimal = {selectedAnimal} setSelectedAnimal={setSelectedAnimal}/>)}

                    </tbody>
                                    
                </table>
                
            </div>

            <div className="form-section">
                <props.ShowButtons score={props.score} decreaseScore={props.decreaseScore} handleClick={handleClick} selectedAnimal = {selectedAnimal}/>
            </div>
        </div>
        </>

    )

}

function RowImage(props){
    return (
        <tr>
           
            {props.imagesList.map((image, i) =>
                 <ColumnImage 
                    key={i} 
                    image={image} 
                    increaseIndex={props.increaseIndex}
                    difficulty={props.difficulty} selectedAnimal = {props.selectedAnimal} setSelectedAnimal={props.setSelectedAnimal}/>)}

            {/* <ColumnImage imagesList={props.imagesList.slice(props.index, props.index + 4)} increaseIndex={props.increaseIndex}/> */}

        </tr>
    )

}

function ColumnImage(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    let className;
    if (props.difficulty === "Easy") {
        className = "large-image";
    } else if (props.difficulty === "Normal") {
        className = "medium-image";
    } else {
        className = "small-image";
    }

    const handleImageClick = () => {
        props.increaseIndex();  // Call the function passed via props
        setIsModalOpen(true);  // Open the modal when image is clicked

        // only set selectedAnimal if it is not already set
        if (!props.selectedAnimal){
            props.setSelectedAnimal(() => (props.image).split("/").pop().split(".")[0]);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);  // Close the modal
    };

    return (
        <td className="image-container">
            <img
                src={props.image}
                className={`animal ${className}`}
                alt="Animal"
                onClick={handleImageClick}  // Trigger the onClick
            />

            {/* Modal to show enlarged image */}
            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <img src={props.image} alt="Enlarged Animal" className="enlarged-image" />
                    </div>
                </div>
            )}
        </td>
    );
}



export default ShowAnimals;

