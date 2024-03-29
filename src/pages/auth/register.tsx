import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, TextField, TextFieldProps, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRef } from "react";
import { registerUser } from "@/helpers/auth.helpers";
import { useRouter } from "next/navigation";

import AuthLayout from "@/components/authLayout";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Head from "next/head";

const Register = () => {
	const {
		reset,
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();
	const [registerErrorMessage, setRegisterErrorMessage] = useState<string | null>(null);
	const [showTooltip, setShowTooltip] = useState(false);

	const onSubmit = async (data: any) => {
		const tmp_data = Object.assign({}, data);
		tmp_data.birth_date = new Date(data.birth_date);
		tmp_data.tags = tmp_data.tags.split(",").map((tag: string) => tag.trim());
		const res = await registerUser({ ...tmp_data, passConfirm: undefined });
		if (!res.ok) {
			setRegisterErrorMessage("Ha ocurrido un error. Intente nuevamente");
			return;
		}
		setRegisterErrorMessage(null);
		router.push("/auth/login");
		reset();
	};

	return (
		<>
			<Head>
				<title>Registro - RoomEase</title>
			</Head>
			<AuthLayout>
				<>
					<h2 className="text-primary-20 text-3xl font-extrabold">Bienvenido a RoomEase</h2>
					<p className="text-sm mt-4 text-neutral-40">Crea tu cuenta fácilmente</p>
					<form
						id="registerForm"
						ref={formRef}
						className="flex flex-col gap-8 md:gap-5"
						onSubmit={handleSubmit(onSubmit)}
					>
						<TextField
							error={errors.name ? true : false}
							helperText={errors.fullname ? `${errors.fullname?.message}` : ""}
							type="text"
							className="bg-indigo-400/10 rounded-2xl mt-8"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "16px",
								},
							}}
							label="Nombre Completo"
							variant="outlined"
							{...register("name", {
								required: "Debe ingresar su nombre completo",
							})}
						/>
						<TextField
							error={errors.email ? true : false}
							helperText={errors.email ? `${errors.email?.message}` : ""}
							type="email"
							className="bg-indigo-400/10 rounded-2xl"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "16px",
								},
							}}
							label="Correo"
							variant="outlined"
							{...register("email", { required: "Debe ingresar su correo" })}
						/>
						<Tooltip
							open={showTooltip}
							title="¡Las etiquetas ayudan a que los demás miembros te conozcan mejor! Ingresa tus etiquetas separadas por comas, ej: 'amigable, ordenado, etc'"
							arrow
							placement="top"
							sx={{
								background: "rgba(0,0,0)",
							}}
						>
							<TextField
								error={errors.tags ? true : false}
								type="text"
								className="bg-indigo-400/10 rounded-2xl"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "16px",
									},
								}}
								label="Etiquetas"
								variant="outlined"
								{...register("tags", {
									required: true,
									pattern: /^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i,
								})}
								onMouseEnter={() => setShowTooltip(true)}
								onMouseLeave={() => setShowTooltip(false)}
							></TextField>
						</Tooltip>

						<div>
							<Controller
								control={control}
								name="birth_date"
								render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
									<DatePicker
										{...field}
										inputRef={ref}
										label="Fecha de nacimiento"
										format="DD/MM/YYYY"
										slotProps={{
											textField: {
												variant: "outlined",
											},
										}}
										slots={{
											textField: (inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
												<TextField
													{...inputProps}
													onBlur={onBlur}
													name={name}
													className="bg-indigo-400/10 rounded-2xl w-full"
													sx={{
														"& .MuiOutlinedInput-root": {
															borderRadius: "16px",
														},
													}}
													error={!!fieldState.error}
													helperText={fieldState.error?.message}
												/>
											),
										}}
									/>
								)}
							/>
						</div>
						<TextField
							error={errors.phone ? true : false}
							helperText={errors.phone ? `${errors.phone?.message}` : ""}
							fullWidth
							type="tel"
							className="bg-indigo-400/10 rounded-2xl"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "16px",
								},
							}}
							label="Número Telefónico"
							variant="outlined"
							{...register("phone", {
								required: "Debe ingresar su número telefónico",
							})}
						/>
						<TextField
							type={"text"}
							className="bg-indigo-400/10 rounded-2xl"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "16px",
								},
							}}
							label="Descripción"
							variant="outlined"
							{...register("description", {
								required: "Debe ingresar su descripción",
							})}
							maxRows={4}
							minRows={2}
							multiline
						/>
						<TextField
							error={errors.password ? true : false}
							helperText={errors.pass ? `${errors.password?.message}` : ""}
							type="password"
							className="bg-indigo-400/10 rounded-2xl"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "16px",
								},
							}}
							label="Contraseña"
							variant="outlined"
							{...register("password", {
								required: "Debe ingresar su contraseña",
							})}
						/>
						<TextField
							error={errors.passConfirm ? true : false}
							helperText={errors.passConfirm ? `${errors.passConfirm?.message}` : ""}
							type="password"
							className="bg-indigo-400/10 rounded-2xl"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "16px",
								},
							}}
							label="Confirmar contraseña"
							variant="outlined"
							{...register("passConfirm", {
								required: "Debe confirmar su contraseña",
								validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
							})}
						/>
						<Button
							onClick={() => formRef.current?.requestSubmit()}
							type="submit"
							variant="contained"
							className="w-full bg-tertiary-50 
								hover:bg-tertiary-50/90 active:bg-tertiary-50 
								text-tertiary-99 shadow-none hover:shadow-md rounded-xl"
						>
							Crear Cuenta
						</Button>
					</form>
					{registerErrorMessage && <Alert severity="error">{registerErrorMessage}</Alert>}
					<p className="text-neutral-30 text-md mt-5">
						¿Ya tienes una cuenta?{" "}
						<Link href="/auth/login" className="text-tertiary-50">
							Inicia sesión
						</Link>
					</p>
				</>
			</AuthLayout>
		</>
	);
};

export default Register;
