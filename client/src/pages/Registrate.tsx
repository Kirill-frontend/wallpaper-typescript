import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import { registration } from '../redux/actions';

const Registrate: React.FC = () => {
  const dispatch = useDispatch()
  const [registrateEmail, setRegistrateEmail] = useState<string>('')
  const [registratePassword, setRegistratePassword] = useState<string>('')
  const [registrateUsername, setRegistrateUserName] = useState<string>('')


  const registerHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(registration(registrateEmail, registratePassword, registrateUsername))
  }

  return (
    <>
      <Navbar activeElement="auth" />
      <div className="form-container">
        <form className="form-sign" onSubmit={registerHandler}>
          <div className="row">
            <div className="input-field">
              <input id="register-email" onChange={(event) => setRegistrateEmail(event.target.value)} type="email" />
              <label htmlFor="register-email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input id="username" onChange={(event) => setRegistrateUserName(event.target.value)} type="text" />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input id="register-password" onChange={(event) => setRegistratePassword(event.target.value)} type="password" />
              <label htmlFor="register-password">Password</label>
            </div>
          </div>
          <div className="row">
            <button className="btn waves-effect waves-light red darken-2" type="submit" >Sign Up</button>
          </div>
        </form>
      </div>
    </>
  )
}


export default Registrate