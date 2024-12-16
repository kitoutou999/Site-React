import API_URL from "../apiUrl.js"

const SIGN_IN = `
mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
`

export default function signIn(login, password) {

    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        query: SIGN_IN,
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
        return jsonResponse.data.signIn
    })
    .catch(error => {
        throw error
    })

}
