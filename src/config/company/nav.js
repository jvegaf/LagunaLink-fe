
import { Apps, Business, Person } from '@material-ui/icons'

const companyNavConf = {
  userRole: 'Empresa',
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
      href: '/app/job_openings',
      icon: Business,
      title: 'Ofertas Publicadas',
    },
  ],
}

export default companyNavConf