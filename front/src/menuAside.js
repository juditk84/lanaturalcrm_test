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

import { ref } from "vue"

export default [
  {
    to: '/global/landingview',            
    icon: mdiDatabaseCogOutline,
    label: 'Espai Global',
    menu: [
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
    to: '/user/landingview',            
    icon: mdiAccountStar,
    label: 'Espai Usuària',
    menu: [
      {
        to: '/profile',
        label: 'El meu perfil'
      },
      {
        // to: '/missatges',
        label: 'Els meus missatges'
      }
    ]
  },
  {
    to: '/xarxa/landingview',            
    icon: mdiAccountGroup,
    label: 'Xarxa',
    menu: [
      {
        to: '/xarxa/totis',
        label: 'Veure-ho tot'
      },
      {
        to: '/xarxa/afegirmembre',
        label: 'Afegir membre'
      }
    ]
  },
  {
    to: '/projectes/landingview',
    label: 'Projectes',
    icon: mdiCardMultiple,
    menu: [
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
    to: '/reunions/landingview',
    label: 'Reunions',
    icon: mdiClockStarFourPoints,
    menu: [
      {
        to: '/reunions',
        label: 'Totes les reunions'
      },
      {
        to: '/reunions',
        label: 'propera Natural Focus'
      }
    ]
  },
  {
    // add the necessary logic to this to conditionally display this if the user is admin or not.
    to: '/register',            
    icon: mdiLock,
    label: 'Crear usuaria',
  },
]
