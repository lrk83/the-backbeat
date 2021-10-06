const faker = require('faker');

const db = require('../config/connection');
const { User, SkillPost, SoundPost, Tag, Comment, SkillLink } = require('../models');

const images=["https://visme.co/blog/wp-content/uploads/2017/08/14-Visual-Hierarchy-Principles-Every-Non-Designer-Needs-to-Know-Negative-space-emphasizes-and-organizes-01.png",
"http://www.robotspacebrain.com/wp-content/uploads/2011/11/Japanese-Poster-Color-in-Japan-Yusaku-Kamekura-1964.jpg",
"https://splice-res.cloudinary.com/image/upload/f_auto,q_auto,w_auto/c_limit,w_450/v1587565333/1587565331.jpg",
"https://splice-res.cloudinary.com/image/upload/f_auto,q_auto,w_auto/c_limit,w_450/v1605817371/pvphvdog3d0wjvxc1ljl.jpg",
"https://pbs.twimg.com/profile_images/1322213646643220481/lpwyC2f-_400x400.jpg",
"https://img.discogs.com/e69k8asg7UJjJuWeLAO7A_3S90M=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-11510432-1517628280-1424.jpeg.jpg",
"https://media.pitchfork.com/photos/5e418e89159e01000820c1e8/1:1/w_600/Unlocked_Denzel%20Curry_Kenny%20Beats.jpg",
"http://thevinylfactory.com/wp-content/uploads/2016/12/c-disguise-crate.jpg",
"https://assets.podomatic.net/ts/28/17/3a/podcast82542/300x300_15320460.jpg?1611981312",
"https://f4.bcbits.com/img/a3949768515_10.jpg"]

