import {gql} from 'apollo-boost';

const getFamilyQuery = gql`
    {
        families{
            name
            id
        }
    }
`
const getPersonQuery = gql`
    {
        humans{
            name
            id
        }
    }
`

export {getPersonQuery, getFamilyQuery};