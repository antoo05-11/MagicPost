import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getRole() {
    return 'leader';
}

const userRole = getRole();

export const SidebarData = [
    {
        title: 'Dashboard',
        path: `/employees/${userRole.toLowerCase()}/dashboard`,
        icon: <FontAwesomeIcon icon="fa-solid fa-chart-line" />,
    },
    {
        title: 'Order',
        path: '/',
        icon: <FontAwesomeIcon icon="fa-solid fa-box-archive" />,
    },
    {
        title: 'Account',
        path: '/',
        icon: <FontAwesomeIcon icon="user" />,
    },
];