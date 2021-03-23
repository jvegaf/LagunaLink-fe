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
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Inicio',
    },
    {
      href: '/app/profile',
      icon: UserIcon,
      title: 'Perfil',
    },
    {
      href: '/app/enrollments',
      icon: UserPlusIcon,
      title: 'Ofertas Aplicadas',
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Configuracion',
    },
  ],
}

export default studentNavConf