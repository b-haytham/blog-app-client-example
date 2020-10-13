import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

import { createUploadLink } from "apollo-upload-client";

// const link = (ctx: NextPageContext) => {
//     return createUploadLink({
//         uri: "http://localhost:8000/graphql",

//      });
// };
const createClient = (ctx: NextPageContext) =>
    new ApolloClient({
        //@ts-ignore

        uri: "http://localhost:8000/graphql",
        credentials: "include",

        headers: {
            cookie:
                (typeof window === "undefined"
                    ? ctx?.req?.headers.cookie
                    : undefined) || "",
        },
        cache: new InMemoryCache(),
    });

export const withApollo = createWithApollo(createClient);
