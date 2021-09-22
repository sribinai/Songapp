import React from 'react'
import "./linksong.style.css";
// import LinksList from "./LinksList";

const LinkSong = () =>{
    return(
        <>
        <div className="ls">
            <div className="ls-title">Add your songs here....</div>
            <div className="ls-link">
                <input type="url" name="url" id="link-input" placeholder="Paste link here" className="ls-url" />
                <input type="submit" value="ADD" className="add" />
                {/* <button className="add">ADD</button> */}
            </div>
            <table className="ls-song" id="ls-song-table">
                <td className="ls-song-link">https://myFavSong.com</td>
                <td className="ls-song-btn"><button className="ls-song-btn">REMOVE</button></td>
            </table>
        </div>
        <button className="start-game">START GAME</button>
        </>

    );

}

export default LinkSong;