import React from 'react';
import GoogleLogin from 'react-google-login';

const OAuth = () => {
    const responseGoogle = (response) => {
        // Handle the Google API response here.
        // The 'response' object will contain the user's profile information and the access token.
        console.log(response);
    };

    return (
        <div style={{position: "absolute", bottom: 0}}>
            {/* Replace 'YOUR_CLIENT_ID' with your actual OAuth 2.0 client ID */}
            <GoogleLogin
                clientId="911147350045-n3qlh2h12fmta6n28o5jdgrft3ruitm7.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                scope="https://www.googleapis.com/auth/youtube" // Add any additional scopes you need
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default OAuth;
