import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon
} from 'react-feather'

const companyNavConf = {
  role: 'Empresa',
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
      href: '/app/job_openings',
      icon: UserIcon,
      title: 'Ofertas Publicadas',
    },
    {
      href: '/app/job_openings/create',
      icon: UserPlusIcon,
      title: 'Crear Oferta ',
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Configuracion',
    },
  ],
}

export default companyNavConf