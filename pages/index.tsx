import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import Logo from "../components/Logo";
import Layout from "../components/NavBar/Layout";

import Typed from "react-typed";
import CategoryBadge from "../components/CategoryBadge";

import {
    faCode,
    faGraduationCap,
    faLaptopCode,
    faHandHoldingUsd,
    faHeartbeat,
    faHandshake,
    faHashtag,
} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
    title: {
        fontFamily: "Playball, cursive",
        color: "black",
        fontSize: "100px",
    },
    homePage: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
    },
    illustration: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTow: {
        color: "black",
        margin: "10px 0 80px",
        paddingTop: "50px",
        
        fontFamily: 'Playball, cursive'
    },
    parag:{
        margin: '20px 0',
        fontSize: '1.2rem'
    },
    startNow: {
        backgroundColor: '#21a60a',
        boxSizing: 'border-box',
        color: 'white',
        padding: '10px 15px',
        fontWeight: 'bolder',
        transition: 'all 0.3s',
        '&:hover': {
            backgroundColor: 'white',
            color: '#21a60a',
            border: '1px solid #21a60a'
        }
    }
});

const topics = [
    { id: 1, icon: faHashtag, type: "Technology" },
    { id: 2, icon: faHeartbeat, type: "Health" },
    { id: 3, icon: faHashtag, type: "Science" },
    { id: 4, icon: faHandHoldingUsd, type: "Business" },
    { id: 5, icon: faHashtag, type: "Culture" },
    { id: 6, icon: faHandshake, type: "Politics" },
    { id: 7, icon: faHashtag, type: "Relationships" },
    { id: 8, icon: faHashtag, type: "Startups" },
    { id: 9, icon: faHashtag, type: "Ai" },
    { id: 10, icon: faLaptopCode, type: "Computer Science" },
    { id: 11, icon: faCode, type: "Programming" },
    { id: 12, icon: faHashtag, type: "Cryptocurrency" },
    { id: 13, icon: faHashtag, type: "Productivity" },
    { id: 14, icon: faGraduationCap, type: "Education" },
];

const Index = () => {
    const classes = useStyles();

    return (
        <Layout>
            <Box
                component="section"
                height="calc(100vh - 80px)"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <div className={classes.homePage}>
                    <Box margin="0 0 0 30px">
                        <Typography className={classes.title} variant="h1">
                            Blog App
                        </Typography>
                        <p className={classes.parag}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. In praesentium, nisi, eligendi omnis nobis
                            sequi itaque dolorem iusto voluptates obcaecati quam
                          
                        </p>
                        <Button className={classes.startNow}>
                            Start Now
                        </Button>
                    </Box>
                </div>
                <div className={classes.illustration}>
                    <img width="80%" src="/home-pic.png" alt="home page" />
                </div>
            </Box>
            <Box component="section" height="100vh" bgcolor="#ebf0ec">
                <Typography
                    variant="h2"
                    align="center"
                    className={classes.headerTow}
                >
                    Topics you can find here
                </Typography>
                <Box
                    component="div"
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    width="80%"
                    margin="50px auto"
                    height="400px"
               
                >
                    {topics.map((item) => (
                        <CategoryBadge
                            key={item.id}
                            icon={item.icon}
                            size="lg"
                            text={item.type}
                        />
                    ))}
                </Box>
            </Box>
        </Layout>
    );
};

export default Index;
