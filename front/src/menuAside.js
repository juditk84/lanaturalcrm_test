import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
  mdiDatabaseCogOutline,
  mdiAccountStar,
  mdiAccountGroup,
  mdiCardMultiple,
  mdiClockStarFourPoints
} from '@mdi/js'

export default [
  {           
    icon: mdiAccountStar,
    label: 'Dashboard',
    to: '/dashboard', 
  },
  {       
    icon: mdiDatabaseCogOutline,
    label: 'Espai Global',
    menu: [
      
      {
        to: '/dashboard/global', 
        label: 'Dashboard'
      },
      {
        to: '/dades',
        label: 'Visualització de dades'
      },
      {
        to: '/social',
        label: 'Balanç Social'
      }
    ]
  },
  {            
    icon: mdiAccountGroup,
    label: 'Xarxa',
    menu: [
      {
        to: '/dashboard/xarxa', 
        label: 'Dashboard Xarxa'
      },
      {
        to: '/xarxa/totis',
        label: 'Tota la xarxa'
      },
      {
        to: '/xarxa/afegir',
        label: 'Afegir membre'
      }
    ]
  },
  {

    label: 'Projectes',
    icon: mdiCardMultiple,
    menu: [
      {
        to: '/dashboard/projectes', 
        label: 'Dashboard Projectes'
      },
      {
        to: '/projectes/tots',
        label: 'Tots els projectes'
      },
      {
        // to: '/projectes/1',
        label: 'Els teus projectes'
      }
    ]
  },
  {
    label: 'Reunions',
    icon: mdiClockStarFourPoints,
    menu: [
      {
        to: '/dashboard/reunions', 
        label: 'Dashboard'
      },
      {
        to: '/reunions/totes',
        label: 'Totes les reunions'
      },
      // {
      //   to: '/reunions',
      //   label: 'propera Natural Focus'
      // }
    ]
  },
  {
    // add the necessary logic to this to conditionally display this if the user is admin or not.
    to: '/register',            
    icon: mdiLock,
    label: 'Crear usuaria',
  },
]
