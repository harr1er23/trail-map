import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './sidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Map, LogOut, Plane, Calendar, User, Settings } from 'lucide-react';
import { useAuthStore } from '../../../stores/auth';

interface NavbarLinkProps {
  icon: typeof Map;
  link?: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, link, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      {link ? <Link to={`/${link}`}>
        <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
          <Icon size={20} />
        </UnstyledButton>
      </Link> :
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
          <Icon size={20} />
        </UnstyledButton>
      }
    </Tooltip>
  );
}

const mockdata = [
  { icon: Map, label: 'Карта', link: 'map' },
  { icon: Plane, label: 'Мои путешествия', link: 'journeys' },
  { icon: Calendar, label: 'Календарь', link: 'calendar' },
  { icon: User, label: 'Профиль', link: 'profile' },
  { icon: Settings, label: 'Настройки', link: 'settings' },
];

export function Sidebar() {
  const { logout } = useAuthStore();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  const links = mockdata.map((link) => (
    <NavbarLink
      {...link}
      icon={link.icon}
      key={link.label}
      active={currentPath == link.link}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        Logo
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" className='mt-auto' gap={0}>
        <NavbarLink
          onClick={logout} 
          icon={LogOut} 
          label="Logout" />
      </Stack>
    </nav>
  );
}