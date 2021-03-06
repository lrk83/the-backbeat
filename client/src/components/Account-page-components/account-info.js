import React, {useEffect, useState} from "react";
import { Icon, Container,Card, Image, Header, Button} from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { FOLLOW_USER } from "../../utils/mutation";

const SingleSound = (data) => {

    const loggedIn = Auth.loggedIn();

    const userData = data?.data || {};

    const [followUser] = useMutation(FOLLOW_USER);

    const [userIsSaved, setUserIsSaved] = useState(false);

    if (loggedIn){
        var loggedInUserData = Auth.getProfile();

        var IAmUser = (loggedInUserData.data._id===userData._id);
    }

    const saveUser = async () => {
        await followUser(
            {variables: {userId: userData._id}}
        )
    };
    
    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    useEffect(()=>{
        if(userData.followers){
            if (loggedIn){
                if (!IAmUser){
                    for(let x=0;x<userData.followers.length;x=x+1){
                        if (loggedInUserData.data._id===userData.followers[x]._id){
                            setUserIsSaved(true);
                        }
                    }
                }
            }
        }
    },[userData.followers, loggedInUserData.data._id])

    return(
        <Container className="user-profile-data">

            {window.screen.width<=540 ? (
                <Container className="single-post-content">
                    <Card className="user-info-card">
                        <Image src={userData.image}/>
                        <Header as='h1' className="single-header">{userData.username}</Header>
                        <Card.Content className="user-description">{userData.description}</Card.Content>
                        <Card.Content extra className="account-stats">
                            <div>
                                <Icon name='user'/>
                                Followers: {userData.followerCount}
                            </div>
                            <div>
                                <Icon name="industry" />
                                Skill posts: {userData.skillPostCount}
                            </div>
                            <div>
                                <Icon name='bandcamp' />
                                Sound posts: {userData.skillPostCount}
                            </div>
                        </Card.Content>
                    </Card>
                    {loggedIn && ( <>
                        {IAmUser? ( <> <Button color="blue" className="get-pack-button">Edit Profile</Button> </> ):( <> 
                            {userIsSaved? ( <>
                                <Button color="blue" disabled className="get-pack-button">Followed</Button>
                            </> ):( <>
                                <Button className="follow-user-button" onClick={saveUser}>Follow User</Button>
                            </>)}
                        </>)}
                    </> ) } 
                </Container>
            ) : ( <>
                <Container className="single-post-content">
                    <Container className="profile-picture-container">
                        <Image className="profile-picture" src={userData.image} />
                    </Container>
                    <Container className="info-and-buttons">
                        <Card className="user-info-card">
                            <Header as='h1' className="single-header">My Info</Header>
                            <Card.Content>{userData.description}</Card.Content>
                            <Card.Content extra className="account-stats">
                                <div>
                                    <Icon name='user'/>
                                    Followers: {userData.followerCount}
                                </div>
                                <div>
                                    <Icon name="industry" />
                                    Skill posts: {userData.skillPostCount}
                                </div>
                                <div>
                                    <Icon name='bandcamp' />
                                    Sound posts: {userData.skillPostCount}
                                </div>
                            </Card.Content>
                        </Card>
                        {loggedIn && ( <>
                            {IAmUser? ( <> <Button color="blue" className="get-pack-button">Edit Profile</Button> </> ):( <> 
                                {userIsSaved? ( <>
                                    <Button color="blue" disabled className="get-pack-button">Followed</Button>
                                </> ):( <>
                                    <Button className="get-pack-button" onClick={saveUser}>Follow User</Button>
                                </>)}
                            </>)}
                        </> ) }
                    </Container>
                </Container> 
            </>)}
        </Container>
    )
}

export default SingleSound;