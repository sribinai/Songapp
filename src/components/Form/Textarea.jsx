import React from 'react'

const Textarea = ({title}) =>{
    return(
        <div className = "Box">
            <h3 className = "title">{title}</h3>
            <textarea name="textarea" id="ta" cols="30" rows="10"></textarea>
        </div>

    );

}

export default Textarea;