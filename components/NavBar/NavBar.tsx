import { useApolloClient } from "@apollo/client";
import {
    AppBar,
    makeStyles,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Box,
    useMediaQuery,
    Divider,
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import Loading from "../Loading";
import Logo from "../Logo";
import ActiveNavLink from "./ActiveNavLink";

const useStyles = makeStyles({
    root: {
        height: "80px",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: '0px'
    },
    linkActive: {
        backgroundColor: "white",
        color: 'black !important',
    },
    logo: {
        padding: "5px 20px",
        color: "white",
        fontFamily: "roboto",
        fontSize: "1.5em",
        fontWeight: "bold",
    },
    link: {
        color: "white",
        margin: "0 5px",
        padding: "5px 20px",
        borderRadius: "10px",
        fontWeight: 'bolder'
    },
    circle: {
        border: "1px solid white",
    },
});

const NavBar = () => {
    const classes = useStyles();
    const router = useRouter();
    const matches = useMediaQuery('(max-width:600px)')

    const apolloClient = useApolloClient();

    const { data, loading } = useMeQuery();
    const [logout, {loading: logoutLoading}] = useLogoutMutation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [
        mobileMoreAnchorEl,
        setMobileMoreAnchorEl,
    ] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";

    return (
        <AppBar className={classes.root} position="static">
            {(loading || logoutLoading) && <Loading/>}
            <Box  display='flex' alignItems='center' justifyContent='center'> 
                <Logo  isNav />
                <Typography className={classes.logo}>Logo</Typography>
            </Box>
            <Toolbar>
                <ActiveNavLink
                    className={classes.link}
                    activeClassName={classes.linkActive}
                    href="/"
                >
                    Home
                </ActiveNavLink>
                <ActiveNavLink
                    className={classes.link}
                    activeClassName={classes.linkActive}
                    href="/explore-posts"
                >
                    Explore
                </ActiveNavLink>

                {!data?.me && (
                    <>
                        
                        <ActiveNavLink
                            className={classes.link}
                            activeClassName={classes.linkActive}
                            href="/sign-in"
                        >
                            Login
                        </ActiveNavLink>
                        <ActiveNavLink
                            className={classes.link}
                            activeClassName={classes.linkActive}
                            href="/sign-up"
                        >
                            Register
                        </ActiveNavLink>
                    </>
                )}
                {data?.me && (
                    <>
                        {!matches && <ActiveNavLink
                            className={classes.link}
                            href="/[user]/new-post"
                            as={`/${data.me.username}/new-post`}
                        >
                            Create New Post
                        </ActiveNavLink>}
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle style={{ color: "white" }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            id={menuId}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    router.push(
                                        "/[user]/new-post",
                                        `/${data.me?.username}/new-post`
                                    );
                                }}
                            >
                                Create New Post
                            </MenuItem>
                            <Divider/>
                            <MenuItem
                                onClick={() => {
                                    router.push(
                                        "/[user]",
                                        `/${data.me?.username}`
                                    );
                                }}
                            >
                                Profile
                            </MenuItem>
                            <Divider/>
                            <MenuItem
                                onClick={() => {
                                    router.push(
                                        "/[user]/dashboard",
                                        `/${data.me?.username}/dashboard`
                                    );
                                }}
                            >
                                Dashboard
                            </MenuItem>
                            <Divider/>
                            <MenuItem
                                onClick={() => {
                                    router.push(
                                        "/[user]/edit-profile",
                                        `/${data.me?.username}/edit-profile`
                                    );
                                }}
                            >
                                Settings
                            </MenuItem>
                            <Divider/>
                            <MenuItem
                                onClick={async () => {
                                    await logout();
                                    await router.push('/')
                                    await apolloClient.resetStore();
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default withApollo({ ssr: false })(NavBar);
