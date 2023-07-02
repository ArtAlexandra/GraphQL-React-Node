import {gql} from '@apollo/client'

export const CREATE_TODO = gql`
    mutation createTodo($input: TodoInput) {
        createTodo(input: $input) {
            id, title, content
        }
    }
`