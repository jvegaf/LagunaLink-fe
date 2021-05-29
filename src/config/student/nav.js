import { Apps, AssignmentTurnedIn, Person } from '@material-ui/icons'


const studentNavConf = {
  userRole: 'Estudiante',
  items: [
    {
      href: '/app/dashboard',
      icon: Apps,
      title: 'Inicio',
    },
    {
      href: '/app/profile',
      icon: Person,
      title: 'Perfil',
    },
    {
      href: '/app/enrollments',
      icon: AssignmentTurnedIn,
      title: 'Ofertas Aplicadas',
    },
  ],
}

export default studentNavConf
