import React, {useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CommunityHero from "../../components/user-page-components/community-page-hero";
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_ME } from '../../utils/queries';
import Sort from '../../utils/sort';
import Auth from '../../utils/auth';
import TopCreatives from '../../components/user-page-components/top-users';
import SmallFavorites from '../../components/user-page-components/small-top-users';
import UserSearch from '../../components/user-page-components/user-search';

const CommunityPage = () => {

    const {loading:skillloading, data} = useQuery(GET_USERS);
    const userData = data?.users || {};

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    if (skillloading){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <>
            <CommunityHero></CommunityHero>
            {window.screen.width>=411 ? (<>
                <TopCreatives data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500"></TopCreatives>
            </>):(<>
                <SmallFavorites></SmallFavorites>
            </>)}
            {userData.length && <UserSearch userData={userData}></UserSearch>}
        </>
    )
}

export default CommunityPage;