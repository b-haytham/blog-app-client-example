import { useApolloClient } from "@apollo/client";
import {
    AppBar,
    makeStyles,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    IconButton,
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "next/link";

import { useState } from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import ActiveNavLink from "./ActiveNavLink";

const useStyles = makeStyles({
    root: {
        height: "80px",
        backgroundColor: "beige",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    linkActive: {
        backgroundColor: "#ccd1d9",
    },
    logo: {
        padding: "5px 20px",
        color: "black",
        fontFamily: "roboto",
        fontSize: "1.5em",
        fontWeight: "bold",
    },
    link: {
        color: "black",
        margin: "0 5px",
        padding: "5px 20px",
        borderRadius: "10px",
    },
    circle: {
        border: "1px solid black",
    },
});

const NavBar = () => {
    const classes = useStyles();
    const apolloClient = useApolloClient();

    const { data, error, loading } = useMeQuery();
    const [logout] = useLogoutMutation();

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
            <Typography className={classes.logo}>Logo</Typography>

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
                        {" "}
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
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle style={{ color: "black" }} />
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
                            <Link href="/[user]" as={`/${data.me.username}`}>
                                <MenuItem>Profile</MenuItem>
                            </Link>
                            <Link
                                href="/[user]/dashboard"
                                as={`/${data.me.username}/dashboard`}
                            >
                                <MenuItem>Dashboard</MenuItem>
                            </Link>
                            <Link
                                href="/[user]/edit-profile"
                                as={`/${data.me.username}/edit-profile`}
                            >
                                <MenuItem>Settings</MenuItem>
                            </Link>
                            <MenuItem
                                onClick={async () => {
                                    await logout();
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
