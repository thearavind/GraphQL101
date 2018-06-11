'use strict'

import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
    name: 'Login response',
    description: 'Schema of the login response object',

    fields: () => ({
        user_name: {
            type: GraphQLString,
            resolve: user =>
                user.user_name
        },
        _id: {
            type: GraphQLInt,
            resolve: user =>
                user._id
        },
        department: {
            type: GraphQLString,
            resolve: user =>
                user.department
        },
        joined_date: {
            type: GraphQLString,
            resolve: user =>
                user.joined_date
        },
        email_id: {
            type: GraphQLString,
            resolve: user =>
                user.email_id
        },
        role: {
            type: GraphQLString,
            resolve: user =>
                user.role
        },
        refresh_token: {
            type: GraphQLString,
            resolve: user =>
                user.refresh_token
        },
    })
})
