import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        followerCount
        image
        description
        followedTags {
            _id
            name
        }
        followers {
            _id
            username
        }
        followedUsers{
            _id
            username
        }
        soundPostCount
        image
        followedTags {
            _id
            name
        }
        soundPosts{
            _id
            link
            name
            description
            artist
            date
            image
            followerCount
            tags {
                _id
                name
            }
            aditionalTags {
                _id
                name
            }
        }
        skillPostCount
        skillPosts{
            _id
            name
            date
            description
            image
            followerCount
        }
        savedSoundPostCount
        savedSoundPosts{
            _id
            name
            artist
            date
            image
            followerCount
        }
        savedSkillPostCount
        savedSkillPosts{
            _id
            name
            date
            description
            image
            followerCount
            author {
                _id
                username
            }
        }
    }
}`;

export const GET_SOUNDS_FOR_SUGGESTED = gql`
    {
        allSoundPosts{
            _id
            name
            artist
            date
            image
            followerCount
        }
    }`;

export const GET_SKILLS_FOR_SUGGESTED = gql`
    {
        allSkillPosts{
            _id
            name
            date
            image
            followerCount
            description
            tags{
                _id
                name
            }
            aditionalTags{
                _id
                name
            }
        }
    }`;

export const GET_SINGLE_SOUND = gql`
    query soundPost($id: ID!){
        soundPost(_id: $id){
            _id
            name
            artist
            date
            link 
            image
            description
            tags {
                _id
                name
            }
            aditionalTags{
                _id
                name
            }
            author {
                _id
                username
            }
            followerCount
            followers{
                _id
                username
            }
            comments{
                _id
                commentBody
                username
                createdAt
            }
            commentCount
        }
    }`;

export const GET_SINGLE_SKILL = gql`
    query skillPost($id: ID!){
        skillPost(_id: $id){
            _id
            name
            date
            image
            description
            text
            links {
                _id
                name
                content
            }
            tags {
                _id
                name
            }
            aditionalTags{
                _id
                name
            }
            author {
                _id
                username
            }
            followerCount
            followers{
                _id
                username
            }
            comments{
                _id
                commentBody
                username
                createdAt
            }
            commentCount
        }
    }`;

export const GET_TAGS = gql`
    {
        tags{
            _id
            name
        }
    }`;

export const GET_USERS = gql`
{
    users {
        _id
        username
        email
        followerCount
        image
        date
        followedTags {
            _id
            name
        }
        followers {
            _id
            username
        }
        soundPostCount
        soundPosts{
            _id
            link
            name
            description
            artist
            date
            image
            followerCount
            tags {
                _id
                name
            }
            aditionalTags {
                _id
                name
            }
        }
        skillPostCount
        skillPosts{
            _id
            name
            date
            description
            image
            followerCount
        }
        savedSoundPostCount
        savedSoundPosts{
            _id
            name
            artist
            date
            image
            followerCount
        }
        savedSkillPostCount
        savedSkillPosts{
            _id
            name
            date
            description
            image
            followerCount
            author {
                _id
                username
            }
        }
    }
}`;

export const GET_SINGLE_USER = gql`
query user($userId: ID!){
    user(userId: $userId){
        _id
        username
        email
        followerCount
        description
        image
        followedTags {
            _id
            name
        }
        followers {
            _id
            username
        }
        soundPostCount
        soundPosts{
            _id
            link
            name
            description
            artist
            date
            image
            followerCount
            tags {
                _id
                name
            }
            aditionalTags {
                _id
                name
            }
        }
        skillPostCount
        skillPosts{
            _id
            name
            date
            description
            image
            followerCount
        }
        savedSoundPostCount
        savedSoundPosts{
            _id
            name
            artist
            date
            image
            followerCount
        }
        savedSkillPostCount
        savedSkillPosts{
            _id
            name
            date
            description
            image
            followerCount
            author {
                _id
                username
            }
        }
    }
}`;