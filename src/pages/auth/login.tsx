import { set, useForm } from "react-hook-form";
import Head from "next/head";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/helpers/auth.helpers";
import { useDispatch } from "react-redux";

import AuthLayout from "@/components/authLayout";

const Login = () => {
	const {
		reset,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();
	const dispatch = useDispatch();

	const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const onSubmit = async (data: any) => {
		setIsLoading(true);
		const res = await dispatch(loginUser(data));
		console.log('LOGIN >>>', res);
		reset();
		// if res is an error, show error
		if (res instanceof Error) {
			console.log(res);
			if (res.message.toLowerCase().includes("password") || 
				res.message.toLowerCase().includes("email") || 
				res.message.toLowerCase().includes("contraseña") ||
				res.message.toLowerCase().includes("correo")
				) {
				setLoginErrorMessage(res.message);
			} else {
				setLoginErrorMessage("Ha ocurrido un error inesperado");
			}
			setIsLoading(false);
			return;
		}
		// if res is not an error, redirect to houses
		setLoginErrorMessage(null);
		setIsLoading(false);
		router.push("/app/houses");
	};

	return (
		<>
			<Head>
				<title>Inicio de sesión - Roomease</title>
			</Head>
			<AuthLayout>
				<>
					<h2 className="text-primary-20 text-3xl font-extrabold">Bienvenido de vuelta</h2>
					<p className="text-sm mt-4 text-neutral-40">Si ya eras un usuario, inicia sesión fácilmente</p>
					<form id="loginForm" ref={formRef} className="flex flex-col gap-8 md:gap-5" onSubmit={handleSubmit(onSubmit)}>
						<TextField
							error={errors.email ? true : false}
							helperText={errors.email ? `${errors.email?.message}` : ""}
							className="bg-indigo-400/10 rounded-2xl mt-8"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "16px",
								},
							}}
							type="email"
							label="Correo"
							variant="outlined"
							{...register("email", { required: "Debe ingresar su correo" })}
						/>
						<TextField
							error={errors.pass ? true : false}
							helperText={errors.pass ? `${errors.pass?.message}` : ""}
							className="bg-indigo-400/10 rounded-2xl"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "16px",
								},
							}}
							type="password"
							label="Contraseña"
							variant="outlined"
							{...register("password", {
								required: "Debe ingresar su contraseña",
							})}
						/>
						<Button
							type="submit"
							variant="contained"
							className="bg-tertiary-50 
						py-2
						hover:bg-tertiary-50/90 active:bg-tertiary-50 
						text-tertiary-99 shadow-none hover:shadow-md rounded-xl"
						>
							Iniciar Sesión {isLoading && <span className="animate-spin ml-2">🌀</span>}
						</Button>
					</form>
					{loginErrorMessage && <p className="text-sm text-error-60 text-center mt-1">{loginErrorMessage}</p>}
					<p className="text-neutral-30 text-md mt-5">
						¿No tienes una cuenta?{" "}
						<Link href="/auth/register" className="text-tertiary-50">
							Regístrate
						</Link>
					</p>
				</>
			</AuthLayout>
		</>
	);
};

export default Login;
