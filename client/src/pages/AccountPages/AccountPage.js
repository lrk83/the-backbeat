import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import {Container} from "semantic-ui-react";
import {GET_ME} from '../../utils/queries';
import Auth from '../../utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AccountPage = () => {
    const {data} = useQuery(GET_ME);

    const userData = data?.me || {}

    console.log(userData);

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });
    

    return (
        <Container className="big-container">
            <Container className="shadow-container">
                Here's where my data goes
            </Container>
        </Container>
    )
}

export default AccountPage;