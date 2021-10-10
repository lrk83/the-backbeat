import React, {useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import {Container} from "semantic-ui-react";
import {GET_SINGLE_USER} from '../utils/queries';
import Auth from '../utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AccountPage = ({ match }) => {

    const [ID]=useState(match.params.userId);

    console.log(ID);

    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { userId: ID }
    });

    console.log(data);

    const userData = data?.user || {};
    const loggedIn = Auth.loggedIn();

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        return <div>Please login to continue</div>
    };

    return (
        <Container className="big-container">
        </Container>
    )
}

export default AccountPage;