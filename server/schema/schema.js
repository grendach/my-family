const graphql = require('graphql');
const _=require('lodash')

const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;


//dummy data
var person = [
    {name:'Sergii', surname:'Temchenko', age:34, biography:'Lives in canada', id:'1', familyId:'1'},
    {name:'Dmytro', surname:'Grendach', age:35, biography:'DevOps engineer', id:'2', familyId:'2'},
    {name:'Igor', surname:'Temchenko', age:30, biography:'Drives tractor', id:'3', familyId:'1'},
    {name:'Ievgen', surname:'Borysenko', age:25, biography:'dont speek Ukrainian', id:'3', familyId:'3'},
];

var family = [
    {name:'Temchenko', location:'Zhdany', id:'1'},
    {name:'Grendach', location:'Myrgorod', id:'2'},
    {name:'Borysenko', location:'Kramatorsk', id:'3'},
];

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
                return _.find(family, {id: parent.familyId});
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
                return _.filter(person, {familyId: parent.id});
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
                return _.find(person,{id:args.id})
            }
        },
        family: {
            type: FamilyType,
            args: {id:{type:GraphQLID}},
            resolve(parent, args){
                return _.find(family,{id: args.id});
            }
        },
        humans: {
            type: new GraphQLList(PersonType),
            resolve(parent, args){
                return person
            }
        },
        families: {
            type: new GraphQLList(FamilyType),
            resolve(parent, args){
                return family
            }
        }

    }
});

module.exports = new graphql.GraphQLSchema({
    query:RootQuery
});
