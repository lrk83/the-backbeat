import React, {useState, useEffect} from "react";
import { Container, Image, Header, Button, Menu, Dropdown } from "semantic-ui-react";
//import data from '../assets/skilldata.json';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery, useMutation } from '@apollo/client';
import {GET_SINGLE_SKILL} from '../utils/queries';
import { SAVE_SKILL } from "../utils/mutation";

const SingleSound = ({ match }) => {
    
    const [ID]=useState(match.params.skillId);

    const { loading, data } = useQuery(GET_SINGLE_SKILL, {
        variables: { id: ID }
    });

    const skillData = data?.skillPost || {};

    console.log(skillData);

    const tagsToShow=skillData.tags;
    const linkstoshow=skillData.links;
    const additionalToShow=skillData.aditionalTags;

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <Container className="big-container">
            <Container id="skill-container" className="shadow-container single-post-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                <Image className="skill-photo" src={skillData.image}/>
                <Container className="single-post-content">
                    <Header as='h1' className="single-header">{skillData.name}</Header>
                    <Container className="single-post-para">
                        <p>{skillData.description}</p>
                        <div className="skill-buttons-div">
                        <Button circular color='facebook' icon='heart' />
                        <Button circular color='twitter' icon='mail' />
                        </div>
                    </Container>
                    {skillData.links[0] ? ( <>
                    <Container className="links-container">
                    <Menu vertical className="links-menu">
                        <Header as="h2" className="links-menu-header">Links</Header>
                        {linkstoshow.map(item=> (
                            <Menu.Item 
                            key={item} 
                            name={item.name}
                            href={item.content} 
                            target="_blank"/>
                        ))} 
                        </Menu> 
                    </Container></> ):(<></>)}
                    <Menu secondary className="tags-menu"> 
                        <Menu.Item name={tagsToShow[0].name}></Menu.Item>
                        <Menu.Item name={tagsToShow[1].name}></Menu.Item>
                        <Menu.Item name={tagsToShow[2].name}></Menu.Item>
                    
                        <Menu.Menu position="right">
                            <Dropdown item text='more'>
                                <Dropdown.Menu>
                                {additionalToShow.map(item=> (
                                        <Dropdown.Item key={item._id}>{item.name}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Menu>
                </Container>
            </Container>
        </Container>
    )
}

export default SingleSound;