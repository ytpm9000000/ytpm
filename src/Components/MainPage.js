import logo from "../logo.png";
import {useState} from "react";


export const MainPage = () => {

    const [copiedText, setCopiedText] = useState('Click to add a song :)');

    const handleButtonClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setCopiedText(text);
        } catch (error) {
            console.error('Failed to read clipboard text:', error);
        }
    };

    return (<header className="App-header">
        <div onClick={handleButtonClick}>

        <img src={logo} className="App-logo" alt="logo" onClick={() => {

        }} />
            <div style={{position: "absolute", left: 0, right: 0, top:'50%', zIndex: 100}}>{copiedText}</div>
        </div>
    </header>)
}
