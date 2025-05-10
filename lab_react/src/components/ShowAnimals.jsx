import { useEffect, useState } from "react";
import cat from "../assets/animals/cat.jpg";
 
import "./ShowAnimals.css";
import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

import { getAnimals } from "../API/API.mjs";

function ShowAnimals(props){
    const navigate = useNavigate();

    const [animals, setAnimals] = useState([]);
    useEffect(() => {getAnimals().then((animals) => setAnimals(animals));}, [props.difficulty]);


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
    const [chunkedImages, setChunkedImages] = useState([]);
    useEffect(() => {
        let freq = props.difficulty === "Easy" ? 4 : 6;
        let maxImages = props.difficulty === "Easy" ? 12 : props.difficulty === "Normal" ? 24 : imagesList1.length;
        const imagesList = imagesList1.slice(0, maxImages);

        const chunkedImages = [];

        for (let i = 0; i < imagesList.length; i += freq){
            chunkedImages.push(imagesList.slice(i, i + freq));
        }

        setChunkedImages(chunkedImages);

    }, [animals.length, props.difficulty]);




    return(
        <>
        <h3>Difficulty: {props.difficulty}</h3>
        <h2> 
            <Button variant="secondary" onClick={() => navigate("/")}> Back To Start </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/difficulty")}>Back To Difficulty</Button>
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
                                difficulty={props.difficulty}/>)}

                    </tbody>
                                    
                </table>
                
            </div>

            <div className="form-section">
                <props.ShowButtons score={props.score}/>
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
                    difficulty={props.difficulty}/>)}

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

