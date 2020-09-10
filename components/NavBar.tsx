import NextLink from "next/link";

import { Box, Flex, Link } from "@chakra-ui/core";

import Logo from "./Logo";
import { useRouter } from "next/router";

interface navBarProps {

}


const NavBar: React.FC<navBarProps> = () => {
    const router = useRouter()

    return (
        <Box bg="white" w="100%" py={8} px={50}>
            <Flex align='center' justify="space-between">
                <Logo />
                <Flex justify="space-between" align="center">
                    <NextLink href="/explore-posts">
                        <Link mx={8}>Explore posts</Link>
                    </NextLink>
                    <NextLink href="/sign-in">
                        <Link mx={8}>Sign In</Link>
                    </NextLink>
                    <NextLink href="/">
                        <Link
                            bg="black"
                            color="white"
                            borderRadius="5px"
                            p='5px'
                            mx={8}
                            _hover={{
                                bg:'white',
                                color: 'black',
                                shadow: '2px 2px 2px rgba(0,0,0,0.5)'
                            }}
                        >
                            Get started
                        </Link>
                    </NextLink>
                </Flex>
            </Flex>
        </Box>
    );
};

export default NavBar;
