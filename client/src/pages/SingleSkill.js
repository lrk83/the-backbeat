import React, {useState, useEffect} from "react";
import { Container,Card, Image, Header, Icon, Button, Menu, Dropdown } from "semantic-ui-react";
import data from '../assets/skilldata.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SingleSound = ({ match }) => {
    
    const [ID]=useState(match.params.skillId);

    console.log(data[ID-1]);

    const [tagsToShow]=useState(data[ID-1].tags);
    const [additionalToShow]=useState(data[ID-1].additional)
    const [linkstoshow]=useState(data[ID-1].links);

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    return(
        <Container className="big-container">
            <Container id="skill-container" className="shadow-container single-post-container" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                <Image className="skill-photo" src={data[ID-1].image}/>
                <Container className="single-post-content">
                    <Header as='h1' className="single-header">{data[ID-1].name}</Header>
                    <Container className="single-post-para">
                        <p>{data[ID-1].description}</p>
                        <div className="skill-buttons-div">
                        <Button circular color='facebook' icon='heart' />
                        <Button circular color='twitter' icon='mail' />
                        </div>
                    </Container>
                    {data[ID-1].links[0] ? ( <>
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
                        <Menu.Item name={tagsToShow[0]}></Menu.Item>
                        <Menu.Item name={tagsToShow[1]}></Menu.Item>
                        <Menu.Item name={tagsToShow[2]}></Menu.Item>
                    
                        <Menu.Menu position="right">
                            <Dropdown item text='more'>
                                <Dropdown.Menu>
                                    {additionalToShow.map(item=> (
                                        <Dropdown.Item key={item}>{item}</Dropdown.Item>
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