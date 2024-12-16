import API_URL from "../apiUrl.js"

const UPDATE_TODO = `
mutation UpdateTodos($where: TodoWhere, $update: TodoUpdateInput) {
  updateTodos(where: $where, update: $update) {
    todos {
      id
      content
      done
    }
  }
}`

export default function updateContentTodo(todoId, content, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: UPDATE_TODO,
            variables: {
                "where": {
                    "id": todoId
                },
                "update": {
                    "content": content
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
    return jsonResponse.data.updateTodos.todos[0]
    })
    .catch(error => {
        console.log('error API', error.message)
    throw error
    })
}