import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        friendCount
        friends {
            _id
            username
        }
        soundPostCount
        soundPosts{
            _id
            name
            artist
            date
            image
            followerCount
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
}`

export const GET_SOUNDS_FOR_SUGGESTED = gql`
{
    soundPosts{
        _id
        name
        artist
        date
        image
        followerCount
    }
}`