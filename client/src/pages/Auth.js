import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button} from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../http/userApi';
import { Context } from '..';

const Auth = observer(() => {
  const {user} = useContext(Context);
  const location = useLocation()
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      let data;
      if(!isLogin) {
        data = await registration(email, password);
      } else {
        data = await login(email, password);
      }
      console.log(data);
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{height: window.innerHeight - 54}}>

      <Card style={{width: 600}} className='p-5'>
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control placeholder='Введите ваш email' className='mt-3' value={email} onChange={e => setEmail(e.target.value)} />
          <Form.Control placeholder='Введите пароль' className='mt-3' type='password' value={password} onChange={e => setPassword(e.target.value)} />
          <div className='d-flex justify-content-between mt-3 align-items-center'>
              {!isLogin ? 
              <div>Есть аккаунт?<NavLink to={LOGIN_ROUTE}>Войти</NavLink></div> : 
              <div>Нет аккаунта?<NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь</NavLink></div>}
            <Button className='' onClick={() => signIn()}>
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </div>
        </Form>
      </Card>

    </Container>
  );
})

export default Auth;