import { Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "@/css/components/nav-bar.module.css";

export default function NavBar() {
    return (
        <Stack direction="horizontal" gap={3} className={style.container}>
            <div className="item">
                <FontAwesomeIcon icon="fa-solid fa-bars" />

            </div>
            <div>
                <h3>Dashboard</h3>
            </div>

            <div className="item ms-auto">
                <Button>
                    <FontAwesomeIcon icon="fa-solid fa-bell fa-2xl" />
                    <span className="badge bg-primary rounded-pill">14</span>
                </Button>
            </div>
            <div className="item">
                <FontAwesomeIcon
                    icon="fa-solid fa-user-tie" />
            </div>
        </Stack>
    );
}