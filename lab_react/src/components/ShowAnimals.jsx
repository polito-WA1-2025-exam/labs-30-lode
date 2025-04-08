import { useState } from "react";
import cat from "../assets/animals/cat.jpg";
 
import "./ShowAnimals.css";

function ShowAnimals(props){
    const [index, setIndex] = useState(0);
    const increaseIndex = () => setIndex((index) => index + 1);

    const images = import.meta.glob('../assets/animals/*', { eager: true });
    const imagesList1 = Object.values(images).map((img) => img.default);

    let imagesList;

    if (props.difficulty == "Easy"){
        imagesList = imagesList1.slice(0, 8);
    }
    else{
        imagesList = imagesList1.slice(0, 14);

    }

    const chunkedImages = [];
    for (let i = 0; i < imagesList.length; i += 4) {
        chunkedImages.push(imagesList.slice(i, i + 4));
    }

    return(

        <>
            {/* <h1>{index}</h1> */}

            <table>
                <tbody>


                    {chunkedImages.map((imagesList, i) => <RowImage key={i} imagesList={imagesList} increaseIndex={increaseIndex}/>)}

                    {/* <RowImage imagesList={imagesList} index={index} increaseIndex={increaseIndex}/> */}


                </tbody>
            </table>

        </>

    )

}

function RowImage(props){
    return (
        <tr>
           
            {props.imagesList.map((image, i) => <ColumnImage key={i} image={image} increaseIndex={props.increaseIndex}/>)}

            {/* <ColumnImage imagesList={props.imagesList.slice(props.index, props.index + 4)} increaseIndex={props.increaseIndex}/> */}

        </tr>
    )

}

function ColumnImage(props){
    // props.increaseIndex();
    return (
        <td >
            {/* <Button onClick={console.log("click")}>ttttt</Button> */}

            {/* {props.imagesList.map(img => <img src={img} className="animal" alt="Animal"/>)}  */}

            <img src={props.image} className="animal" alt="Animal" onClick={() => props.increaseIndex()}/>
            
        </td>
    )

}



export default ShowAnimals;

