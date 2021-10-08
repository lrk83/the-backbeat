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
          allSkillPosts: async () => {
            return SkillPost.find()
            .populate('comments')
            .populate('followers')
            .populate('tags')
            .populate('aditionalTags')
            .populate('links');
          },
          allSoundPosts: async () => {
            return SoundPost.find()
              .populate('comments')
              .populate('followers')
              .populate('tags')
              .populate('aditionalTags');
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
              .populate('author')
              .populate('comments')
              .populate('followers')
              .populate('tags')
              .populate('aditionalTags');
          },
          skillPost: async (parent, { _id }) => {
            return SkillPost.findOne({ _id })
              .populate('author')
              .populate('comments')
              .populate('followers')
              .populate('tags')
              .populate('aditionalTags')
              .populate('links');
          },
          soundPost: async (parent, { _id }) => {
            const post = await SoundPost.findOne({ _id })
              .populate('author')  
              .populate('comments')
              .populate('followers')
              .populate('tags')
              .populate('aditionalTags');

            console.log(post);
            return post;
          },
          skillPostbyTag: async (parent, { tagId }) => {
              const tag = await Tag.findById({_id:tagId});
              return SkillPost.find({tags:{tag}}).sort({createdAt: -1});
          },
          soundPostbyTag: async (parent, { tagId }) => {
            const tag = await Tag.findById({_id:tagId});
            return SoundPost.find({tags:{tag}}).sort({createdAt: -1});
          },
          skillLink: async(parent, {postId}) => {
            const post = await SkillPost.findById({_id:postId});
            return post.links;
          },
          tags: async (parent, args, context) => {
            const tags = await Tag.find();
            
            return tags;
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
        addSkillPost: async (parent, {postData}, context) => {

          if (context.user) {
            const author = await User.findOne(
              {_id: context.user._id}
            );

            const post = await SkillPost.create({ ...postData, author: author });

            const updatedUser = await User.findOneAndUpdate(
              {_id: context.user._id},
              { $push: {skillPosts: post}},
              {new: true}
            )

            return updatedUser;
          }
    
          throw new AuthenticationError('You need to be logged in!');
        },
        addSoundPost: async (parent, {postData}, context) => {
            if (context.user) {
              const author = await User.findOne(
                {_id: context.user._id}
              );

              const post = await SoundPost.create({ ...postData, author: author });

              const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                { $push: {soundPosts: post}},
                {new: true}
              )

              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in!');
        },
        saveSkillPost: async(parent, {postId}, context) => {

            if (context.user) {
                const post = await SkillPost.findById({_id:postId});

                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $push: { savedSkillPosts:  post  } },
                    { new: true }
                );
                
                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        saveSoundPost: async(parent, {postId}, context) => {

          if (context.user) {
              const post = await SoundPost.findById({_id:postId});

              const updatedUser = await User.findOneAndUpdate(
                  { _id: context.user._id},
                  { $push: { savedSoundPosts:  post  } },
                  { new: true }
              );
              
              return updatedUser;
          }

          throw new AuthenticationError("You need to be logged in!");
        },
        removeSkillPost: async(parent, { postId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: {savedSkillPosts: {_id: postId}}},
                    { new: true}
                );

                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        removeSoundPost: async(parent, { id }, context) => {
          if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                  {_id: context.user._id},
                  { $pull: {savedSoundPosts: {_id: id}}},
                  { new: true}
              );

              return updatedUser;
          }

          throw new AuthenticationError("You need to be logged in!");
        },
        deleteSkillPost: async(parent, { id }, context) => {

          console.log(id);

          if (context.user) {
              const postToRemove = await SkillPost.findOne({_id:id})

              const updatedUser = await User.findOneAndUpdate(
                  {_id: context.user._id},
                  { $pull: {skillPosts: {postToRemove}}},
                  { new: true}
              );

              return updatedUser;
          }

          throw new AuthenticationError("You need to be logged in!");
      },
      deleteSoundPost: async(parent, { id }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                { $pull: {soundPosts: {_id: id}}},
                { new: true}
            );

            return updatedUser;
        }

        throw new AuthenticationError("You need to be logged in!");
      },
        addCommentSkill: async (parent, { postId, commentBody }, context) => {
            if (context.user) {
              const updatedPost = await SkillPost.findOneAndUpdate(
                { _id: postId },
                { $push: { comments: { commentBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
      
              return updatedPost;
            };
      
            throw new AuthenticationError('You need to be logged in!');
        },
        addCommentSound: async (parent, { postId, commentBody }, context) => {
          if (context.user) {
            const updatedPost = await SoundPost.findOneAndUpdate(
              { _id: postId },
              { $push: { comments: { commentBody, username: context.user.username } } },
              { new: true, runValidators: true }
            );
    
            return updatedPost;
          };
    
          throw new AuthenticationError('You need to be logged in!');
      },
      addTag: async (parent, {name}, context) => {
        if (context.user){
          return await Tag.create({name: name});
        };

        throw new AuthenticationError('You need to be logged in!');
      },
      addLink: async (parent, {name, content}, context) => {
        if (context.user){
          return await SkillLink.create({name:name, content: content});
        };

        throw new AuthenticationError('You need to be logged in!');
      },
      addLinktoPost: async (parent, {linkId, postId}, context) => {
        if (context.user){
          const link = SkillLink.findById({_id:linkId});
          return await SkillPost.findOneAndUpdate(
            {_id:postId},
            { $push: {links:link}},
            {new: true}
          )
        };

        throw new AuthenticationError('You need to be logged in!');
      },
      addTagtoSkill: async (parent, {tagId, postId}, context) => {
        if (context.user){
          const tag = Tag.findById({_id:tagId});
          return await SkillPost.findOneAndUpdate(
            {_id: postId},
            { $push: {tags: tag}},
            {new: true}
          )
        };

        throw new AuthenticationError('You need to be logged in!');
      },
      addTagtoSound: async (parent, {tagId, postId}, context) => {
        if (context.user){
          const tag = Tag.findById({_id:tagId});
          return await SoundPost.findOneAndUpdate(
            {_id: postId},
            { $push: {tags: tag}},
            {new: true}
          )
        };

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