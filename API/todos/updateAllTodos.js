import API_URL from "../apiUrl.js"

const UPDATE_TODOS = `
mutation UpdateTodos($where: TodoWhere, $update: TodoUpdateInput) {
  updateTodos(where: $where, update: $update) {
    todos {
      id
      content
      done
    }
  }
}
`

export default function updateAllTodos(todoListId, done, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: UPDATE_TODOS,
            variables: {
                "where": {
                    "done": !done,
                    "belongsTo": {
                        "id": todoListId
                    }
                },
                "update": {
                    "done": done
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
    return jsonResponse.data.updateTodos.todos;
    })
    .catch(error => {
        console.log('error API', error.message)
        throw error
    })
}
