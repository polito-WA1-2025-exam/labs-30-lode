import dayjs from "dayjs"
import sqlite from "sqlite3"

// Item is the object we choose and try to choose: can be person, animal ...
let id = 0;

class Item{
    constructor(){
        this.id = id++;
        this.properties = [];

        this.addProperty = function(prop, value){
            this.properties.push([prop, value]);
        }
        
        this.printProperties = () => {
            console.log(this.properties);
        }
    
        this.myFunction = function(){
            console.log(this.id);
        }
    }
}

const itemsList = [];

let item1 = new Item();
item1.addProperty("fly", true);
item1.addProperty("water", false);
itemsList.push(item1);

item1.printProperties();


let item2 = new Item();
item2.addProperty("fly", false);
item2.addProperty("water", true);
itemsList.push(item2)

item2.printProperties();

// function findItem(propertiesList, itemsList){
//     for (let i = 0; i < propertiesList.length; i++){
//         if (propertiesList[i][1] != itemsList[i][1]){
//             return false;
//         }
//     }

//     return true
// }

// let propertiesList = [["fly", true], ["water", false]];

// let outcome = findItem(itemsList, propertiesList);

// console.log(outcome);



const db = new sqlite.Database("guess_who.db", (err) => {if (err) throw err});

const selectAll = `SELECT * FROM ANIMAL`

function myFunction(){
    return new Promise((resolve, reject) => {
        db.all(selectAll, (err, rows) => {
            if (err){
                reject(err);
            }
            else{
                const mappedRow = rows.map((row) => {new Item()});
                resolve(mappedRow);
            }
        })
    })
}

myFunction().then((t) => console.log(t));
