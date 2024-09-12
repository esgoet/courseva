import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";

import {Link} from "react-router-dom";
import {useState} from "react";
import {coursePages} from "../../utils/constants.ts";

export default function CourseTabsMobile() {
    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, pb: 1}}  elevation={3}>
            <BottomNavigation
                showLabels
                value={currentTab}
                onChange={(_event, newValue) => {
                    setCurrentTab(newValue);
                }}
            >
                {coursePages.map((page) =>
                    <BottomNavigationAction
                        key={page.url}
                        label={page.title}
                        icon={<page.icon/>}
                        component={Link}
                        to={page.url}
                        disableRipple
                    />
                )}
            </BottomNavigation>
        </Paper>
    );
};