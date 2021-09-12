import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import errorImg from '@src/assets/images/pages/error.svg'
import themeConfig from '@configs/themeConfig'

import '@styles/base/pages/page-misc.scss'

const Error = () => {
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
          <img src={themeConfig.app.appLogoImage} alt='logo' style={{width: '25px'}} className="mr-1" />
        <h4 className='brand-text mb-0'>{themeConfig.app.appName}</h4>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Страница не найдена 🕵🏻‍♀️</h2>
          <p className='mb-2'>Упс! 😖 Похоже вы заблудились...</p>
          <Button.Ripple tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            Вернуться
          </Button.Ripple>
          <img className='img-fluid' src={errorImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error
