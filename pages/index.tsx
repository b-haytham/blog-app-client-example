import { Box, makeStyles, Typography } from "@material-ui/core";
import Logo from "../components/Logo";
import Layout from "../components/NavBar/Layout";

import Typed from "react-typed";
import CategoryBadge from "../components/CategoryBadge";


import { faCode , faGraduationCap,  faLaptopCode, faHandHoldingUsd, faHeartbeat, faHandshake, faHashtag} from '@fortawesome/free-solid-svg-icons'



const useStyles = makeStyles({
    title: {
        fontFamily: "Playball, cursive",
        color: "black",
        margin: '10px 0 80px'
    },
    typed: {
        padding: "50px",
        fontSize: '3em',
        color: 'black',
    },
    headerTow: {
        color: "black",
        margin: '10px 0 80px',
        paddingTop: '50px',
        fontWeight: 'normal'
    }
});


const topics = [
    {id: 1,icon: faHashtag, type: 'Technology'},
    {id: 2,icon: faHeartbeat, type: 'Health'},
    {id: 3,icon: faHashtag, type: 'Science'},
    {id: 4,icon: faHandHoldingUsd, type: 'Business'},
    {id: 5,icon: faHashtag, type: 'Culture'},
    {id: 6,icon: faHandshake, type: 'Politics'},
    {id: 7,icon: faHashtag, type: 'Relationships'},
    {id: 8,icon: faHashtag, type: 'Startups'},
    {id: 9,icon: faHashtag, type: 'Ai'},
    {id: 10,icon: faLaptopCode, type: 'Computer Science'},
    {id: 11,icon: faCode, type: 'Programming'},
    {id: 12,icon: faHashtag, type: 'Cryptocurrency'},
    {id: 13,icon: faHashtag, type: 'Productivity'},
    {id: 14,icon: faGraduationCap, type: 'Education'},
]


const Index = () => {
    const classes = useStyles();
    return (
        <Layout>
            <Box
                component="section"
                height="calc(100vh - 80px)"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box display="flex" justifyContent="center" my="20px">
                    <Logo />
                </Box>

                <Typography
                    className={classes.title}
                    variant="h1"
                    align="center"
                >
                    Blog App
                </Typography>

                <Box>
                    <Typed
                        strings={[
                            "Here you can read about anything ",
                            "or whrite about anything you are passionate about",
                        ]}
                        typeSpeed={40}
                        backSpeed={10}
                        loop
                        className={classes.typed}
                    />
                </Box>
            </Box>
            <Box 
                component='section'
                height='100vh'
                bgcolor= '#ebf0ec'   
            >
                <Typography variant='h2' align='center' className={classes.headerTow}>
                    Topics you can find here
                </Typography>
                <Box
            
                    component='div'
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='space-between'
                    alignItems='center'
                    width='70%'
                    margin='50px auto'
                    height='400px'
                    padding='50px'
                >
                    {topics.map((item)=> (
                        <CategoryBadge key={item.id} icon={item.icon} size='lg' text={item.type} />
                    ))}
                </Box>
            </Box>
        </Layout>
    );
};

export default Index;
