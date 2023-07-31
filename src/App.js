import './App.css';
import {MainPage} from "./Components/MainPage";
import SongChooser from "./Components/SongChooser";
import {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import {NativeBaseProvider} from "native-base";

function App() {

    // useEffect(() => {
    //     const ably = new Ably.Realtime('NnUQBw.0sZMLw:cvvm_qE4voRWPBrO4NTy1HHQkanRJYCnffueJaOo-yU');
    //     const channel = ably.channels.get('playlist_channel');
    //
    //     // Event listener for receiving messages from the Ably channel
    //     channel.subscribe('message', (message) => {
    //         console.log('Received message from Ably:', message.data);
    //         // Update the playlist state based on the received message
    //         // For example, add the video to the playlist.
    //     });
    //
    //     console.log({channel})
    //
    //     // Clean up the Ably connection on unmount
    //     return () => {
    //         ably.close();
    //     };
    // }, []);

    const [name, setName] = useState('');

    return (
        <NativeBaseProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"}>
                        <Route index path={'ytpm'} element={<Login />} />
                        <Route path="ytpm/playlist" element={<MainPage />} />
                        <Route path="ytpm/songChooser" element={<SongChooser />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </NativeBaseProvider>
        // <div className="App">
        //     {/*<YourComponent />*/}
        //     {/*<Playlist/>*/}
        //     <SongChooser/>
        //     {name === 'JBL' ? <MainPage/> : null}
        //
        // </div>
    );
}

export default App;
