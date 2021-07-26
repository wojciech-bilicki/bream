import React from 'react'
import AuthWrapper from '../src/auth/components/AuthWrapper';
import RegisterForm from '../src/auth/register/Register.form';

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = ({}) => {
    return (<AuthWrapper formTitle="Sign up to Epic Games Store">
        <RegisterForm />
    </AuthWrapper>);
}

export default Register