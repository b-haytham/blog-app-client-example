interface Props {
    isNav?: boolean;
}

const Logo: React.FC<Props> = ({ isNav }) => {
    return (
        <div>
            <img
                style={{
                    padding: isNav ? "2px" : "20px",
                    border: `${isNav ? "5px" : "7px"} solid black`,
                    borderRadius: "50%",
                    width: isNav ? "50px" : "120px",
                    marginLeft: isNav ? "20px" : "0",
                }}
                src="/logo.png"
                alt="logo"
            />
        </div>
    );
};

export default Logo;
