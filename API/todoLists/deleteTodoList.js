import API_URL from "../apiUrl.js"

const DELETE_TODOLIST = `
mutation DeleteTodoLists($where: TodoListWhere) {
  deleteTodoLists(where: $where) {
    nodesDeleted
  }
}
`

export default function deleteTodoList(id, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      query: DELETE_TODOLIST,
      variables: {
        "where": {
          "id": id
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
    return jsonResponse.data.deleteTodoLists.nodesDeleted
  })
  .catch(error => {
      console.log('error API', error.message)
    throw error
  })
}