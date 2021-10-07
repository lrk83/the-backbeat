import React, {useState, useEffect} from "react";
import { Container, Form, Label, Button, Header, Menu } from "semantic-ui-react";
import Auth from '../../utils/auth';
import MenuTabular from '../../components/Menus/MenuTabularNewSkill';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery } from '@apollo/client';
import {GET_TAGS} from '../../utils/queries';
import TagSearch from "../../components/Account-page-components/tags-search";

const NewSkillPost = () => {
    const loggedIn = Auth.loggedIn();

    const sections=["post-content","text","tags"]

    const [section, updateSection] = useState(sections[0]);
    const [contentData, setContentFormData] = useState({name:"",image:"",description:"",text:""});
    const [showAlert, setShowAlert] = useState(false);

    const {loading, data} = useQuery(GET_TAGS);
    const tags = data?.tags || {};

    const [chosenTags, setChosenTags]=useState([]);

    const handleFirstFormSubmit = (event) => {
        event.preventDefault();
        updateSection(sections[1]);
    };

    const handleSecondFormSubmit = (event) => {
        event.preventDefault();
        updateSection(sections[2]);
    };

    const handleThirdFormSubmit = (event) => {
        event.preventDefault();
        updateSection(sections[2]);
    };

    const handleContentChange = (event) => {
        const { name, value } = event.target;
        setContentFormData({ ...contentData, [name]: value });
    };

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    if (!loggedIn) {
        return (
            <div>Please log in to continue</div>
        )
    };

    return(
        <Container className='big-container'>
            {loggedIn && (
                <Container className='shadow-container'>
                <Header as ="h1">New Post</Header>

                <MenuTabular choice='skill'></MenuTabular>
                    <Form onSubmit={handleFirstFormSubmit}>
                    {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                        <Form.Group widths='equal' data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                            {section==="post-content" ? (<>
                                <Form.Input fluid label="name" name="name" placeholder="Name" required onChange={handleContentChange}/>
                                <Form.Input fluid label="image" name="image" placeholder="Image URL" required onChange={handleContentChange}/>
                                <Form.Input fluid label = "description" name="description" placeholder="Description" required onChange={handleContentChange}/>
                            </>):(<>
                                <Form.Input fluid label="name" value={contentData.name} disabled/>
                                <Form.Input fluid label="image" value={contentData.image} disabled/>
                                <Form.Input fluid label = "description" value={contentData.description} disabled/>
                            </>)}
                            <Form.Field></Form.Field>
                        </Form.Group>
                        <Button
                            type='submit'
                            variant='success'>
                            Next
                        </Button>
                    </Form>
                    {section==="text" || section==="tags" ? (
                         <Form onSubmit={handleSecondFormSubmit} data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                         {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                             <Form.Group widths='equal'>
                                 {section==="text" ? (<>
                                     <Form.TextArea label="text" name="text" placeholder="post text" required onChange={handleContentChange}/>
                                 </>):(<>
                                    <Form.TextArea label="text" text={contentData.text} disabled/>
                                 </>)}
                                 <Form.Field></Form.Field>
                             </Form.Group>
                             <Button
                                 type='submit'
                                 variant='success'>
                                 Next
                             </Button>
                         </Form>
                    ) : (<></>)}
                    {section==="tags" ? (
                         <Form onSubmit={handleThirdFormSubmit} data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                         {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                             <Menu>
                                {chosenTags.map(item=> (
                                    <Menu.Item 
                                    key={item.title} 
                                    name={item.title}/>
                                ))} 
                             </Menu>
                             <TagSearch tags={tags} chosenTags={chosenTags} setChosenTags={setChosenTags}/>
                             <Button
                                 type='submit'
                                 variant='success'>
                                Submit
                             </Button>
                         </Form>
                    ) : (<></>)}
                </Container> ) }
    </Container>
    )
};

export default NewSkillPost;