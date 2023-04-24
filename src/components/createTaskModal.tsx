import React, { useRef } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import { DateTimePicker, DatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import { DialogContentText, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { UserI } from "@/lib/interfaces";
import dayjs from "dayjs";

const initialState = {
	name: "",
	description: "",
	house_id: "",
	users_id: [],
	start_date: "",
	end_date: "",
	repeat: false,
	days: [],
	until_date: "",
};

const CreateTaskModal = ({
	isOpen,
	onClose,
	onSubmit,
	users,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: any) => void;
	users: UserI[];
}) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const {
		register,
		handleSubmit,
		watch,
		control,
		getFieldState,
		formState: { errors },
	} = useForm({ defaultValues: initialState });

	const handleClose = () => {
		onClose();
	};

	const handleOnSubmit = (data: any) => {
		if (getFieldState("repeat")) {
			onSubmit(data);
		} else {
			onSubmit({
				...data,
				days: undefined,
				until_date: undefined,
			});
		}
	};

	console.log(watch("days"));

	return (
		<Dialog open={isOpen} onClose={handleClose} className="rounded-2xl">
			<DialogTitle>Crear tarea</DialogTitle>
			<DialogContent>
				<DialogContentText>Crea y asigna una tarea a un usuario o a ti mismo.</DialogContentText>
				<form ref={formRef} onSubmit={handleSubmit(handleOnSubmit)}>
					<TextField
						{...register("name", { required: true })}
						label="Nombre"
						variant="outlined"
						margin="normal"
						fullWidth
						error={errors.name ? true : false}
					/>
					<div className="grid grid-cols-2 gap-5">
						<Controller
							control={control}
							name="start_date"
							render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
								<MobileDateTimePicker
									{...field}
									inputRef={ref}
									label="Fecha de inicio"
									minDateTime={dayjs()}
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
												fullWidth
												margin="normal"
												error={errors.start_date ? true : false}
											/>
										),
									}}
								/>
							)}
						/>
						<Controller
							control={control}
							name="end_date"
							render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
								<MobileDateTimePicker
									{...field}
									inputRef={ref}
									label="Fecha de finalización"
									minDateTime={dayjs(watch("start_date")) ?? dayjs()}
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
												fullWidth
												margin="normal"
												error={errors.end_date ? true : false}
											/>
										),
									}}
								/>
							)}
						/>
					</div>
					<TextField
						{...register("description", { required: true })}
						label="Descripción"
						variant="outlined"
						margin="normal"
						multiline
						rows={4}
						fullWidth
						error={errors.description ? true : false}
					/>
					<Controller
						name="users_id"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								multiple
								value={value ? users.filter((user) => value.includes(user._id as never)) ?? [] : []}
								options={users}
								getOptionLabel={(option) => option.name}
								onChange={(event, newValue) => {
									onChange(newValue.map((user) => user._id));
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Usuarios"
										variant="outlined"
										margin="normal"
										fullWidth
										error={errors.users_id ? true : false}
									/>
								)}
							/>
						)}
					/>
					Repetir <Switch {...register("repeat")} />
					{watch("repeat") && (
						<div className="flex flex-row items-center gap-5">
							<Controller
								control={control}
								name="days"
								render={({ field: { onChange, value } }) => (
									<ToggleButtonGroup
										aria-label="outlined primary button group"
										size="small"
										className="h-fit"
										value={value}
										onChange={(e, new_value) => {
											onChange(new_value);
										}}
									>
										<ToggleButton value="MO">LUN</ToggleButton>
										<ToggleButton value="TU">MAR</ToggleButton>
										<ToggleButton value="WE">MIÉ</ToggleButton>
										<ToggleButton value="TH">JUE</ToggleButton>
										<ToggleButton value="FR">VIE</ToggleButton>
										<ToggleButton value="SA">SÁB</ToggleButton>
										<ToggleButton value="SU">DOM</ToggleButton>
									</ToggleButtonGroup>
								)}
							/>

							<Controller
								control={control}
								name="until_date"
								render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
									<DatePicker
										{...field}
										inputRef={ref}
										label="Hasta"
										minDate={watch("end_date") ?? new Date()}
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
													fullWidth
													margin="normal"
													error={errors.until_date ? true : false}
												/>
											),
										}}
									/>
								)}
							/>
						</div>
					)}
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancelar
				</Button>
				<Button onClick={() => formRef.current?.requestSubmit()} type="submit" color="primary">
					Crear
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreateTaskModal;
