import {Tab, Tabs} from "@mui/material";
import {Link, matchPath, useLocation} from "react-router-dom";
import {coursePages} from "../../utils/constants.ts";

export default function CourseTabs() {
    const routeMatch = useRouteMatch(['/course/:courseId/participants', '/course/:courseId/lessons', '/course/:courseId/assignments']);
    const currentTab = routeMatch ?? 0;

    function useRouteMatch(patterns: readonly string[]) {
        const { pathname } = useLocation();
        for (let i = 0; i < patterns.length; i += 1) {
            const pattern = patterns[i];
            const possibleMatch = matchPath(pattern, pathname);
            if (possibleMatch !== null) {
                return i;
            }
        }
        return null;
    }

    return (
        <Tabs value={currentTab} component={"nav"}>
            {coursePages.map(page => <Tab key={page.url} icon={<page.icon/>} iconPosition={"start"} label={page.title} to={page.url} component={Link}/>)}
        </Tabs>
    );
}