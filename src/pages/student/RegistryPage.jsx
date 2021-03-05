import { Header } from '../../components/Header/Header'
import { JobExpRegister } from '../../components/Register/Student/JobExpRegister/JobExpRegister'
import { LanguageRegister } from '../../components/Register/Student/LanguageRegister/LanguageRegister'
import { QualificationRegister } from '../../components/Register/Student/QualificationRegister/QualificationRegister'

export const RegistryPage = props => {
  const section = props.match.params.section
  let element
  switch (section) {
    case 'qualification':
      element = <QualificationRegister />
      break
    case 'language':
      element = <LanguageRegister />
      break
    case 'job_experience':
      element = <JobExpRegister />
      break
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div className="container-fluid ll-bg w-100 d-flex flex-grow-1 align-items-center justify-content-center">
        {element}
      </div>
    </div>
  )
}
