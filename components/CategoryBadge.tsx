import { Box } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    size: "xs" | "lg" | "sm" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x",
    icon: IconProp,
    color?: string | undefined,
    text: string
}

const CategoryBadge: React.FC<Props> = ({size, icon, color, text}) => { 
    return(
        <Box
            component='div'
            display='flex'
            padding='10px'
            border='2px solid black'
            borderRadius='25px'
        >
            <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon} color={color} size={size}  />
            <span> {text} </span>
        </Box>
    );
}


export default CategoryBadge