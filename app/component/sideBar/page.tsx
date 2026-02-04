'use client'
import routePath from "./routePath";
import "./index.css"
import {Menu} from "antd";
import React from "react";
import { useRouter } from 'next/navigation'
export default function SideNavBarPage(){
    const router = useRouter()
    const handleClick = (url: string) => {
        console.log("go to" + url);
        // const actUrl = url;
        router.push(url);
    }
    const [currPath, setCurrPath] = React.useState("");
    return (
        <div className="sideNavBar">
            <Menu items={routePath} selectedKeys={[currPath]} onClick={(e)=>handleClick(e.key)}></Menu>
        </div>
    )
}
