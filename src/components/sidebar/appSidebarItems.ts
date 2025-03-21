import * as appRoutes from '../../app/router/appRoutes';
import { targets } from '../productTour/defaultTourSteps';
import { ISidebarItem } from 'src/types/menu-types';

export const appSidebarItems: ISidebarItem[] = [
  {
    title: 'Dashboards',
    icon: 'icon home',
    active: false,
    extra: false,
    items: [
      {
        title: 'Default',
        path: appRoutes.DEFAULT_DASHBOARD,
        active: true,
      },
    ],
  },
  {
    title: 'Cost Dashboard',
    path: appRoutes.COST_DASHBOARD,
    icon: 'money bill alternate outline',
    active: true,
    extra: false,
  },
  {
    title: 'Cloud Provider Dashboard',
    path: appRoutes.HOME,
    icon: 'cloud',
    active: false,
    extra: false,
    items: [
      {
        title: 'Azure',
        path: appRoutes.HOME,
        active: true,
      },
      {
        title: 'Amazon Web Service',
        path: appRoutes.HOME,
        icon: 'icon cog',
        active: false,
      },
      {
        title: 'Google Cloud',
        path: appRoutes.HOME,
        icon: 'icon cog',
        active: false,
      },
      {
        title: 'Microsoft 365',
        path: appRoutes.HOME,
        icon: 'icon cog',
        active: false,
      },
      {
        title: 'Salesforce',
        path: appRoutes.HOME,
        icon: 'icon cog',
        active: false,
      },
    ],
  },
  {
    title: 'Billing Account Overview',
    path: appRoutes.HOME,
    icon: 'list alternate outline',
    active: false,
    extra: false,
  },
  {
    title: 'Subscription Overview',
    path: appRoutes.HOME,
    icon: 'th',
    active: false,
    extra: false,
  },
  {
    title: 'Service Explorer',
    path: appRoutes.HOME,
    icon: 'eye',
    active: false,
    extra: false,
  },
  {
    title: 'Resource List',
    path: appRoutes.RESOURCES,
    icon: 'desktop',
    active: true,
    extra: false,
  },
  {
    title: 'Cost Containers',
    id: targets.DEMO_STEP_4,
    path: appRoutes.COST_CONTAINERS,
    icon: 'box',
    active: true,
    extra: false,
  },
  {
    title: 'Static Pages',
    icon: 'recycle',
    active: false,
    dev: true,
    extra: false,
    items: [
      {
        title: 'Maintenance',
        path: appRoutes.MAINTENANCE_PAGE,
        icon: 'icon cog',
        active: false,
      },
      {
        title: '404 Error',
        path: appRoutes.NOT_FOUND_404_PAGE,
        icon: 'icon cog',
        active: true,
      },
      {
        title: 'Default Error Page',
        path: appRoutes.DEFAULT_ERROR_PAGE,
        icon: 'icon cog',
        active: true,
      },
    ],
  },
  {
    title: 'Test Page',
    path: appRoutes.TEST_PAGE,
    icon: 'box',
    dev: true,
    active: false,
    extra: true,
  },
  {
    title: 'Service Connections',
    path: appRoutes.SERVICE_PROVIDERS,
    icon: 'handshake outline',
    active: true,
    extra: true,
  },
  {
    title: 'Help Center',
    path: appRoutes.INTERNAL_HELP_PAGE,
    icon: 'help',
    active: true,
    extra: true,
  },
  {
    title: 'Settings',
    path: appRoutes.SETTINGS,
    icon: 'icon cog',
    active: true,
    extra: true,
  },
];
