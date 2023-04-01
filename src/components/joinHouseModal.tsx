// React
import { useState, useRef } from "react";

// Material UI
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// MUI Icons
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import CloseIcon from '@mui/icons-material/Close';

// Redux
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";

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
	const user = useSelector(selectUser)
    const {
        register,
        reset,
        handleSubmit,
		watch,
        formState: { errors },
    } = useForm({ defaultValues: initialState });
    const formRef = useRef<HTMLFormElement | null>(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        reset(initialState);
        onClose();
    };

    const handleOnSubmit = async (data: any) => {
        const tmpData = Object.assign({}, data);
        tmpData.tags = tmpData.tags.split(",").map((tag: string) => tag.trim());

        console.log(tmpData);
        onSubmit(tmpData);
        handleClose();
    };

	console.log(errors)
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
                        type="number"
                        fullWidth
                        {...register("houseCode", { required: true })}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancelar
                </Button>
                <Button onClick={() => formRef.current?.requestSubmit()}>
                    Solicitar unirse
                </Button>
            </DialogActions>
        </Dialog>
    );
}
