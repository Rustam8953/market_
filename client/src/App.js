import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(() => {
      user.setUser(true);
      user.setIsAuth(true);
    }).finally(() => setLoading(false))
  }, [])

  if(loading) {
    return <Spinner className='d-flex justify-content-center align-items-center' width={100} height={100} animation={'grow'} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App; 