import React from 'react'

const Participants = ({title}) =>{
    return(
        <div className = "Box">
            <h3 className = "title">{title}</h3>
            <input type="number" name="participants" id="particip" />
        </div>

    );

}

export default Participants;