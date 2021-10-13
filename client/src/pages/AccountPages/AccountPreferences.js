//Have user choose profile picture, choose tags they are interested in, write a short description about themselves
import React, {useState, useEffect} from "react";
import { Container, Form, Label, Button, Header} from "semantic-ui-react";
import Auth from '../../utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery} from '@apollo/client';
import {GET_ME, GET_TAGS} from '../../utils/queries';
import PreferencesForm from '../../components/Account-page-components/account-preferences-form';

const AccountPreferences = () => {

    const loggedIn = Auth.loggedIn();

    const {loading, data} = useQuery(GET_ME);
    const {loading:tagloading, data:tagData} = useQuery(GET_TAGS);
    const tags = tagData?.tags || {};
    const userData = data?.me || {};

    //Fade in elements
    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    if (!loggedIn){
        return (
            <div>Please login to continue</div>
        )
    }

    if (loading || tagloading){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <Container className='big-container'>
            {!loading && !tagloading && <PreferencesForm tags={tags} userData={userData}></PreferencesForm>}
        </Container>
    )
}

export default AccountPreferences;