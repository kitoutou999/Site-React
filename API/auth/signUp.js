import API_URL from "../apiUrl.js"

const SIGN_UP = `
mutation SignUp($username: String!, $password: String!) {
  signUp(username: $username, password: $password)
}
`

export default function signUp(login, password) {

    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        query: SIGN_UP,
        variables: {
            username: login,
            password: password
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
        return jsonResponse.data.signUp
    })
    .catch(error => {
        throw error
    })

}
