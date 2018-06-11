'use strict'

import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import userType from './user-schema'
import bookType from './book-schema'

export default new GraphQLObjectType({
    name: 'fetch_user_and_book',
    description: 'Fetch the users and books from DB',
    fields: () => ({
        user: {
            type: userType,
            args: {
                email_id: {
                    type: GraphQLString,
                    default_value: () => null
                },
                user_id: {
                    type: GraphQLInt,
                    default_value: () => null
                },
                department: {
                    type: GraphQLString,
                    default_value: () => null
                },
                user_name: {
                    type: GraphQLString,
                    default_value: () => null
                }
            },
            resolve: (root, args, context) => context.userFetcher.load({...args})
        },
        book: {
            type: new GraphQLList(bookType),
            args: {
                _id: {
                    type: GraphQLInt,
                    default_value: () => null
                },
                title: {
                    type: GraphQLString,
                    default_value: () => null
                },
                authorId: {
                    type: GraphQLInt,
                    default_value: () => null
                },
                rent_id: {
                    type: GraphQLInt,
                    default_value: () => null
                }
            },
            resolve: (root, args, context) => context.bookFetcher.load({...args})
        }
    })
})
