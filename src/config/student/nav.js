import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
} from 'react-feather'

const studentNavConf = {
  role: 'Estudiante',
  items: [
    {
      index: 0,
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Inicio',
    },
    {
      index: 1,
      href: '/app/account',
      icon: UserIcon,
      title: 'Perfil',
    },
    {
      index: 2,
      href: '/register',
      icon: UserPlusIcon,
      title: 'Ofertas Aplicadas',
    },
    {
      index: 3,
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Configuracion',
    },
  ],
}

export default studentNavConf