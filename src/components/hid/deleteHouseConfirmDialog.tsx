import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteHouseConfirmDialogProps {
	open: boolean;
	handleClose: () => void;
	onConfirm: () => void;
}

const DeleteHouseConfirmDialog = ({ open, handleClose, onConfirm }: DeleteHouseConfirmDialogProps) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"¿Está seguro de eliminar esta casa?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Recuerde que esta acción no se puede deshacer.
				</DialogContentText>
			</DialogContent>
			<DialogActions className="flex flex-row items-center">
				<Button
					style={{ textTransform: "none" }}
					className="bg-error-90/70 hover:bg-error-90/90 active:bg-error-80/80 focus:border-error-50 rounded-2xl w-[50%]"
					size="small"
					color="error"
					onClick={handleClose}
					autoFocus
				>
					Cancelar
				</Button>
				<Button
					style={{ textTransform: "none" }}
					className="bg-secondary-90/70 hover:bg-secondary-90/90 active:bg-secondary-80/80 rounded-2xl w-[50%]"
					size="small"
					onClick={onConfirm}
				>
					Confirmar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteHouseConfirmDialog;
