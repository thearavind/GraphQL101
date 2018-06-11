'use strict'

import { GraphQLObjectType, GraphQLString, GraphQLEnumType, GraphQLNonNull, GraphQLInt } from 'graphql'
import userType from './user-schema'
import bookType from './book-schema'

const sexEnum = new GraphQLEnumType({
    name: 'SexEnum',
    values: {
        M: {
            value: 'M'
        },
        F: {
            value: 'F'
        }
    }
})

const roleEnum = new GraphQLEnumType({
    name: 'roleEnum',
    values: {
        student: {
            value: 'student'
        },
        admin: {
            value: 'admin'
        }
    }
})

export default new GraphQLObjectType({
    name: 'user_register',
    description: 'Register a new user to the database',
    fields: () => ({
        createUser: {
            type: userType,
            args: {
                email_id: {
                    type: GraphQLString
                },
                department: {
                    type: GraphQLString
                },
                user_name: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
                joined_date: {
                    type: GraphQLString
                },
                sex: {
                    type: GraphQLNonNull(sexEnum)
                },
                role: {
                    type: GraphQLNonNull(roleEnum)
                }
            },
            resolve: (root, args, context) => context.userRegister.load({...args})
        },
        addBook: {
            type: bookType,
            args: {
                title: {
                    type: GraphQLString
                },
                author_id: {
                    type: GraphQLInt
                },
                edition: {
                    type: GraphQLString
                }
            },
            resolve: (root, args, context) => context.addBook.load({...args})
        },
        addAuthorAndBook: {
            type: bookType,
            args: {
                title: {
                    type: GraphQLString
                },
                author_name: {
                    type: GraphQLString
                },
                edition: {
                    type: GraphQLString
                }
            },
            resolve: (root, args, context) => context.addAuthorAndBook.load({...args})
        },
        rentBook: {
            type: bookType,
            args: {
                book_id: {
                    type: GraphQLInt
                },
                user_id: {
                    type: GraphQLInt
                },
                days: {
                    type: GraphQLInt
                }
            },
            resolve: (root, args, context) => context.bookRent.load({...args})
        },
        returnBook: {
            type: bookType,
            args: {
                book_id: {
                    type: GraphQLInt
                }
            },
            resolve: (root, args, context) => context.returnBook.load({...args})
        },
        login: {
            type: userType,
            args: {
                refresh_token: {
                    type: GraphQLString,
                    default_value: () => null
                },
                email_id: {
                    type: GraphQLString,
                    default_value: () => null
                },
                password: {
                    type: GraphQLString,
                    default_value: () => null
                }
            }
        }
    })
})
