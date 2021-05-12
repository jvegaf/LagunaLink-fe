import {
  BarChart as BarChartIcon,
  User as UserIcon
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
  ],
}

export default companyNavConf