import { useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/controllers/auth.controllers';
import { useDispatch } from 'react-redux';

import AuthLayout from "@/components/authLayout";

const textFieldStyles = {
	'& label.Mui-focused': {
		color: 'rgb(0 99 153 / 1)',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'rgb(0 99 153 / 1)',
	},
}

const Login = () => {
	const { reset, register, handleSubmit, watch, formState: { errors } } = useForm();
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();
	const dispatch = useDispatch();

	const onSubmit = async (data: any) => {
		console.log(data);
		dispatch(loginUser(data));
		router.push('/');
		reset();
	};

	return (
		<AuthLayout>
			<div className="flex flex-col items-center w-full">
				<div className="flex flex-col w-full items-center px-36">
					<p className="text-neutral-10 text-2xl font-extrabold">Iniciar sesión</p>
					<form id='loginForm' ref={formRef} className="flex flex-col self-center items-center w-full my-5 px-24 gap-5" onSubmit={handleSubmit(onSubmit)}>
						<TextField error={errors.email ? true : false} helperText={errors.email ? `${errors.email?.message}`: ''} className='w-96 lg:w-[35rem]' type='email' label="Correo" variant='standard' {...register('email', {required: "Debe ingresar su correo"})} />
						<TextField error={errors.pass ? true : false} helperText={errors.pass ? `${errors.pass?.message}`: ''} className='w-96 lg:w-[35rem]' type='password' label="Contraseña" variant='standard' {...register('password', {required: "Debe ingresar su contraseña", minLength: 8})} />
					</form>
					<Button 
					onClick={() => formRef.current?.requestSubmit()}
					type='submit' variant='contained' 
					className='w-96 lg:w-[35rem] bg-tertiary-50 
					hover:bg-tertiary-50/90 active:bg-tertiary-50 
					text-tertiary-99 shadow-none hover:shadow-md rounded-lg'>
						Iniciar Sesión
					</Button>
					<p className="text-neutral-30 text-md mt-5">¿No tienes una cuenta? <Link href='/auth/register' className="text-tertiary-50">Regístrate</Link></p>
				</div>
			</div>
		</AuthLayout>
	);
};

export default Login;