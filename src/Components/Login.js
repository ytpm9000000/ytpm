import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Input, Text} from "native-base";
import {Link, useNavigate} from "react-router-dom";
import '../App.css';

const Login = () => {

    const navigate = useNavigate();
    const ref = useRef(null);

    return (
        <Box w={'100%'} h={'100vh'} bgColor={'#e3e3e3'} justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'14px'} mb={'8px'}>Nickname</Text>
            <Input ref={ref} bgColor={'white'} mb={'16px'} fontSize={'16px'}/>
            <Button  onPress={() => {
                const nickname = ref.current?.value || `User_${Math.floor(Math.random() * 100)}`
                if (nickname === 'JBL')
                {
                    navigate('playlist')
                } else {
                    navigate('songChooser', {
                        state: {
                            nickname
                        }
                    })
                }

            }

            }>Next</Button>
        </Box>
    )
};

export default Login;
