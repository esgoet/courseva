import {Grid2, InputLabel, Paper, Slider, Typography} from "@mui/material";
import {SubmissionDto} from "../../types/courseTypes.ts";
import {Dispatch, SetStateAction} from "react";

type GradeSliderProps = {
    submission: SubmissionDto,
    setSubmission: Dispatch<SetStateAction<SubmissionDto | undefined>>,
    disabled: boolean
};

export default function GradeSlider({submission, setSubmission, disabled}: Readonly<GradeSliderProps>) {
    return (
        <>
            <InputLabel htmlFor={"grade"}>Grade</InputLabel>
            <Grid2 container direction={"row"} spacing={2} size={12}>
                <Grid2 size={{xs: 9, sm: 10.5}}>
                    <Slider
                        name={"grade"}
                        value={submission.grade ?? 0}
                        marks={[{value: 0, label: "0"}, {value: 40, label: "40"}, {value: 70, label: "70"}, {
                            value: 100,
                            label: "100"
                        }]}
                        min={0}
                        max={100}
                        onChange={(_event, value) => setSubmission({
                            ...submission,
                            grade: typeof value === "number" ? value : undefined
                        })}
                        valueLabelDisplay="on"
                        color={submission.grade && submission.grade >= 40 ? "success" : "error"}
                        disabled={disabled}
                    />
                </Grid2>
                <Grid2 size={{xs: 3, sm: 1.5}} textAlign={"center"}>
                    <Paper elevation={10} sx={{px: '4px', py: '3px'}}>
                        <Typography variant={"button"}
                                    color={submission.grade && submission.grade >= 40 ? "success" : "error"}>
                            {submission.grade && submission.grade >= 40 ? "Pass" : "Fail"}
                        </Typography>
                    </Paper>
                </Grid2>
            </Grid2>
        </>
    );
};