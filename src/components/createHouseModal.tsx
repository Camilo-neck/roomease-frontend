import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useForm } from 'react-hook-form';

const initialState = {
	name: '',
	description: '',
	address: '',
	users: [],
	tags: '',
	house_picture: '',
}

export default function CreateHouseModal({isOpen, onClose, onSubmit}: 
	{isOpen: boolean; onClose: () => void; onSubmit: (data: any) => void}) {
  const { register, reset, handleSubmit, formState: { errors } } = useForm({defaultValues: initialState});
  const formRef = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
	reset(initialState)	
	onClose()
  };

  const handleOnSubmit = async (data: any) => {
	const tmpData = Object.assign({}, data)
	tmpData.tags = tmpData.tags.split(',').map((tag: string) => tag.trim())
	
	console.log(tmpData)
	onSubmit(tmpData)
	handleClose()
  }

  return (
      <Dialog open={isOpen} onClose={handleClose} className="rounded-2xl">
        <DialogTitle>Crea tu nueva casa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Registra tu casa en nuestra app y compártela con otros usuarios. ¡Es fácil y rápido!
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
				label="Nombre de la casa"
				type="text"
				fullWidth
				{...register('name', { required: true })}
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
				{...register('description', { required: true })}
			   />
			   <TextField
				className="rounded-xl"
				sx={{
					"& .MuiOutlinedInput-root": {
						borderRadius: "1rem",
					},
				}}
				margin="dense"
				id="address"
				label="Dirección"
				type="text"
				fullWidth
				{...register('address', { required: true })}
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
				{...register('tags', { required: true, pattern: /,/ })}
			   />
		   </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancelar</Button>
          <Button onClick={() => formRef.current.requestSubmit()}>Crear!</Button>
        </DialogActions>
      </Dialog>
  );
}

