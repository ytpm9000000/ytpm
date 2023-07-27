import React from 'react';
import axios from 'axios';

const YourComponent = () => {
    const sendDataToChannel = async () => {
        // Replace these with your actual Pusher credentials
        const pusherAppKey = '2af1374d612050e0e2d6';
        const pusherCluster = 'eu';

        // Replace 'my-channel' with the name of the channel you want to send data to
        // Replace 'my-event' with the name of the event you want to trigger
        const channelName = 'ytpm9000000';
        const eventName = 'my-event';

        // Data to be sent to the channel
        const data = {
            message: 'Hello from React app!',
        };

        // API endpoint to trigger the event on Pusher server-side
        const endpoint = `https://api-${pusherCluster}.pusher.com/apps/${pusherAppKey}/events`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer 2af1374d612050e0e2d6`, // You can omit this line if not required
                },
                body: JSON.stringify({
                    name: eventName,
                    channels: [channelName],
                    data: JSON.stringify(data),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send data to Pusher channel.');
            }

            console.log('Data sent successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={sendDataToChannel}>Send Data</button>
        </div>
    );
};

export default YourComponent;
