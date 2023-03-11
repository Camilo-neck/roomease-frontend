'use client';

import { useForm } from '@/libraries/react-hook-form'
import { Button, TextField } from '@/components/mui-material';
import Link from 'next/link';
import { useRef } from 'react';

const textFieldStyles = {
	'& label.Mui-focused': {
		color: 'rgb(0 99 153 / 1)',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'rgb(0 99 153 / 1)',
	},
}

const Register = () => {
	const { reset, register, handleSubmit, watch, formState: { errors } } = useForm();
	const formRef = useRef<HTMLFormElement>(null);

	const onSubmit = (data: any) => {
		console.log(data);
		reset();
	};


	return (
		<div className="flex flex-col items-center w-full">
			<div className="flex flex-col w-full items-center px-36">
				<p className="text-neutral-10 text-2xl font-extrabold">Crear cuenta</p>
				<form id='loginForm' ref={formRef} className="flex flex-col self-center items-center w-full my-5 px-24 gap-5" onSubmit={handleSubmit(onSubmit)}>
					<TextField error={errors.fullname ? true : false} helperText={errors.fullname ? `${errors.fullname?.message}` : ''} className='w-96 lg:w-[35rem]' type='text' label="Nombre Completo" variant='standard' {...register('fullname', { required: "Debe ingresar su nombre completo" })} />
					<TextField error={errors.email ? true : false} helperText={errors.email ? `${errors.email?.message}` : ''} className='w-96 lg:w-[35rem]' type='email' label="Correo" variant='standard' {...register('email', { required: "Debe ingresar su correo" })} />
					<TextField error={errors.pass ? true : false} helperText={errors.pass ? `${errors.pass?.message}` : ''} className='w-96 lg:w-[35rem]' type='password' label="Contraseña" variant='standard' {...register('pass', { required: "Debe ingresar su contraseña" })} />
					<TextField error={errors.passConfirm ? true : false} helperText={errors.passConfirm ? `${errors.passConfirm?.message}` : ''} className='w-96 lg:w-[35rem]' type='password' label="Confirmar contraseña" variant='standard' {...register('passConfirm', { required: "Debe confirmar su contraseña" })} />
				</form>
				<Button
					onClick={() => formRef.current?.requestSubmit()}
					type='submit' variant='contained'
					className='w-96 lg:w-[35rem] bg-tertiary-50 
				hover:bg-tertiary-50/90 active:bg-tertiary-50 
				text-tertiary-99 shadow-none hover:shadow-md rounded-lg'>
					Crear Cuenta
				</Button>
				<p className="text-neutral-30 text-md mt-5">¿Ya tienes una cuenta? <Link href='/auth/login' className="text-tertiary-50">Crear</Link></p>
			</div>
		</div>
	);
};

export default Register;