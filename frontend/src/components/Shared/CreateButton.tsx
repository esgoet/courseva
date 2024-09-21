import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";

type CreateButtonProps = {
    label?: string,
    baseUrl?: string
}

export default function CreateButton({label = "Create", baseUrl}: Readonly<CreateButtonProps>) {
    return (
        <Button
            component={Link} to={baseUrl ? `${baseUrl}/create` : 'create'}
            color={"secondary"}
            startIcon={<AddIcon/>}
            variant={"outlined"}
        >{label}</Button>
    );
};