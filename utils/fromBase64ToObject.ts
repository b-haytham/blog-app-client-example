

export const fromBase64ToObject = (base64: string) :object => {
    const json = atob(base64) 
    return  JSON.parse(json)
}