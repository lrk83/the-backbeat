const { AuthenticationError } = require('apollo-server-express');
const { User, SkillPost, SoundPost, Tag, SkillLink, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                    .populate('skillPosts')
                    .populate('soundPosts')
                    .populate('savedSkillPosts')
                    .populate('savedSoundPosts')
                    .populate('friends');
            
                return userData;
            }

            throw new AuthenticationError('Not logged in')
        },
        users: async () => {
            return User.find()
              .select('-__v -password')
              .populate('skillPosts')
              .populate('soundPosts')
              .populate('savedSkillPosts')
              .populate('savedSoundPosts')
              .populate('friends');
          },
          user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('skillPosts')
              .populate('soundPosts')
              .populate('savedSkillPosts')
              .populate('savedSoundPosts')
              .populate('posts');
          },
          skillPosts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return SkillPost.find(params).sort({ createdAt: -1 })
              .populate('comments')
              .populate('followers')
              .populate('tags')
              .populate('aditionalTags')
              .populate('links');
          },
          soundPosts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return SoundPost.find(params).sort({ createdAt: -1 })
              .populate('comments')
              .populate('followers')
              .populate('tags')
              .populate('aditionalTags');
          },
          skillPost: async (parent, { _id }) => {
            return SkillPost.findOne({ _id })
              .populate('comments')
              .populate('followers')
              .populate('tags')
              .populate('aditionalTags')
              .populate('links');
          },
          soundPost: async (parent, { _id }) => {
            return SoundPost.findOne({ _id })
              .populate('comments')
              .populate('followers')
              .populate('tags')
              .populate('aditionalTags');
          },
          skillPostbyTag: async (parent, { tagId }) => {
              const tag = await Tag.findById(tagId);
              return SkillPost.find({tags:{tag}}).sort({createdAt: -1});
          },
          soundPostbyTag: async (parent, { tagId }) => {
            const tag = await Tag.findById(tagId);
            return SoundPost.find({tags:{tag}}).sort({createdAt: -1});
          },
          skillLink: async(parent, {postId}) => {
            const post = await SkillPost.findById(postId);
            return post.links;
          }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        addPost: async (parent, args, context) => {

            if (context.user) {

              const genre = await Genre.findById(args.genreID);

              const post = await Post.create({ genre:genre, postDescription:args.postDescription, username: context.user.username });
      
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { posts: post._id } },
                { new: true }
              );
      
              return post;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
        followPost: async(parent, args, context) => {

            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $push: { savedPosts:  args.postData  } },
                    { new: true }
                );
                
                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        removePost: async(parent, { postId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: {savedPosts: {postId: postId}}},
                    { new: true}
                );

                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        addComment: async (parent, { postId, commentBody }, context) => {
            if (context.user) {
              const updatedPost = await Post.findOneAndUpdate(
                { _id: postId },
                { $push: { comments: { commentBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
      
              return updatedPost;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
          addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          }
    }
};

module.exports = resolvers;