import { BarChart as BarChartIcon, User as UserIcon, UserPlus as UserPlusIcon } from 'react-feather'

const studentNavConf = {
  userRole: 'Estudiante',
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
  ],
}

export default studentNavConf
