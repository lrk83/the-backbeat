import React, {useState, useEffect} from "react";
import { Container, Image, Header, Button, Menu, Dropdown } from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery, useMutation } from '@apollo/client';
import {GET_SINGLE_SKILL} from '../utils/queries';
import { SAVE_SKILL } from "../utils/mutation";
import Auth from '../utils/auth';

const SingleSound = ({ match }) => {
    
    const [ID]=useState(match.params.skillId);

    const { loading, data } = useQuery(GET_SINGLE_SKILL, {
        variables: { id: ID }
    });

    const skillData = data?.skillPost || {};

    const tagsToShow=skillData.tags;
    const linkstoshow=skillData.links;
    const additionalToShow=skillData.aditionalTags;

    const loggedIn = Auth.loggedIn();

    if (loggedIn){
        var userId = Auth.getProfile().data._id;
    }

    const [skillIsSaved, setSkillIsSaved] = useState(false);
    const [addSkill] = useMutation(SAVE_SKILL);

    const saveSkill = async () => {
        await addSkill(
            {variables: {postId: ID}}
        )
    };

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    useEffect(()=>{
        if(skillData.followers){
            for(let x=0;x<skillData.followers.length;x=x+1){
                if (userId===skillData.followers[x]._id){
                    setSkillIsSaved(true);
                }
            }
        }
    },[skillData.followers, userId])

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
                        {loggedIn && ( <> 
                            {skillIsSaved===true ? (<>
                            <Button circular icon='heart' disabled color="twitter" />
                            <Button circular icon='mail' /> 
                            </> ):( <>
                            <Button circular icon='heart' onClick={saveSkill} />
                            <Button circular icon='mail' /> 
                            </>)}
                        </> )}
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