const { GraphQLError } = require("graphql");
const { Comment, Photo, User } = require('../models');

const { signToken, AuthenticationError } = require('../utils/jwt');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('photos');
        },
        users: async () => {
            return User.find().populate('photos');
        },
        photos: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Photo.find({}).sort({ createdAt: -1 });
        },
        photo: async (parent, { photoId }) => {
            return Photo.findOne({ _id: photoId });
        },
        searchPhotos: async (parent, { searchTerm }) => {
            if (searchTerm) {
                return Photo.find({
                    $or: [
                        { title: { $regex: searchTerm, $options: 'i' } },
                        // { description: { $regex: searchTerm, $options: 'i' } },
                        // { photoOwner: { $regex: searchTerm, $options: 'i' } },
                    ],
                });
            }
            throw new GraphQLError('No results found');
        }

    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            console.log("🚀 ~ file: resolvers.js:26 ~ addUser: ~ username, email, password:", username, email, password)
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
        },

        addPhoto: async (parent, { description, photoOwner, title, imageLink }) => {
            const photo = await Photo.create({description, photoOwner, title, imageLink});
            await User.findOneAndUpdate(
                { username: photoOwner },
                { $addToSet: { photos: photo._id } }
            );
            return photo;
        },

        savePhoto: async (parent, { photoId, username }) => {
            return await User.findOneAndUpdate(
                { username },
                { $addToSet: { savedPhotos: photoId } }
            );
        },
            

        addComment: async (parent, { photoId, commentBody, username }) => {
            if (username){
                const newComment = { commentBody, username };
                return await Photo.findOneAndUpdate(
                    { _id: photoId },
                    { $push: { comments: newComment } },
                    { new: true, runValidators: true }
                ).catch((err) => {
                    console.log("🚀 ~ file: resolvers.js:88 ~ addComment: ~ err:", err)
                })
            }
            throw AuthenticationError;
        },

        removePhoto: async ({ parent, photoId }, context) => {
            if (context.user) {
                return Photo.findOneAndDelete(
                    { _id: photoId });
            }
            throw AuthenticationError;
        },


        removeComment: async (parent, { photoId, commentId }) => {
            if (commentId) {
                return Photo.findOneAndUpdate(
                    { _id: photoId },
                    { $pull: { comments: { _id: commentId } } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    }
}



module.exports = resolvers;