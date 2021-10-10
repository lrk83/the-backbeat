import React, {useState, useEffect} from "react";
import { Container,Card, Image, Header, Icon, Button, Menu, Dropdown } from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery, useMutation } from '@apollo/client';
import {GET_SINGLE_SOUND} from '../utils/queries';
import { SAVE_SOUND } from "../utils/mutation";
import Auth from '../utils/auth';
import {Link} from 'react-router-dom';

const SingleSound = ({ match }) => {
    
    const [ID]=useState(match.params.soundId);

    const { loading, data } = useQuery(GET_SINGLE_SOUND, {
        variables: { id: ID }
    });

    const soundData = data?.soundPost || {};
    const tagsToShow=soundData.tags;
    const aditionalToShow=soundData.aditionalTags;

    const loggedIn = Auth.loggedIn();

    if (loggedIn){
        var userId = Auth.getProfile().data._id;
    }

    console.log(soundData);

    const [soundIsSaved, setSoundIsSaved] = useState(false);
    const [addSound] = useMutation(SAVE_SOUND);

    const saveSound = async () => {
        await addSound(
            {variables: {postId: ID}}
        )
    };

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    useEffect(()=>{
        if(soundData.followers){
            for(let x=0;x<soundData.followers.length;x=x+1){
                if (userId===soundData.followers[x]._id){
                    setSoundIsSaved(true);
                }
            }
        }
    },[soundData.followers,userId])

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <Container className="big-container">
            <Container className="shadow-container single-post-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                <Card className="single-post-card">
                    <Image src={soundData.image} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{soundData.artist}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Posted {soundData.date}</span>
                        </Card.Meta>
                        <Card.Description>
                            Here is a description of {soundData.artist}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Link to={'/'}>
                        <Icon name='user'/>
                        Posted by {soundData.author.username}
                        </Link>
                    </Card.Content>
                </Card>
                <Container className="single-post-content">
                    <Header as='h1' className="single-header">{soundData.name}</Header>
                    <div className="buttons-div">
                        <Button color="blue" className="get-pack-button" href={soundData.link} target="_blank">Get Pack</Button>
                        {loggedIn && ( <> 
                            {soundIsSaved===true ? (<>
                            <Button circular icon='heart' disabled color="twitter" />
                            <Button circular icon='mail' /> 
                            </> ):( <>
                            <Button circular icon='heart' onClick={saveSound} />
                            <Button circular icon='mail' /> 
                            </>)}
                        </> )}
                    </div>
                    <Menu secondary className="tags-menu"> 
                        <Menu.Item name={tagsToShow[0].name}></Menu.Item>
                        <Menu.Item name={tagsToShow[1].name}></Menu.Item>
                        <Menu.Item name={tagsToShow[2].name}></Menu.Item>
                    
                        <Menu.Menu position="right">
                            <Dropdown item text='more'>
                                <Dropdown.Menu>
                                    {aditionalToShow.map(item=> (
                                        <Dropdown.Item key={item._id}>{item.name}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Menu>
                    <Container className="single-post-para">
                        <p>{soundData.description}</p>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default SingleSound;