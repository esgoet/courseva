import {Typography} from "@mui/material";

type GradeDisplayProps = {
    grade: number,
};

export default function GradeDisplay({grade}: Readonly<GradeDisplayProps>) {
    return (

        <Typography color={grade >= 40 ? "success" : "error"} sx={{bgcolor: 'background.default', py: '4px', px: '8px', borderRadius: 1}} variant={"button"}>
            {grade.toFixed(2)} / 100
        </Typography>

    );
};