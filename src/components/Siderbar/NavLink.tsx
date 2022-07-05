import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest}: NavLinkProps) {
  return (
    <ChakraLink href={href} passHref {...rest}>
      <Icon as={icon} />
      <Text fontWeight='bold'>{children}</Text>
    </ChakraLink>
  )
}