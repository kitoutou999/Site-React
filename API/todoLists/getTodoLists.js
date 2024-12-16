import API_URL from "../apiUrl.js"

const TODO_LISTS = `
query Query($where: TodoListWhere) {
  todoLists(where: $where) {
    id
    title
  }
}
`

export default function getTodoLists(username, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        query: TODO_LISTS,
        variables: {
          "where": {
            "owner": {
              "username": username
            }
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
        return jsonResponse.data.todoLists;
      })
      .catch(error => {
        console.log('error API', error.message)
        throw error
      })
}
