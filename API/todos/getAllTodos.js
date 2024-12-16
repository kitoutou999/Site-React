import API_URL from "../apiUrl.js"

const ALL_TODOS = `
query allTodos($where: TodoWhere) {
  todos(where: $where) {
    content
    done
    belongsTo {
      title
    }
  }
}
`
export default function getAllTodos(username, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
        query: ALL_TODOS,
        variables: {
            "where": {
                "belongsTo": {
                    "owner": {
                        "username": username
                    }
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