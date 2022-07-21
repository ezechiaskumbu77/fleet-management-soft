import { Button } from "@mui/material";
import {GiConfirmed} from 'react-icons/gi';

export default function ButtonSubmit(props) {
	return (
		<Button color="primary"
            variant="contained"
startIcon={<GiConfirmed color="white"
fontSize="small" />}
{...props}>
			Confirmer
		</Button>
	);
}
