import React, {useEffect} from "react";
import { Container,Card, Image, Header, Icon} from "semantic-ui-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const SingleSound = (data) => {

    const userData = data?.data || {};

    useEffect(()=>{
        AOS.init({
            duration:200
        })
    })

    return(
        <Container className="user-profile-data">
            <Card className="single-post-card">
                <Image src={userData.image} wrapped ui={false} />
            </Card>
            <Container className="single-post-content">
                <Card className="user-info-card">
                    <Header as='h1' className="single-header">{userData.username}</Header>
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

            </Container>
        </Container>
    )
}

export default SingleSound;