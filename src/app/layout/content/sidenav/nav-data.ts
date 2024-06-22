import {INavbardata} from "./helper";

const role: string[] = ['role1' , 'role2', 'role3'];

export const navData: INavbardata[] = [
  {
    routeLink: 'dashboard',
    icon: 'mdi mdi-speedometer',
    label: 'Dashboard',
    access: role
  },
  {
    routeLink: 'calendar',
    icon: 'mdi mdi-calendar',
    label: 'Calendar',
    access: role
  },
  {
    routeLink: 'staff',
    icon: 'mdi mdi-account-card-details',
    label: 'Staff',
    expanded: false,
    items: [
      {
        routeLink: 'staff/insert',
        label: 'Insert',
        access: [role[0], role[2]]
      },
      {
        routeLink: 'staff/list',
        label: 'List',
        access: [role[1]]
      }
    ]
  },
  {
    routeLink: 'services',
    icon: 'mdi mdi-library',
    label: 'services',
    expanded: false,
    items: [
      {
        routeLink: 'services/insert',
        label: 'Insert',
        access: role
      },
      {
        routeLink: 'services/list',
        label: 'List',
        access: role
      }
    ]
  },
  {
    routeLink: 'revenue',
    icon: 'mdi mdi-chart-bar',
    label: 'revenue',
    expanded: false,
    items: [
      {
        routeLink: 'revenue/profit',
        label: 'Profit',
        access: role
      },
      {
        routeLink: 'revenue/statistics',
        label: 'Statistics',
        access: role
      }
    ]

  },
  {
    routeLink: 'record',
    icon: 'mdi mdi-note-text',
    label: 'Expense',
    expanded: false,
    items: [
      {
        routeLink: 'record/insert',
        label: 'Insert',
        access: [role[0], role[2]]
      },
      {
        routeLink: 'record/list',
        label: 'List',
        access: [role[1]]
      }
    ]
  },
  {
    routeLink: 'room',
    icon: 'mdi mdi-home-map-marker',
    label: 'Room',
    expanded: false,
    items: [
      {
        routeLink: 'room/insert',
        label: 'Insert',
        access: role
      },
      {
        routeLink: 'room/list',
        label: 'List',
        access: role
      }
    ]
  },
  {
    routeLink: 'category',
    icon: 'mdi mdi-sort-variant',
    label: 'Theme category',
    expanded: false,
    items: [
      {
        routeLink: 'category/insert',
        label: 'Insert',
        access: role
      },
      {
        routeLink: 'category/list',
        label: 'List',
        access: role
      }
    ]
  },
  {
    routeLink: 'theme',
    // icon: 'mdi mdi-auto-fix',
    icon: 'mdi mdi-brush',
    label: 'Theme',
    expanded: false,
    items: [
      {
        routeLink: 'theme/insert',
        label: 'Insert',
        access: role
      },
      {
        routeLink: 'theme/list',
        label: 'List',
        access: role
      },
      {
        routeLink: 'theme/statistics',
        label: 'Statistics',
        access: role
      }
    ]
  },
  {
    routeLink: 'reservation',
    icon: 'mdi mdi-calendar-clock',
    label: 'Reservation',
    expanded: false,
    items: [
      {
        routeLink: 'reservation/insert',
        label: 'Inserer',
        access: role
      },
      {
        routeLink: 'reservation/list',
        label: 'List',
        access: role
      },
      {
        routeLink: 'reservation/statistics',
        label: 'Statistics',
        access: role
      }
    ]
  },
  {
    routeLink: 'material',
    icon: 'mdi mdi-camera',
    label: 'Material',
    expanded: false,
    items: [
      {
        routeLink: 'material/insert',
        label: 'Insert',
        access: role
      },
      {
        routeLink: 'material/list',
        label: 'List',
        access: role
      },
      {
        routeLink: 'material/stat',
        label: 'Stat',
        access: role
      }
    ]
  },
  {
    routeLink: 'client',
    icon: 'mdi mdi-face',
    label: 'Client',
    expanded: false,
    items: [
      {
        routeLink: 'client/insert',
        label: 'Insert',
        access: role
      },
      {
        routeLink: 'client/list',
        label: 'List',
        access: role
      },
      {
        routeLink: 'reservation/statistics',
        label: 'Statistics',
        access: role
      }
    ]
  },
]
