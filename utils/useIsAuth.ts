import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useMeQuery } from "../generated/graphql"


export const useIsAuth = () => {
    const [l, setL] = useState(true)
    const router = useRouter()
    const {data, loading , error} = useMeQuery()

    useEffect(()=> {

        if((!data?.me && !loading) || (!data?.me && !loading && data?.me?.username !== router.query.user)){
            router.replace("/sign-in")
            setL(false)
        }
        setL(false)

    },[l,loading,data, error, router])

    return {
        loading: l,
        meLoading: loading
    }

}