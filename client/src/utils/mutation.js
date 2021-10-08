import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SOUND = gql`
mutation addSoundPost($postData: soundPostInput!) {
  addSoundPost(postData: $postData) {
    _id
    username
    soundPosts{
      _id
      name
      artist
      author{
        _id
        username
      }
      date
      link
      image
      description
      tags{
          _id
          name
      }
      aditionalTags{
          _id
          name
      }
      followers{
        _id
        username
      }
      comments {
        commentBody
        username
        createdAt
      }
    }
  }
}`;

export const ADD_SKILL = gql`
mutation addSkillPost($postData: skillPostInput!) {
  addSkillPost(postData: $postData) {
    _id
    username
    skillPosts{
      _id
      name
      text
      author{
        _id
        username
      }
      date
      links {
        _id
        name
        content
      }
      image
      description
      tags{
          _id
          name
      }
      aditionalTags{
          _id
          name
      }
      followers{
        _id
        username
      }
      comments {
        commentBody
        username
        createdAt
      }
    }
  }
}`;

export const ADD_TAG = gql`
mutation addTag($name: String) {
  addTag(name: $name){
    _id
    name
  }
}`;