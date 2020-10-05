import {
    faSearch,
    faSortAmountDownAlt,
    faSortAmountUpAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   
}

const useStyles = makeStyles({
    container: {
        position: "relative",
    },

    input: {
        padding: "10px 50px 10px 50px",
        border: "2px solid #121212",
        borderRadius: "25px",
        outline: "none",
        '&:hover': {
            boxShadow: '3px 3px 3px  rgba(0,0,0,0.4)'
        }
    },

    searchIcon: {
        position: "absolute",
        top: "12px",
        left: "14px",
    },

    filterIcon: {
        position: "absolute",
        zIndex: 50,
        top: "12px",
        right: "14px",
        cursor: "pointer",
        '&:hover': {
            transform: 'scale(1.3)'
        }
    },
});


const SearchBar: React.FC<Props> = (props) => {
    const classes = useStyles();
  

    return (
        <div className={classes.container}>
            <FontAwesomeIcon
                size="lg"
                className={classes.searchIcon}
                icon={faSearch}
            />
            
            <input  className={classes.input} {...props} />
        </div>
    );
};

export default SearchBar;
