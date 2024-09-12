import {Tab, Tabs} from "@mui/material";
import {Link} from "react-router-dom";
import {coursePages} from "../../utils/constants.ts";
import {useState} from "react";

export default function CourseTabs() {
    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <Tabs
            value={currentTab}
            component={"nav"}
            onChange={(_event, newValue) => {
            setCurrentTab(newValue);
            }}
            variant={'fullWidth'}
        >
            {coursePages.map(page =>
                <Tab
                    key={page.url}
                    icon={<page.icon/>}
                    iconPosition={"start"}
                    label={page.title}
                    component={Link}
                    to={page.url}
                    disableRipple
                />)}
        </Tabs>
    );
}