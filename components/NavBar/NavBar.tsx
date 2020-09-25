import {
    AppBar,
    colors,
    makeStyles,
    Toolbar,
    Typography,
} from "@material-ui/core";
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
        padding: '5px 20px',
        borderRadius: '10px',
    },
});

const NavBar = () => {
    const classes = useStyles();
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
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
