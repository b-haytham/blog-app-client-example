import { Box } from "@material-ui/core";
import { useGetCommentsByPostIdQuery } from "../../generated/graphql";


interface Props {
    meId: number
    postId: number
}


const PostComments: React.FC<Props> = ({postId}) => { 

    const {data, loading, error} = useGetCommentsByPostIdQuery({
        variables: {
            postId
        }
    })

    
    return(
        <div>
            {data?.getCommentsByPostId && data.getCommentsByPostId.map((item)=>(
                <Box padding='20px' key={item.id} >
                    <p style={{margin: '20px'}}>{item.creator.username}</p>
                </Box>
            )) }
        </div>        
    );
}


export default PostComments