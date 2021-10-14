import React, {useEffect, useState} from 'react';
import { Grid, Container, List, Header, Image } from 'semantic-ui-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@apollo/client';
import {GET_SOUNDS_FOR_SUGGESTED} from '../../utils/queries';
import Sort from "../../utils/sort";
import {Link} from 'react-router-dom';
import SmallTopTen from '../small-screen/small-top-ten';

const MostPopularSounds = () => {

    const firstHalf=[0,1,2,3,4];
    const secondHalf = [5,6,7,8,9];

    const { loading, data} = useQuery(GET_SOUNDS_FOR_SUGGESTED);
    const soundData = data?.allSoundPosts || {};
    
    const smallscreen = 540;

    const [haventSortedSounds, setSortedSounds] = useState(true);
    const [sortedSoundData, setSortedSoundData]=useState([]);

    useEffect(()=>{
        if (!loading){
            if (haventSortedSounds===true){
                setSortedSoundData(Sort.mostPopularPost(soundData));
                setSortedSounds(true);
            }
        }
    });

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    return (
        <Container className="big-container" id="most-popular-container">
            <Container className="header-container"><Header as="h1" className="single-header" id="top-ten-header">Top All Time</Header></Container>
                
                {window.screen.width<smallscreen ? (<>

                    <Header as="h3" className="top-ten-subheader">Our most popular sound packs</Header>
                        {sortedSoundData.length &&
                            <SmallTopTen data={sortedSoundData}></SmallTopTen>
                        }
                </>):(<>
                    <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" id="top-ten-shadow-container">

                    <Header as="h3" className="top-ten-subheader">Our top ten most popular sounds</Header>
                
                
                <Grid columns={2} divided>
                    <Grid.Column>
                    {sortedSoundData.length &&
                        <List celled>
                        {firstHalf.map(num=>(
                        <List.Item key={sortedSoundData[num]._id}>
                            <Image avatar src={sortedSoundData[num].image} className="top-post-icon"/>
                            <List.Content>
                                <Link to={`sounds/single-sound/${sortedSoundData[num]._id}`}>
                                <List.Header>{sortedSoundData[num].name}</List.Header>
                                </Link>
                            </List.Content>
                        </List.Item>) ) }
                    </List>}
                    </Grid.Column>
                    <Grid.Column>
                    {sortedSoundData.length &&
                        <List celled>
                            {secondHalf.map(num=>(
                            <List.Item key={sortedSoundData[num]._id}>
                                
                                <Image avatar src={sortedSoundData[num].image} className="top-post-icon"/>
                                <List.Content>
                                    <Link to={`sounds/single-sound/${sortedSoundData[num]._id}`}>
                                    <List.Header>{sortedSoundData[num].name}</List.Header>
                                    {sortedSoundData[num].author}
                                    </Link>
                                </List.Content>
                            </List.Item>) ) }
                        </List>}
                    </Grid.Column>
                </Grid>
                </Container>
                </>)}
            
        </Container>
    )
}

export default MostPopularSounds;