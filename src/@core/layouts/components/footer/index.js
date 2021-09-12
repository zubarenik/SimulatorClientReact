// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        
        <span className='d-none d-sm-inline-block'>, Все права защищены</span>
      </span>
      <span className='float-md-right d-none d-md-block'>
        Сделано с
        <Heart size={14} />
      </span>
    </p>
  )
}

export default Footer
