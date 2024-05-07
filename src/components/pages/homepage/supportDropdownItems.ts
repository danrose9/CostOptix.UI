import { HomePageDropdownItem } from 'src/types/menu-types';
import * as appRoutes from '../../../app/router/appRoutes';

export const supportDropdownItems: HomePageDropdownItem[] = [
  {
    index: 1,
    title: 'Help Center',
    icon: 'help',
    content: 'Get help with your account, billing, and more',
    navigate: appRoutes.HELP_CENTER,
    className: 'shift-right',
  },
  {
    index: 2,
    title: 'Schedule a Demo',
    icon: 'clock outline',
    content: 'Schedule a 30 min demo with our team',
    navigate: appRoutes.SCHEDULE_DEMO,
  },
  {
    index: 3,
    title: 'Privacy',
    icon: 'key',
    content: 'How we handle your personal information',
    navigate: appRoutes.PRIVACY,
  },
  {
    index: 4,
    title: 'Contact Us',
    icon: 'talk',
    content: "Get in touch with our team, we'd love to hear from you",
    navigate: appRoutes.CONTACT_PAGE,
  },
];
