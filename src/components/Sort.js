import './../App.css';
import { useState } from 'react';

export default function SortItems(props) {
    const [sortState, setSortState] = useState("imgNum");

    function changeSort(event) {
        setSortState(event.target.value);
        props.sortRecords(event.target.value);
    }

    return (
        <div style={{display:'flex',flexDirection:'column'}} value="imgNum" onChange={changeSort}>
            <div>
                <input type="radio" value="imgNum" id="popular" name="sorter" checked={sortState==="imgNum"}></input>
                <label for="popular" id="light-text">Popular</label>
            </div>

            <div>
                <input type="radio" value="price" id="low-high" name="sorter" checked={sortState==="price"}></input>
                <label for="low-high" id="light-text">Price: Low to High</label>
            </div>
        </div>
    );
}