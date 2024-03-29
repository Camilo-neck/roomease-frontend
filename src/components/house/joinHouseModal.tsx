// React
import { useState, useRef } from "react";

// Material UI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Redux
import { useForm } from "react-hook-form";

const initialState = {
	houseCode: "",
};

export default function JoinHouseModal({
	isOpen,
	onClose,
	onSubmit,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: any) => void;
}) {
	const {
		register,
		reset,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ defaultValues: initialState });
	const formRef = useRef<HTMLFormElement | null>(null);

	const handleClose = () => {
		reset(initialState);
		onClose();
	};

	const handleOnSubmit = async (data: any) => {
		onSubmit(data);
		handleClose();
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} className="rounded-2xl">
			<DialogTitle>Unirme a una casa existente</DialogTitle>
			<DialogContent>
				<DialogContentText className="pb-4">
					Pídele a tus roomies que te envíen el código de la casa y únete a ella.
				</DialogContentText>
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
						label="Código de la casa"
						type="text"
						fullWidth
						{...register("houseCode", { required: true })}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="error">
					Cancelar
				</Button>
				<Button onClick={() => formRef.current?.requestSubmit()}>Solicitar unirse</Button>
			</DialogActions>
		</Dialog>
	);
}
