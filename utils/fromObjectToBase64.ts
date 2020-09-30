
export const fromObjectToBase64= (object: object) : string => {
    const json = JSON.stringify(object)
    return btoa(json)
}