export default async function(link, params) {
    const response = await fetch(link, params)
    const result = await response.json()
    if(response.status >= 400)
        throw new Error(result.message)
    else return result
}