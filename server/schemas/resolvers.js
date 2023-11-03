

const { signToken, AuthenticationError } = require('../utils/auth');


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

            addUser: async (parent, { username, email, password }) => {

                console.log(" Hello " + email);

                const user = await User.create({ username, email, password });

                console.log(" After create User ");

                const token = signToken(user);

                return { token, user };

            },
            login: async (parent, { email, password }) => {
                const profile = await User.findOne({ email });

                if (!profile) {
                    throw AuthenticationError;
                }

                const correctPw = await profile.isCorrectPassword(password);

                if (!correctPw) {
                    throw AuthenticationError;
                }

                const token = signToken(profile);
                return { token, profile };
            },

            addPhoto: async (parent, { profileId, photo }, context) => {
                console.log("profile and photo" + profileId, Photo)
                if (context.user) {
                    console.log("context.user " + context.user)
                    return await User.findOneAndUpdate(
                        {
                            _id: profileId
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