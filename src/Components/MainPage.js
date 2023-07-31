import logo from "../vinil.png";
import {useEffect, useState} from "react";
import Ably from "ably";
import YouTube from "react-youtube";


export const MainPage = () => {

    const [subscriptionQueue, setSubscriptionQueue] = useState([])
    const [queue, setQueue] = useState(['BTYRiNtLLQk']);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const ably = new Ably.Realtime('NnUQBw.0sZMLw:cvvm_qE4voRWPBrO4NTy1HHQkanRJYCnffueJaOo-yU');
        const channel = ably.channels.get('playlist_channel');

        // Event listener for receiving messages from the Ably channel
        channel.subscribe('message', (message) => {

            setSubscriptionQueue(old => [...old, message.data])
        });

        console.log({channel})

        // Clean up the Ably connection on unmount
        return () => {
            ably.close();
        };
    }, []);

    const [copiedText, setCopiedText] = useState('Click to add a song :)');



    const handleButtonClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setCopiedText(text);
        } catch (error) {
            console.error('Failed to read clipboard text:', error);
        }
    };

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
            // mute: 1
        },
    };

    return (
     <header className="App-header">
        <div onClick={handleButtonClick}>

            <YouTube videoId={queue[currentVideo]}  onEnd={() => {
                setQueue(old => [...old, ...subscriptionQueue])
                setSubscriptionQueue([])
                setCurrentVideo(old => old + 1)
            }} opts={opts}></YouTube>


        <img src={logo} className="App-logo" alt="logo" onClick={() => {

        }} />
            {/*<div style={{position: "absolute", left: 0, right: 0, top:'50%', zIndex: 100}}>{queue.join(", ")}</div>*/}
        </div>
    </header>)
}
