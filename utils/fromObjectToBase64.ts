


export const fromObjectToBase64= (object: object) : string => {
    const json = JSON.stringify(object)

    return Buffer.from(json).toString('base64')
}


