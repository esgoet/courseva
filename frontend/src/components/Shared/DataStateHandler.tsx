import {Skeleton} from "@mui/material";
import {ReactNode} from "react";

type DataStateHandlerProps = {
    loading: boolean,
    error: Error | undefined,
    height: string
    children: ReactNode,
};

export default function DataStateHandler({loading, error, height, children}: Readonly<DataStateHandlerProps>) {
    if (loading) {
        return <Skeleton variant="rounded" height={height} />;
    }

    if (error) {
        return <p>Apologies. Something went wrong. {error.message}.</p>;
    }

    return <>{children}</>;
};