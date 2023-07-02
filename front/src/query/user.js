import {gql} from '@apollo/client'

export const GET_ALL_TODOS = gql`

    query {
        getAllTodos{
            id, title, content
        }
    }

`

export const GET_ONE_TODO = gql`
    query getTodo($id: ID) {
        getTodo(id: $id) {
            id, title, content
        }
    }

`