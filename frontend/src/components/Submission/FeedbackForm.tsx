import CustomRichTextEditor from "../Shared/CustomRichTextEditor.tsx";
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {Dispatch, FormEvent, ForwardedRef, forwardRef, SetStateAction, useEffect, useState} from "react";
import {SubmissionDto} from "../../types/courseTypes.ts";
import GradeSlider from "../Shared/GradeSlider.tsx";
import type {RichTextEditorRef} from "mui-tiptap";

type FeedbackFormProps = {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    submission: SubmissionDto,
    setSubmission: Dispatch<SetStateAction<SubmissionDto | undefined>>
};

const FeedbackForm = forwardRef(function FeedbackForm({handleSubmit, submission, setSubmission}: Readonly<FeedbackFormProps>, ref: ForwardedRef<RichTextEditorRef>) {
    const [showGrade, setShowGrade] = useState<boolean>(false);

    useEffect(() => {
        if (submission.grade || submission.grade === 0) setShowGrade(true);
    },[submission.grade])

    const handleGrade = () => {
        if (showGrade) {
            setSubmission({
                ...submission,
                grade: undefined
            })
        } else {
            setSubmission({
                ...submission,
                grade: 0
            })
        }
        setShowGrade(!showGrade)
    }

    return (
        <form onSubmit={handleSubmit}>
            <CustomRichTextEditor initialValue={submission.feedback ?? ""} ref={ref}/>
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={handleGrade} checked={showGrade} />} label="Include Grade" />
            </FormGroup>
            {showGrade &&
                <GradeSlider submission={submission} setSubmission={setSubmission} disabled={false}/>
            }
            <Button type={"submit"} variant={"outlined"} color={"secondary"}>Submit Feedback</Button>
        </form>
    );
});

export default FeedbackForm;