db.once('open', async() => {
    await User.deleteMany({});
    await SkillPost.deleteMany({});
    await SoundPost.deleteMany({});
    await Tag.deleteMany({});
    await Comment.deleteMany({});
    await SkillLink.deleteMany({});

    //create user data
    const userData = [];

    for(let i=0; i<50; i+=1) {
        const username=faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        userData.push({username, email, password});
    }

    let createdUsers = await User.collection.insertMany(userData);

    //follow users
    for (let i = 0; i < 100; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];
    
        let friendId = userId;
    
        while (friendId === userId) {
          const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
          friendId = createdUsers.ops[randomUserIndex];
        }
    
        await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
    }

    //create Tags
    const tagData=[];
    
    for (let i=0; i<200; i+=1){
        const name=faker.lorem.words(1);
        tagData.push({name});
    }

    let createdTags = await Tag.collection.insertMany(tagData);

    //create Links
    const linkData =[];

    for (let i=0; i<100; i+=1){
        const name=faker.lorem.words(2);
        const content="https://splice.com/home";
        linkData.push({name, content});
    }
    
    const createdLinks = await SkillLink.collection.insertMany(linkData);

    //create skill posts
    let createdSkillPosts = [];

    for (let i = 0; i < 100; i += 1) {
        const name = faker.lorem.words(Math.round(Math.random()*5)+1);
        const image = images[(Math.floor(Math.random()*10))];
        const description = faker.lorem.paragraphs(1);
        const text = faker.lorem.paragraphs(Math.round(Math.random() * 7) + 1);
        const followers= [];

        const randomTagIds=[];
        for (x=0;x<3;x+=1){
            let randomTagIndex = Math.floor(Math.random()*createdTags.ops.length);
            let {name, _id: tagId }=createdTags.ops[randomTagIndex];
            randomTagIds.push(tagId);
        };
        
        var createdSkill = await SkillPost.create({name, image, description, text, randomTagIds, followers});

        const additionalTagLength = Math.floor(Math.random()*5);
        for (y=0;y<additionalTagLength;y+=1){
            let randomTagIndex = Math.floor(Math.random()*createdTags.ops.length);
        
            createdSkill = await SkillPost.updateOne(
                {_id:createdSkill._id},
                { $push: { additionalTags: createdTags.ops[randomTagIndex] }}
            );
        };

        const linkLength = Math.floor(Math.random()*5);
        for (y=0;y<linkLength;y+=1){
            let randomLinkIndex = Math.floor(Math.random()*createdLinks.ops.length);
        
            createdSkill = await SkillPost.updateOne(
                {_id:createdSkill._id},
                { $push: { links: createdLinks.ops[randomLinkIndex] }}
            )
        };

        const randomUserIndex=Math.floor(Math.random()*createdUsers.ops.length);
        const { username, _id: userId }=createdUsers.ops[randomUserIndex];

        await User.updateOne(
            {_id: userId},
            { $push: {skillPosts: createdSkill._id}}
        );

        createdSkillPosts.push(createdSkill);
    };

    //create sound posts
    let createdSoundPosts = [];

    for (let i = 0; i < 100; i += 1) {
        const name = faker.lorem.words(Math.round(Math.random()*5)+1);
        const artist = faker.lorem.words(2);
        const image = images[(Math.floor(Math.random()*10))];
        const description = faker.lorem.paragraphs(1);
        const link = "https://splice.com/home";
        followers = [];

        const randomTagIds=[];
        for (x=0;x<3;x+=1){
            let randomTagIndex = Math.floor(Math.random()*createdTags.ops.length);
            let {name, _id: tagId }=createdTags.ops[randomTagIndex];
            randomTagIds.push(tagId);
        };
        
        let createdSound = await SoundPost.create({name, artist, image, description, link, randomTagIds, followers});

        const additionalTagLength = Math.floor(Math.random()*5);
        for (y=0;y<additionalTagLength;y+=1){
            let randomTagIndex = Math.floor(Math.random()*createdTags.ops.length);
        
            createdSound = await SoundPost.updateOne(
                {_id:createdSound._id},
                { $push: { additionalTags: createdTags.ops[randomTagIndex] }}
            );
        };

        const randomUserIndex=Math.floor(Math.random()*createdUsers.ops.length);
        const { username, _id: userId }=createdUsers.ops[randomUserIndex];

        await User.updateOne(
            {_id: userId},
            { $push: {soundPosts: createdSkill._id}}
        );

        createdSoundPosts.push(createdSound);
    };

    //create skill post comments
    for (let i = 0; i < 100; i += 1) {
        const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];

        let createdComment = await Comment.create({commentBody, username});
    
        const randomPostIndex = Math.floor(Math.random() * createdSkillPosts.length);
        const { _id: postId } = createdSkillPosts[randomPostIndex];
    
        await SkillPost.updateOne(
          { _id: postId },
          { $push: { comments: createdComment } },
          { runValidators: true }
        );
    }

    //create sound post comments
    for (let i = 0; i < 100; i += 1) {
        const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];
    
        let createdComment = await Comment.create({commentBody, username});

        const randomPostIndex = Math.floor(Math.random() * createdSoundPosts.length);
        const { _id: postId } = createdSoundPosts[randomPostIndex];
    
        await SoundPost.updateOne(
          { _id: postId },
          { $push: { comments: createdComment } },
          { runValidators: true }
        );
    }

    //save skill posts
    for (let i = 0; i < 100; i += 1) {
        const randomSkillIndex = Math.floor(Math.random() * createdSkillPosts.length);
        const { _id: postId } = createdSkillPosts[randomSkillIndex];

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];
    
        await User.updateOne({ _id: userId }, { $addToSet: { savedSkillPosts: postId } });
        await SkillPost.updateOne({_id:postId}, { $addToSet: {followers: userId}});
    }

    //save sound posts
    for (let i = 0; i < 100; i += 1) {
        const randomSoundIndex = Math.floor(Math.random() * createdSoundPosts.length);
        const { _id: postId } = createdSoundPosts[randomSoundIndex];

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];
    
        await User.updateOne({ _id: userId }, { $addToSet: { savedSoundlPosts: postId } });
        await SoundPost.updateOne({_id:postId}, { $addToSet: {followers: userId}});
    }

    console.log('all done!');
    process.exit(0);
})