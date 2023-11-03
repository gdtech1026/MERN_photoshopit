const { GraphQLError } = require("graphql");

const { signToken, AuthenticationError } = require('../utils/jwt');


const { Photo, User } = require('../models');


const resolvers = {
    Query: {
        me: async (parent, args, context, { _id }) => {
            if (context.user) {
                const params = _id ? { _id } : {};
                return User.find(params);
            }

        },

        Mutation: {

            addUser: async (_, args, { username, email, password }) => {

                try {
                    const user = await User.create(args);
                    const token = signToken({
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                    });

                    return { token };
                } catch (error) {
                    return new GraphQLError("Invalid Sign Up", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                        },
                    });
                }


                // const user = await User.create({ username, email, password });

                // const token = signToken(user);

                // return { token, user };

            },
            login: async (_, args, { email, password }) => {
                const user = await User.findOne({ email: args.email, });

                if (!user) {
                    throw AuthenticationError;
                }

                const correctPw = await user.isCorrectPassword(args.password);

                if (correctPw) {
                    const token = signToken({
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                    });

                    return { token };
                } else {
                    throw AuthenticationError;
                }

                // const token = signToken(user);
                // return { token, user };
            },

            addPhoto: async (parent, { userId, photo }, context) => {
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

            removePhoto: async (parent, { photo }, context) => {
                if (context.user) {
                    return User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { photos: photo } },
                        { new: true }
                    );
                }
                throw AuthenticationError;
            },
        },
    }

}

module.exports = resolvers;