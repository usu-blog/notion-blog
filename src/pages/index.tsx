import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import sharedStyles from '../styles/shared.module.css'

const Index = () => (
  <>
    <Header titlePre="Home" />
    <div className={sharedStyles.layout}>
      <h1>UsuCode</h1>
    </div>
  </>
)

export default Index
