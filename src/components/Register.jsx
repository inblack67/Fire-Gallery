import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/auth/authContext'
import Preloader from './Preloader'

const regExps = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/];

const Register = () => {

    const [submitting, setSubmitting] = useState(false);

    const { register, errors, handleSubmit } = useForm({
        defaultValues: {
            name: 'Aman',
            email: 'aman@gmail.com',
            password: 'Aman123@',
        }
    });

    const authContext = useContext(AuthContext);
    const { loading, registerUser } = authContext;

    if (submitting) {
        return <Preloader />
    }

    return (
        <div className='center'>
            <p className="flow-text">Register</p>
            <form onSubmit={handleSubmit((formData) => {
                setSubmitting(true);
                registerUser(formData);
                setSubmitting(false);
            })}>
                <div className="input-field">
                    <input type="text" name='name' ref={register({
                        required: 'Required!'
                    })} placeholder='Name' />
                    <label htmlFor="name">Name</label>
                    {errors.name ? <span className="red-text helper-text">
                        {errors.name.message}
                    </span> : null}
                </div>
                <div className="input-field">
                    <input type="email" name='email' ref={register({
                        required: 'Required!'
                    })} placeholder='Email' />
                    <label htmlFor="email">Email</label>
                    {errors.email ? <span className="red-text helper-text">
                        {errors.email.message}
                    </span> : null}
                </div>
                <div className="input-field">
                    <input placeholder='Password' type="password" name='password' ref={register({
                        required: 'Required!',
                        minLength: {
                            value: 8,
                            message: 'Must be 8 chars'
                        },
                        validate: value => {
                            const res = regExps.every(regex => regex.test(value))
                            return res ? res : 'Must include lower, upper, number, and special chars'
                        }
                    })} />
                    <label htmlFor="password">Password</label>
                    {errors.password ? <span className="red-text helper-text">
                        {errors.password.message}
                    </span> : null}
                </div>
                <div className="input-field">
                    <button type="submit" disabled={submitting} className='btn red'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register
