import React, { useState } from 'react';
import Ably from 'ably/promises';

const SongChooser = () => {
    const [videoUrl, setVideoUrl] = useState('');

    const handleAddVideo = () => {
        // Your logic to add the video to the playlist here

        // Create an Ably client to send the message
        const ably = new Ably.Realtime('NnUQBw.0sZMLw:cvvm_qE4voRWPBrO4NTy1HHQkanRJYCnffueJaOo-yU');
        const channel = ably.channels.get('playlist_channel');

        console.log("kako", {channel})

        // Send the video URL as a message to Ably
        channel.publish('message', videoUrl);
    };

    return (
        <div>
            {/* Your playlist UI here */}
            <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            <button onClick={handleAddVideo}>Add Video</button>
        </div>
    );
};

export default SongChooser;
