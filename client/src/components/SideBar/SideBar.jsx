import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarData } from "./SideBarData";
import Link from "next/link";
import style from '@/css/components/side-bar.module.css';

export default function SideBar() {
    const [selectedItem, setSelectedItem] = useState('Dashboard');

    const handleItemClick = (title) => {
        setSelectedItem(title);
    };

    return (
        <div className={style.container}>
            <ul>
                {SidebarData.map((item, index) => (
                    <li
                    key={index}
                    className={`${item.cName} ${item.title === selectedItem ? style.active : ''}`}
                    onClick={() => handleItemClick(item.title)}>
                    <Link href={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                  
                ))}
            </ul>
        </div>
    );
}
