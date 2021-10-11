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

export const UPDATE_USER = gql`
  mutation updateUser($image: String, $description: String, $followedTags: [ID]) {
    updateUser(image: $image, description: $description, followedTags: $followedTags) {
      _id
      image
      description
      followedTags{
        _id
        name
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

export const SAVE_SKILL = gql`
mutation saveSkillPost($postId: ID) {
  saveSkillPost(postId: $postId){
    _id
    name
    followers{
      _id
      username
    }
  }
}`;

export const SAVE_SOUND = gql`
mutation saveSoundPost($postId: ID) {
  saveSoundPost(postId: $postId){
    _id
    name
    followers{
      _id
      username
    }
  }
}`;

export const FOLLOW_USER = gql`
mutation followUser($userId: ID) {
  followUser(userId: $userId) {
    _id
    username
    followers {
      _id
      username
    }
  }
}`;