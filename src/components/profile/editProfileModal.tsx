// React
import { useState, useRef } from "react";
//Firebase
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

// Material UI
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// MUI Icons
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CloseIcon from "@mui/icons-material/Close";

import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { UserEditI } from "@/dtos/userEdit";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

let initialState = {
	name: "",
	phone: "",
	description: "",
	password: "",
	birth_date: "",
	tags: "",
	profile_picture: "",
};

export default function EditProfileModal({
	isOpen,
	onClose,
	onSubmit,
	userInfo,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: any) => void;
	userInfo: UserEditI;
}) {
	const user = useSelector(selectUser);
	const {
		register,
		reset,
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm({ defaultValues: userInfo });
	
	const [image, setImage] = useState<string | null>(null);
	const [imageLoading, setImageLoading] = useState<boolean>(false);
	const formRef = useRef<HTMLFormElement | null>(null);
	const [open, setOpen] = useState(false);
	initialState = userInfo;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		reset(initialState);
		setImage(null);
		onClose();
	};

	const handleOnSubmit = async (data: any) => {
		const tmpData = Object.assign({}, data);
		tmpData.tags = tmpData.tags.split(",").map((tag: string) => tag.trim());
		tmpData.birth_date = Date.parse(tmpData.birth_date);
		initialState = data;
		onSubmit(tmpData);
		handleClose();
	};

	const loadImageToFirebase = async (file: File) => {
		const metadata = {
			contentType: file.type,
		};
		const file_name: string = file.name.slice(0, file.name.lastIndexOf(".")).replace(/[^a-zA-Z0-9]/g, "");
		const storageRef = ref(storage, `images/${user._id.slice(0, 5)}${file_name}${new Date().getTime()}`);
		const uploadTask = uploadBytesResumable(storageRef, file, metadata);
		if (file)
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setImageLoading(true);
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
						case "success":
							setImageLoading(false);
							break;
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log("File available at", downloadURL);
						setImage(file.name);
						reset((formValues) => ({
							...formValues,
							profile_picture: downloadURL,
						}));
						setImageLoading(false);
					});
				},
			);
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} className="rounded-2xl">
			<DialogTitle className="flex justify-center">Editar mi información</DialogTitle>
			<DialogContent>
				<form ref={formRef} onSubmit={handleSubmit(handleOnSubmit)}>
					<TextField
						autoFocus
						className="rounded-xl"
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "1rem",
							},
						}}
						margin="dense"
						id="name"
						label="Nombre"
						type="text"
						fullWidth
						{...register("name")}
					/>
					<TextField
						className="rounded-xl"
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "1rem",
							},
						}}
						margin="dense"
						id="phone"
						label="Teléfono"
						type="text"
						fullWidth
						{...register("phone")}
					/>
					<TextField
						className="rounded-xl"
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "1rem",
							},
						}}
						margin="dense"
						id="description"
						label="Descripción"
						type="text"
						fullWidth
						multiline
						rows={4}
						{...register("description")}
					/>
					{/* <div>
						<Controller
							control={control}
							name="birth_date"
							render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
								<DatePicker
									{...field}
									inputRef={ref}
									label="Fecha de nacimiento"
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
					</div> */}
					<TextField
						className="rounded-xl"
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "1rem",
							},
						}}
						margin="dense"
						id="birthdate"
						label="Fecha de nacimiento"
						type="text"
						fullWidth
						rows={4}
						{...register("birth_date")}
					/>
					<TextField
						className="rounded-xl"
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "1rem",
							},
						}}
						margin="dense"
						id="tags"
						label="Etiquetas"
						type="text"
						fullWidth
						helperText="Separa las etiquetas con comas"
						{...register("tags", {
							pattern: /([a-zA-Z0-9]+,?\s?)+/,
						})}
					/>
					<TextField
						className="rounded-xl"
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "1rem",
							},
						}}
						margin="dense"
						id="password"
						label="Contraseña"
						type="text"
						fullWidth
						rows={4}
						{...register("password", { required: "Debes ingresar la contraseña" })}
					/>
					<div className="flex flex-row items-center gap-4 mt-2">
						<input
							accept="image/*"
							style={{ display: "none" }}
							id="raised-button-file"
							type="file"
							{...register("profile_picture", {
								onChange: async (e) => {
									const file = e.target.files[0];
									if (file) await loadImageToFirebase(file);
								},
							})}
						/>
						<label htmlFor="raised-button-file">
							<Button
								variant="contained"
								component="span"
								className="rounded-full"
								startIcon={<AddPhotoAlternateRoundedIcon />}
							>
								{image ? "Cambiar imagen" : "Subir foto de perfil"}
							</Button>
						</label>
						{imageLoading ? <CircularProgress size={24} /> : <p className="max-w-32 truncate text-ellipsis">{image}</p>}
						{image && (
							<IconButton
								onClick={() => {
									setImage(null);
									reset((formValues) => ({ ...formValues, house_picture: "" }));
								}}
								color="error"
								className="rounded-full"
							>
								<CloseIcon />
							</IconButton>
						)}
					</div>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="error">
					Cancelar
				</Button>
				<Button onClick={() => formRef.current?.requestSubmit()}>Actualizar</Button>
			</DialogActions>
		</Dialog>
	);
}
