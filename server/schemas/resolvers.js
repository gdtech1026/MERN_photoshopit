const { GraphQLError } = require("graphql");
const { Photo, User } = require('../models');

const { signToken, AuthenticationError } = require('../utils/jwt');


const resolvers = {
    Query: {
        me: async (context, { _id }) => {
            if (context.user) {
                const params = _id ? { _id } : {};
                return User.find(params);
            }
        comments: () => {
                return Photo.find();
        }
            photos: Photo


        },
    },

    Mutation: {

        addUser: async (_, args, /*{ username, email, password }*/) => {

            try {
                const user = await User.create(args);
                const token = signToken({
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    password: user.password,
                });

                return { token };

                // const user = await User.create({ username, email, password });

                // console.log(" After create User ");
    
                // const token = signToken(user);
    
                // return { token, user };
            } catch (error) {
                return new GraphQLError("Invalid Sign Up" + error, {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }
        },
        login: async (_, args, /*{ email, password }*/) => {
            try {
                const user = await User.findOne({ email: args.email, });

                const correctPw = await user.isCorrectPassword(args.password);

                if (correctPw) {
                    const token = signToken({
                        _id: user._id,
                        email: user.email,
                        username: user.username,
                        password: user.password,
                    });

                    return { token };
                }
            } catch (error) {
                return error;
            }
        },

        addPhoto: async ({ userId, photo }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    {
                        _id: userId
                    },
                    {
                        $addToSet: { photos: photo },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                )
                    .catch((err) => {
                        console.log(err);
                    })
            }
            throw AuthenticationError;
        },

        removePhoto: async ({ photo }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { photos: photo } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },

        addComment: async ({ photoId, comment }, context) => {
            if (context.user) {
                return await Photo.findOneAndUpdate(
                    {
                        _id: photoId
                    },
                    {
                        $addToSet: { comments: comment },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                )
                    .catch((err) => {
                        console.log(err);
                    })
            }
            throw AuthenticationError;

        },

        
        removeComment: async ({ comment }, context) => {
            if (context.user) {
                return Photo.findOneAndUpdate(
                    { _id: context.photo._id },
                    { $pull: { comments: comment } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    }
}



module.exports = resolvers;