import logo from './logo.svg';
import './App.css';
import OAuth from "./Components/OAuth";
import {MainPage} from "./Components/MainPage";
import {useEffect} from "react";
import { gapi } from 'gapi-script'
import Pusher from 'pusher-js';
import YourComponent from "./Components/Socket";
import Ably from 'ably'
import Playlist from "./Components/Playlist";
import SongChooser from "./Components/SongChooser";

function App() {

    useEffect(() => {
        const ably = new Ably.Realtime('NnUQBw.0sZMLw:cvvm_qE4voRWPBrO4NTy1HHQkanRJYCnffueJaOo-yU');
        const channel = ably.channels.get('playlist_channel');

        // Event listener for receiving messages from the Ably channel
        channel.subscribe('message', (message) => {
            console.log('Received message from Ably:', message.data);
            // Update the playlist state based on the received message
            // For example, add the video to the playlist.
        });

        // Clean up the Ably connection on unmount
        return () => {
            ably.close();
        };
    }, []);

  return (
    <div className="App">
        {/*<YourComponent />*/}
        {/*<Playlist/>*/}
        <SongChooser/>
        <MainPage />
      <OAuth />
    </div>
  );
}

export default App;
