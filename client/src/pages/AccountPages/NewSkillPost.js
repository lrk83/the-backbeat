import React, {useState, useEffect} from "react";
import { Container, Form, Label, Button, Header} from "semantic-ui-react";
import Auth from '../../utils/auth';
import MenuTabular from '../../components/Menus/MenuTabularNewSkill';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQuery, useMutation, createHttpLink } from '@apollo/client';
import {GET_TAGS} from '../../utils/queries';
import {ADD_SKILL, ADD_TAG, ADD_LINK} from '../../utils/mutation';
import TagSearch from "../../components/Account-page-components/tags-search";

const NewSkillPost = () => {
    if (localStorage.getItem("newTags")===null){
        localStorage.setItem("newTags",JSON.stringify([]));
    }

    const loggedIn = Auth.loggedIn();

    const sections=["post-content","text","links","tags"]

    const [section, updateSection] = useState(sections[0]);
    const [contentData, setContentFormData] = useState({name:"",image:"",description:"",text:"",links:[]});
    const [submissionData, setSubmissionData] = useState({})
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addTagForm, setAddTagForm] = useState('');
    const [additionalLinkCount, setAddLinkCount] = useState([1]);
    const [newLinkText, setNewLinkText] = useState({name:"",content:""});

    const {loading, data} = useQuery(GET_TAGS);
    const tags = data?.tags || {};

    const [chosenTags, setChosenTags]=useState([]);

    const [createSkill] = useMutation(ADD_SKILL);
    const [createTag] = useMutation(ADD_TAG);
    const [createLink] = useMutation(ADD_LINK);

    //Handle which form sections are disabled
    const handleFirstFormSubmit = (event) => {
        event.preventDefault();
        if (section==="post-content"){
            updateSection(sections[1]);
        }
        if (section==="back-to-back"){
            updateSection("back-to-text");
        }
        if (section==="back-to-basics"){
            updateSection(sections[1]);
        }
        if (section==="all-the-way-back"){
            updateSection("back-to-back-to-text");
        }
    };

    const handleSecondFormSubmit = (event) => {
        event.preventDefault();
        if (section==="text"){
            updateSection(sections[2]);
        }
        if (section==="back-to-text"){
            updateSection(sections[2])
        }
        if (section==="back-to-back-to-text"){
            updateSection("back-to-links");
        }
    };

    const handleLinkFormSubmit = (event) => {
        event.preventDefault();
        updateSection(sections[3]);
    }

    const handleThirdFormSubmit = (event) => {
        event.preventDefault();
        
        const tagsToAdd = [];
        const aditionalTagsToAdd = [];
        for(let x=0;x<chosenTags.length;x=x+1){
            
            if (tagsToAdd.length<3){
                const tagToAdd=chosenTags[x].id;
                tagsToAdd.push(tagToAdd);
            } else{
                const chosenTagToAdd = chosenTags[x].id;
                aditionalTagsToAdd.push(chosenTagToAdd);
            }
        };

        const localTags = JSON.parse(localStorage.getItem("newTags"));
        for(let x=0;x<localTags.length;x=x+1){
            if (tagsToAdd.length<3){
                const tagToAdd=localTags[x].id;
                tagsToAdd.push(tagToAdd);
            } else {
                const chosenTagToAdd = localTags[x].id;
                aditionalTagsToAdd.push(chosenTagToAdd);
            }
        }

        setSubmissionData({
            ...contentData,
            tags:tagsToAdd,
            aditionalTags:aditionalTagsToAdd
        });

        //Set up submission
        setReadyToSubmit(true);
        localStorage.setItem("newTags",JSON.stringify([]));
    };

    const handleContentChange = (event) => {
        const { name, value } = event.target;
        setContentFormData({ ...contentData, [name]: value });
    };

    const handleAddTagFormContentChange = (event) => {
        const {value} = event.target;
        setAddTagForm(value);
    }

    const handleLinkContentChange = (event) => {
        const {name, value} = event.target;
        setNewLinkText({...newLinkText, [name]: value});
    }

    const handleAddTag = async (event) => {
        event.preventDefault();

        const updatedTags=JSON.parse(localStorage.getItem('newTags'));

        const newTagFromBackEnd = await createTag(
            {variables: {name: addTagForm}}
        );

        const newFormatedTag = {...newTagFromBackEnd.data.addTag, id: newTagFromBackEnd.data.addTag._id};

        updatedTags.push(newFormatedTag);

        localStorage.setItem('newTags',JSON.stringify(updatedTags));

        setAddTagForm('');
    }

    const handleAddLink = async (event) => {
        event.preventDefault();

        let newAddLinkCount = []
        for (let x=0;x<additionalLinkCount.length;x++){
            newAddLinkCount.push(additionalLinkCount[x])
        }

        let nextCount = additionalLinkCount.length+1;
        newAddLinkCount.push(nextCount);

        setAddLinkCount(newAddLinkCount);

        let newLinks = []
        for(let x=0;x<contentData.links.length;x++){
            newLinks.push(contentData.links[x]);
        }

        const newLinkFromBackEnd = await createLink({
            variables: {name: newLinkText.name, content: newLinkText.content}
        });

        console.log(newLinkFromBackEnd);

        newLinks.push(newLinkFromBackEnd.data.addLink._id);

        setContentFormData({...contentData, links: newLinks});
        console.log(contentData);
        setNewLinkText({name:"",content:""});
    }

    const textBackButton = (event) => {
        event.preventDefault();
        if (section==="back-to-text"){
            updateSection("back-to-back");
        }
        if(section==="back-to-back-to-text"){
            updateSection("all-the-way-back");
        }
        if(section==="text"){
            updateSection("back-to-basics");
        }
    }

    const linkBackButton = (event) => {
        event.preventDefault();
        if (section==="back-to-links"){
            updateSection("back-to-back-to-text");
        }else{
            updateSection("back-to-text");
        }
    }

    const tagsBackButton = (event) => {
        event.preventDefault();
        updateSection("back-to-links");
    }

    const sendToBackEnd = async () => {
        setReadyToSubmit(false);
        
        try {
            await createSkill({
                variables: {postData: {...submissionData}}
            });
            setContentFormData({name:"",image:"",description:"",text:"",links:[]});
            setChosenTags([]);
            updateSection("post-content");

        window.location.assign('/account/profile')
        } catch (err) {
            console.log(err);
            setShowAlert(true);
        }
    }

    //Fade in elements
    useEffect(()=>{
        AOS.init({
            duration:200
        })
    });

    useEffect(() => {
        if (readyToSubmit){
            sendToBackEnd();
        }
    });

    if (loading) {
        return(
            <div>Loading...</div>
        )
    }

    if (!loggedIn) {
        return (
            <div>Please log in to continue</div>
        )
    };

    return(
        <Container className='big-container'>
            {loggedIn && (
                <Container className='shadow-container' data-aos="fade-in" data-aos-delay="100" data-aos-duration="1500">
                <Header as ="h1" className="new-post-header">New Post</Header>

                <MenuTabular choice='skill'></MenuTabular>
                    <Form onSubmit={handleFirstFormSubmit}>
                    {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
                        <Form.Group widths='equal'>
                            <Header as ="h2" className="new-post-header">Basic Info</Header>
                            {section==="post-content" || section==="back-to-basics"  || section==="back-to-back" || section==="all-the-way-back" ? (<>
                                <Form.Input fluid label="Name" name="name" placeholder="Name" required onChange={handleContentChange}/>
                                <Form.Input fluid label="Image" name="image" placeholder="Image URL (You can use right click - image adress)" required onChange={handleContentChange}/>
                                <Form.Input fluid label = "Description" name="description" placeholder="Description" required onChange={handleContentChange}/>
                                <Button
                                    type='submit'
                                    variant='success'>
                                    Next
                                </Button>
                            </>):(<>
                                <Form.Input fluid label="Name" disabled/>
                                <Form.Input fluid label="Image" disabled/>
                                <Form.Input fluid label = "Description" disabled/>
                                <Button className="new-from-submit-one"
                                    type='submit'
                                    disabled
                                    variant='success'>
                                    Next
                                </Button>
                            </>)}
                        </Form.Group>
                    </Form>
                    {section==="text" || section==="links" || section==="tags" || section==="back-to-basics" || section==="back-to-text" || section==="back-to-back" || section==="back-to-links" || section==="back-to-back-to-text" || section==="all-the-way-back" ? (
                         <Form onSubmit={handleSecondFormSubmit}>
                         <Header as ="h2" className="new-post-header">Text</Header>
                             <Form.Group widths='equal'>
                                 {section==="text" || section==="back-to-text" || section==="back-to-back-to-text" ? (<>
                                     <Form.TextArea name="text" placeholder="post text" required onChange={handleContentChange}/>
                                     <Button
                                        onClick={textBackButton}>
                                        Back
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant='success'>
                                        Next
                                    </Button>
                                 </>):(<>
                                    <Form.TextArea name="text" text={contentData.text} disabled/>
                                    <Button
                                        disabled>
                                        Back
                                    </Button>
                                    <Button
                                        disabled
                                        type='submit'
                                        variant='success'>
                                        Next
                                    </Button>
                                 
                                 </>)}
                                 <Form.Field></Form.Field>
                             </Form.Group>
                             
                         </Form>
                    ) : (<></>)}
                    {section==="links" || section==="tags" || section==="back-to-basics" || section==="back-to-text" || section==="back-to-back" || section==="back-to-links" || section==="back-to-back-to-text" || section==="all-the-way-back"? (
                         <Form onSubmit={handleLinkFormSubmit}>
                         <Header as ="h2" className="new-post-header">Links</Header>
                             <Form.Group widths='equal'>
                                 {section==="links" || section==="back-to-links" ? (<>
                                     {additionalLinkCount.map(number=>(<>
                                     <div key={number}>
                                        <Form.Input fluid label="link URL" name="content" placeholder="Add link URL" onChange={handleLinkContentChange}/>
                                        <Form.Input fluid lable="link name" name="name" placeholder="Add link title" onChange={handleLinkContentChange}/>
                                     </div>
                                     </>))}
                                     <Button onClick={handleAddLink}>Add Link</Button>
                                     <Button
                                        onClick={linkBackButton}>
                                        Back
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant='success'>
                                        Next
                                    </Button>
                                 </>):(<>
                                     {additionalLinkCount.map(number=>(<>
                                     <Form.Input fluid label="Add link" name="link" placeholder="Add link" disabled key={number}/>
                                     </>))}
                                     <Button disabled >Add Link</Button>
                                     <Button
                                        disabled>
                                        Back
                                    </Button>
                                    <Button
                                    disabled
                                        type='submit'
                                        variant='success'>
                                        Next
                                    </Button>
                                 </>)}
                                 <Form.Field></Form.Field>
                             </Form.Group>
                             
                         </Form>
                    ) : (<></>)}
                    {section==="tags" || section==="back-to-back-to-text" || section==="all-the-way-back" || section==="back-to-links" ? (
                         <Form onSubmit={handleThirdFormSubmit}>
                         <Header as ="h2" className="new-post-header">Tags</Header>
                             {section==="tags" ? ( <>
                             <TagSearch tags={tags} chosenTags={chosenTags} setChosenTags={setChosenTags} contentData={contentData} setContentFormData={setContentFormData}/>
                             <Form.Group widths="equal">
                             <Form.Input fluid label = "Don't see what you're looking for?" name="add-tag" placeholder="Add tag" value={addTagForm} onChange={handleAddTagFormContentChange}/>
                             <Button onClick={handleAddTag} id="add-tag-button">Add Tag</Button>
                             <Container className='chosen-tags-container'>
                                {chosenTags.map(item=> (
                                    <div className="chosen-tag" key={item.id} >
                                    {item.title}</div>
                                ))}
                                {JSON.parse(localStorage.getItem("newTags")).map(item=>(
                                    <div className="new-tag" key={item.id} >
                                    {item.name}</div>
                                ))}
                             </Container >
                             <Button
                                 onClick={tagsBackButton}>
                                 Back
                             </Button>
                             <Button
                                 type='submit'
                                 variant='success'>
                                Submit
                             </Button>
                             </Form.Group>
                             
                              </> ):(<>
                                <TagSearch tags={tags} chosenTags={chosenTags} setChosenTags={setChosenTags} contentData={contentData} setContentFormData={setContentFormData}/>
                             <Form.Group widths="equal">
                             <Form.Input disabled fluid label = "Don't see what you're looking for?" name="add-tag" placeholder="Add tag" value={addTagForm} onChange={handleAddTagFormContentChange}/>
                             <Button disabled onClick={handleAddTag} id="add-tag-button">Add Tag</Button>
                             <Container className='chosen-tags-container'>
                                {chosenTags.map(item=> (
                                    <div className="chosen-tag" key={item.id} >
                                    {item.title}</div>
                                ))}
                                {JSON.parse(localStorage.getItem("newTags")).map(item=>(
                                    <div className="new-tag" key={item.id} >
                                    {item.name}</div>
                              ))}
                             </Container >
                             <Button
                             disabled
                                 onClick={tagsBackButton}>
                                 Back
                             </Button>
                             <Button
                             disabled
                                 type='submit'
                                 variant='success'>
                                Submit
                             </Button>
                             </Form.Group>
                             
                             </>)}
                         </Form>
                    ) : (<></>)}
                </Container> ) }
        {showAlert? (<Label basic color="red">Something went wrong. Please check your inputs and try again </Label>):(<></>)}
    </Container>
    )
};

export default NewSkillPost;