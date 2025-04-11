import { useState } from "react";
import cat from "../assets/animals/cat.jpg";
 
import "./ShowAnimals.css";

function ShowAnimals(props){
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

    const chunkedImages = [];
    for (let i = 0; i < imagesList.length; i += freq) {
        chunkedImages.push(imagesList.slice(i, i + freq));
    }

    return(

        <>
            {/* <h1>{index}</h1> */}

            <table>
                <tbody>


                    {chunkedImages.map((imagesList, i) => 
                        <RowImage 
                            key={i} 
                            imagesList={imagesList} 
                            increaseIndex={increaseIndex}
                            difficulty={props.difficulty}/>)}

                    {/* <RowImage imagesList={imagesList} index={index} increaseIndex={increaseIndex}/> */}


                </tbody>
            </table>

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

