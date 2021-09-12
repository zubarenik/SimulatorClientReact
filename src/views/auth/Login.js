import { useSkin } from '@hooks/useSkin'
import { Link, Redirect } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { AuthAction } from '../../redux/actions'
import { useState } from 'react'
import themeConfig from '@configs/themeConfig'

import '@styles/base/pages/page-auth.scss'

const Login = () => {
  const [count, setCount] = useState(0)

  const [form, setForm] = useState({
    username: "",
    password: ""
  })
  const [skin, setSkin] = useSkin()

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const login = async (e) => {
    e.preventDefault()
    AuthAction.login(form)

  }
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
          <img src={themeConfig.app.appLogoImage} alt='logo' style={{"height": "30px"}} />
          <h2 className='brand-text text-primary ml-1'>Mysimulator</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Добро пожаловать в MySimulator! 👋
            </CardTitle>
            <CardText className='mb-2'>Пожалуйста, войдите, чтобы продолжить</CardText>
            <Form className='auth-login-form mt-2' onSubmit={login}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  onChange={changeHandler}
                  type='text'
                  id='login-email'
                  name="username"
                  placeholder='john@example.com'
                  autoFocus />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  {/* <Link to='/'>
                    <small>Forgot Password?</small>
                  </Link> */}
                </div>
                <InputPasswordToggle
                  onChange={changeHandler}
                  className='input-group-merge'
                  id='login-password'
                  name="password" />
              </FormGroup>
              <Button.Ripple type="submit" color='primary' block>
                Войти
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Вы не зарегистрированы?</span>
              <Link to='/signup'>
                <span>Регистрация</span>
              </Link>
            </p>
            
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
