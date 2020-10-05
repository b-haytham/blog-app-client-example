import { Box, makeStyles } from "@material-ui/core";
import { GetLoggedInUserPostsQuery, GetPublicPostsQuery } from "../../generated/graphql";
import SinglePostOverview from "../SinglePostOverview/SinglePostOverview";





interface Props {
    data: (GetPublicPostsQuery & {kind: 'public'}) | (GetLoggedInUserPostsQuery & {kind: 'private'})
    
}


const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '25px',
        justifyContent: 'center',
        alignItems: 'center'
    }

})

const PostsContainer: React.FC<Props> = ({data}) => { 
    
    const classes = useStyles()
    return(
        <Box className={classes.container} >
            {data.kind === 'public' && data.getPublicPosts.map((item)=>(
                <SinglePostOverview kind={data.kind} key={item.id} info={item} />
            ))}
            {data.kind === 'private' && data.getLoggedInUserPosts.map((item)=> (
                <SinglePostOverview kind={data.kind} key={item.id} info={item} />
            ))}
        </Box>  
    );
}


export default PostsContainer