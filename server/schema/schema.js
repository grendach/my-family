const graphql = require('graphql');
const _=require('lodash');
const Person = require('../models/person');
const Family = require('../models/family');

const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        surname: {type: GraphQLString},
        age: {type: GraphQLInt},
        biography: {type: GraphQLString},
        family: {
            type: FamilyType,
            resolve(parent, args){
                return Family.findById(parent.familyId)
            }
        }
    })
});

const FamilyType = new GraphQLObjectType({
    name: 'Family',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        members: {
            type: new GraphQLList(PersonType),
            resolve(parent, args){
                return Person.find({familyId: parent.id})
            }
        }
        
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        person: {
            type: PersonType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return Person.findById(args.id);
            }
        },
        family: {
            type: FamilyType,
            args: {id:{type:GraphQLID}},
            resolve(parent, args){
                return Family.findById(args.id);
            }
        },
        humans: {
            type: new GraphQLList(PersonType),
            resolve(parent, args){
                return Person.find({})
            }
        },
        families: {
            type: new GraphQLList(FamilyType),
            resolve(parent, args){
                return Family.find({})
            }
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addFamily:{
            type: FamilyType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                location: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let family = new Family({
                    name: args.name,
                    location: args.location
                });
            return family.save()
            }
        },
        addPerson:{
            type: PersonType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                surname: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                biography: {type: new GraphQLNonNull(GraphQLString)},
                familyId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let person = new Person({
                    name: args.name,
                    surname: args.surname,
                    age: args.age,
                    biography: args.biography,
                    familyId: args.familyId
                });
                return person.save();
            }
        }
    }

})

module.exports = new graphql.GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
});
