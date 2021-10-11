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
                    .populate('followers')
                    .populate('followedUsers');

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
              .populate('followers');
          },
          user: async (parent, { userId }) => {
            return User.findOne({ _id:userId })
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
            const defaultImage = "data:image/png;base64,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"
          
            const user = await User.create({...args,image:defaultImage,description:""});
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

                const updatedPost = await SkillPost.findOneAndUpdate(
                  {_id:postId},
                  { $push: { followers:updatedUser } },
                  { new: true }
                );
                
                return updatedPost.populate('followers');
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

              const updatedPost = await SoundPost.findOneAndUpdate(
                {_id:postId},
                { $push: { followers:updatedUser } },
                { new: true }
              )
              
              return updatedPost.populate('followers');
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
      followUser: async (parent, { userId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { followedUsers: userId } },
                { new: true }
              )

              const followedUser = await User.findOneAndUpdate(
                { _id: userId },
                {$addToSet: {followers: context.user._id}},
                { new: true }
              ).populate("followers")
      
              return followedUser;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
          updateUser: async (parent, args, context) => {
            
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id},
                { image: args.image, description: args.description, followedTags: args.followedTags },
                { new: true }
              )

              return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
          }
      }
      
};

module.exports = resolvers;