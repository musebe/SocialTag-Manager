import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface LinkType {
  path: string;
  name: string;
}

interface NavProps {
  containerStyles?: string; // Optional CSS classes for the nav container
  linkStyles?: string; // Optional CSS classes for the link elements
  underlineStyles?: string; // Optional CSS classes for the underline elements
  onNavLinkClick?: () => void; // Optional click handler for when a nav link is clicked
}

const links: LinkType[] = [{ path: '/', name: 'oktotags' }];

const Nav: React.FC<NavProps> = ({
  containerStyles,
  linkStyles,
  underlineStyles,
  onNavLinkClick,
}) => {
  const path = usePathname();

  const handleLinkClick = () => {
    if (onNavLinkClick) {
      onNavLinkClick();
    }
  };

  return (
    <nav className={containerStyles}>
      {links.map((link, index) => {
        return (
          <Link href={link.path} key={index}>
            <span
              className={`capitalize ${linkStyles}`}
              onClick={handleLinkClick}
              role='button' 
              tabIndex={0} 
            >
              {link.path === path && (
                <motion.span
                  initial={{ y: '-100%' }}
                  animate={{ y: 0 }}
                  transition={{ type: 'tween' }}
                  layoutId='underline'
                  className={underlineStyles}
                />
              )}
              {link.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
