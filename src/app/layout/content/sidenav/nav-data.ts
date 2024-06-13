import {INavbardata} from "./helper";

export const navData: INavbardata[] = [
  {
    routeLink: 'dashboard',
    icon: 'mdi mdi-speedometer',
    label: 'Dashboard'
  },
  {
    routeLink: 'staff',
    icon: 'mdi mdi-account-card-details',
    label: 'Staff',
    expanded: false,
    items: [
      {
        routeLink: 'staff/insert',
        label: 'Insert'
      },
      {
        routeLink: 'staff/list',
        label: 'List'
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
        label: 'Profit'
      },
      {
        routeLink: 'revenue/Expense',
        label: 'Expense'
      },
      {
        routeLink: 'revenue/statistics',
        label: 'Statistics'
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
        label: 'Insert'
      },
      {
        routeLink: 'room/list',
        label: 'List'
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
        label: 'Insert'
      },
      {
        routeLink: 'category/list',
        label: 'List'
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
        label: 'Insert'
      },
      {
        routeLink: 'theme/list',
        label: 'List'
      },
      {
        routeLink: 'theme/statistics',
        label: 'Statistics'
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
        label: 'Inserer'
      },
      {
        routeLink: 'reservation/list',
        label: 'List'
      },
      {
        routeLink: 'reservation/statistics',
        label: 'Statistics'
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
        label: 'Insert'
      },
      {
        routeLink: 'material/list',
        label: 'List'
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
        label: 'Insert'
      },
      {
        routeLink: 'client/list',
        label: 'List'
      },
      {
        routeLink: 'reservation/statistics',
        label: 'Statistics'
      }
    ]
  },
]
