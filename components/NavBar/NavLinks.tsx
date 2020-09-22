import styled from "styled-components";
import NavLink from "./NavLink";
import Button from "../Form/Button";

import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useApolloClient } from "@apollo/client";

const NavLinksWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loading = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    filter: blur(2px);
`;

const NavLinks = () => {
    const { data, loading, error } = useMeQuery();
    const [logout, { loading: logoutLoading }] = useLogoutMutation();
    const apolloClient = useApolloClient();

    if (loading  || logoutLoading) {
        return <Loading />;
    }

    return (
        <NavLinksWrapper>
            {!data?.me && (
                <>
                    <NavLink href="/sign-in">Sign In</NavLink>
                    <NavLink href="/sign-up">Sign Up</NavLink>
                </>
            )}
            <NavLink href="/explore-posts">Explore Posts</NavLink>
            {data?.me && (
                <Button
                    onClick={async () => {
                        await logout();
                        await apolloClient.resetStore();
                    }}
                >
                    Logout
                </Button>
            )}
        </NavLinksWrapper>
    );
};

export default withApollo({ ssr: false })(NavLinks);
