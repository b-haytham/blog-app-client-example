import { Box, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classes from "*.module.css";

interface Props {
    size:
        | "xs"
        | "lg"
        | "sm"
        | "1x"
        | "2x"
        | "3x"
        | "4x"
        | "5x"
        | "6x"
        | "7x"
        | "8x"
        | "9x"
        | "10x";
    icon: IconProp;
    color?: string | undefined;
    text: string;
}

const useStyles = makeStyles({
    badge: {
        display: "flex",
        padding: "10px",
        border: "3px solid #21a60a",
        borderRadius: "25px",
        backgroundColor: 'white'
    },
});

const CategoryBadge: React.FC<Props> = ({ size, icon, color, text }) => {
    const classes = useStyles()
    return (
        <div className={classes.badge}>
            <FontAwesomeIcon
                style={{ marginRight: "10px" }}
                icon={icon}
                color={color}
                size={size}
            />
            <span> {text} </span>
        </div>
    );
};

export default CategoryBadge;
