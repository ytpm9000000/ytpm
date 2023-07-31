import React, { useEffect } from 'react';
import Ably from 'ably/promises';
import {useLocation} from "react-router-dom";

const Playlist = () => {
    const { state } = useLocation();
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

    // Your playlist UI and logic here

    return (
        <div>
            <button>Send Data</button>
        </div>
    );
};

export default Playlist;
