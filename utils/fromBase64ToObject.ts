

export const fromBase64ToObject = (base64: string) :object => {
    const buff = Buffer.from(base64, 'base64')

    
    return  JSON.parse(buff.toString('utf8'))
}