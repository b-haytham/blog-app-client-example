import { CircularProgress, makeStyles } from "@material-ui/core";



interface Props {}

const useStyles = makeStyles({
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
})

const Loading: React.FC<Props> = ({}) => {
    const classes = useStyles() 
    return(
        <div className={classes.loading}>
            <CircularProgress  color="secondary" />
        </div>
    );
}


export default Loading