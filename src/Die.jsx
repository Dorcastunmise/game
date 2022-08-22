import React from 'react';
import './App';


function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "rgba(177, 169, 197, 0.8)" : "white"
    }
    return (
        <div className='grid-item' style={styles} onClick={props.next}>
            <h2>{props.value}</h2>
        </div>
    )
}
export default Die
