import API_URL from "../apiUrl.js"

const UPDATE_TODOLIST = `
mutation Mutation($update: TodoListUpdateInput, $where: TodoListWhere) {
    updateTodoLists(update: $update, where: $where) {
      todoLists {
        id
        title
        owner {
          username
        }
      }
    }
}
`

export default function updateTodoList(todoListId, newTitle, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        query: UPDATE_TODOLIST,
        variables: {
          "update": {
            "title": newTitle
          },
          "where": {
            "id": todoListId
          }
        }
      })
    })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.updateTodoLists.todoLists[0]
    })
    .catch(error => {
        console.log('error API', error.message)
        throw error
    })
}