import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    makeStyles,
} from "@material-ui/core";
import { ThumbDownAlt, ThumbUpAlt } from "@material-ui/icons";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import {
    useDislikeMutation,
    useGetCommentsByPostIdQuery,
    useLikeMutation,
} from "../../generated/graphql";
import { fromBase64ToObject } from "../../utils/fromBase64ToObject";

interface Props {
    meId: number;
    postId: number;
}

const useStyles = makeStyles({
    root:{
        border: '1px solid #bababa',
    },
    avatar: {
        cursor: 'pointer'
    },
    cardHeader:{
        '&:hover': {
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(212,202,202,1) 100%)'
        }
    },
    icon: {
        transition: 'all .5s',
        '&:hover':{
            color: 'black'
        }
    },
    content: {
        width: '70%'
    }
});

const PostComments: React.FC<Props> = ({ postId }) => {
    const classes = useStyles();
    const router = useRouter()

    const { data, loading, error } = useGetCommentsByPostIdQuery({
        variables: {
            postId,
        },
    });

    const [likeComment] = useLikeMutation();

    const [dislikeComment] = useDislikeMutation();

    const renderContentToHtml = (content: string) => {
        //@ts-ignore
        return draftToHtml(fromBase64ToObject(content));
    };

    return (
        <div>
            {data?.getCommentsByPostId &&
                data.getCommentsByPostId.map((item) => (
                    <Box
                        maxWidth='60%'
                        margin="20px auto"
                        padding="20px"
                        key={item.id}
                    >
                        <Card className={classes.root}>
                            <CardHeader
                                className={classes.cardHeader}
                                onClick={()=>router.push('/[user]', `/${item.creator.username}`)}
                                avatar={
                                    <Avatar
                                        className={classes.avatar}
                                        src={item.creator.avatar || "/logo.png"}
                                    />
                                }
                                title={item.creator.username}
                            />
                            <Divider/>
                            <CardContent>
                                
                            <Box
                                className={classes.content}
                                component="div"
                                dangerouslySetInnerHTML={{
                                    __html: renderContentToHtml(item.content),
                                }}
                            />
                            </CardContent>
                            <Divider />
                            <CardActions>
                            <IconButton
                                
                                onClick={async () => {
                                    const result = await likeComment({
                                        variables: {
                                            parent: "COMMENT",
                                            parentId: +item.id,
                                        },
                                    });
                                    console.log(result);
                                }}
                            >
                                <ThumbUpAlt className={classes.icon} />
                            </IconButton>
                            <IconButton
                                
                                onClick={async () => {
                                    const result = await dislikeComment({
                                        variables: {
                                            parent: "COMMENT",
                                            parentId: +item.id,
                                        },
                                    });
                                    console.log(result);
                                }}
                            >
                                <ThumbDownAlt className={classes.icon}/>
                            </IconButton>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
        </div>
    );
};

export default PostComments;
