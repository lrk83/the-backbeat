import React, {useEffect, useState} from 'react';
import { Icon, Grid, Container, List, Header, Image } from 'semantic-ui-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@apollo/client';
import {GET_SKILLS_FOR_SUGGESTED} from '../../utils/queries';
import Sort from "../../utils/sort";
import {Link} from 'react-router-dom';

const MostPopularSkills = () => {

    const firstHalf=[0,1,2,3,4];
    const secondHalf = [5,6,7,8,9];

    console.log(window.screen.width);
    const smallscreen=540;

    const { loading, data} = useQuery(GET_SKILLS_FOR_SUGGESTED);
    const skillData = data?.allSkillPosts || {};

    const [haventSortedSkills, setSortedSkills] = useState(true);
    const [sortedSkillData, setSortedSkillData]=useState([]);

    useEffect(()=>{
        if (!loading){
            if (haventSortedSkills===true){
                setSortedSkillData(Sort.mostPopularPost(skillData));
                setSortedSkills(true);
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
            <Container className="shadow-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500" id="top-ten-shadow-container">
                
                {window.screen.width<smallscreen ? (<>

                    <Header as="h3" className="top-ten-subheader">Our top five most popular skills</Header>

                    <Grid columns={1}>
                        <Grid.Column>
                        {sortedSkillData.length &&
                            <List celled>
                            {firstHalf.map(num=>(
                                <Link to={`skills/single-skill/${sortedSkillData[num]._id}`} key={sortedSkillData[num]._id}>
                            <List.Item >
                                
                                <Image avatar src={sortedSkillData[num].image} className="top-post-icon"/>
                                <List.Content>
                                    <List.Header>{sortedSkillData[num].name}</List.Header>
                                    
                                </List.Content>
                            </List.Item></Link>) ) }
                        </List>}
                        </Grid.Column>
                    </Grid>

                </>):(<>

                    <Header as="h3" className="top-ten-subheader">Our top ten most popular skills</Header>
                
                
                <Grid columns={2} divided>
                    <Grid.Column>
                    {sortedSkillData.length &&
                        <List celled>
                        {firstHalf.map(num=>(
                        <List.Item key={sortedSkillData[num]._id}>
                            
                            <Image avatar src={sortedSkillData[num].image} className="top-post-icon"/>
                            <List.Content>
                                <Link to={`skills/single-skill/${sortedSkillData[num]._id}`}>
                                <List.Header>{sortedSkillData[num].name}</List.Header>
                                </Link>
                            </List.Content>
                        </List.Item>) ) }
                    </List>}
                    </Grid.Column>
                    <Grid.Column>
                    {sortedSkillData.length &&
                        <List celled>
                            {secondHalf.map(num=>(
                            <List.Item key={sortedSkillData[num]._id}>
                                
                                <Image avatar src={sortedSkillData[num].image} className="top-post-icon"/>
                                <List.Content>
                                    <Link to={`skills/single-skill/${sortedSkillData[num]._id}`}>
                                    <List.Header>{sortedSkillData[num].name}</List.Header>
                                    {sortedSkillData[num].author}
                                    </Link>
                                </List.Content>
                            </List.Item>) ) }
                        </List>}
                    </Grid.Column>
                </Grid></>)}
            </Container>
        </Container>
    )
}

export default MostPopularSkills;