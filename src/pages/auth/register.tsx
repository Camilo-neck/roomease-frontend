import { Controller, useForm } from 'react-hook-form'
import { Button, TextField, TextFieldProps } from '@mui/material';
import Link from 'next/link';
import { useRef } from 'react';
import { loginUser, registerUser } from '@/controllers/auth.controllers';
import { useRouter } from 'next/navigation';

import AuthLayout from "@/components/authLayout";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';

const textFieldStyles = {
	'& label.Mui-focused': {
		color: 'rgb(0 99 153 / 1)',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'rgb(0 99 153 / 1)',
	},
}

const Register = () => {
	const { reset, control, register, handleSubmit, watch, formState: { errors } } = useForm();
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();

	const onSubmit = (data: any) => {
		console.log(data);
		console.log(new Date(data.date));
		const tmp_data = Object.assign({}, data);
		tmp_data.birth_date = new Date(data.birth_date);
		tmp_data.tags = tmp_data.tags.split(',').map((tag: string) => tag.trim());
		console.log(tmp_data)
		registerUser(tmp_data)
		router.push('/auth/login');
		reset();
	};

	return (
		<AuthLayout>
			<div className="flex flex-col items-center w-full px-8">
					<p className="text-neutral-10 text-2xl font-extrabold">Crear cuenta</p>
					<form id='loginForm' ref={formRef} className="flex flex-col self-center items-center w-full my-5 px-24 gap-5" onSubmit={handleSubmit(onSubmit)}>
						<TextField error={errors.name ? true : false} 
							helperText={errors.fullname ? `${errors.fullname?.message}` : ''} className='w-96' type='text' 
							label="Nombre Completo" variant='standard' 
							{...register('name', { required: "Debe ingresar su nombre completo" })} />
						<TextField error={errors.email ? true : false} 
							helperText={errors.email ? `${errors.email?.message}` : ''} className='w-96' type='email' 
							label="Correo" variant='standard' 
							{...register('email', { required: "Debe ingresar su correo" })} />
						<TextField error={errors.tags ? true : false}
						helperText='Debe ingresar etiquetas separada por comas'
						className='w-96' type='text' label="Etiquetas" variant='standard'
						{...register('tags', {required: true, pattern: /^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i})}  />
						<div className='flex flex-row gap-2 w-96'>
							<Controller
								control={control}
								name="birth_date"
								render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
									<DatePicker
									{...field}
									inputRef={ref}
									label="Date"
									slotProps={{
										textField: {
											variant: 'standard',
										},
									}}
									slots={{
										textField: (inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
										<TextField
										{...inputProps}
										onBlur={onBlur}
										name={name}
										error={!!fieldState.error}
										helperText={fieldState.error?.message}
										/>
										)
									}}
									
									/>
								)}
								/>
							<TextField error={errors.phone ? true : false} 
								helperText={errors.phone ? `${errors.phone?.message}` : ''} 
								fullWidth type='tel' label="Número Telefónico" variant='standard' 
								{...register('phone', { required: "Debe ingresar su número telefónico" })} />
							</div>
						<TextField type={'text'} label='Descripción' variant='standard' className='w-96' 
						{...register('description', { required: "Debe ingresar su descripción" })} 
						maxRows={4} minRows={2} multiline
						/>
						<TextField error={errors.password ? true : false} helperText={errors.pass ? `${errors.password?.message}` : ''} className='w-96' type='password' label="Contraseña" variant='standard' {...register('password', { required: "Debe ingresar su contraseña" })} />
						<TextField error={errors.passConfirm ? true : false} helperText={errors.passConfirm ? `${errors.passConfirm?.message}` : ''} className='w-96' type='password' label="Confirmar contraseña" variant='standard' {...register('passConfirm', { required: "Debe confirmar su contraseña" })} />
					</form>
					<Button
						onClick={() => formRef.current?.requestSubmit()}
						type='submit' variant='contained'
						className='w-96 bg-tertiary-50 
					hover:bg-tertiary-50/90 active:bg-tertiary-50 
					text-tertiary-99 shadow-none hover:shadow-md rounded-lg'>
						Crear Cuenta
					</Button>
					<p className="text-neutral-30 text-md mt-5">¿Ya tienes una cuenta? <Link href='/auth/login' className="text-tertiary-50">Inicia sesión</Link></p>
				
			</div>
		</AuthLayout>
	);
};

export default Register;