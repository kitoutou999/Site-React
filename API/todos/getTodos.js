import API_URL from "../apiUrl.js"

const TODOS = `
query Todos($where: TodoWhere) {
  todos(where: $where) {
    id
    content
    done
    belongsTo {
      title
    }
  }
}
`
export default function getTodos(todoListId, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
        query: TODOS,
        variables: {
            "where": {
            "belongsTo": {
                "id": todoListId
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
    return jsonResponse.data.todos
    })
    .catch(error => {
        console.log('error API', error.message)
    throw error
    })
}