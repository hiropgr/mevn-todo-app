export default async function(apiLink, method, body) {
    const response = await fetch('http://localhost:3000/api/' + apiLink, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
    })
    const result = await response.json()
    if(response.status >= 400)
        throw new Error(result.message)
    else return result
}