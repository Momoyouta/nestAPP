import React from "react";
import "./global.css";
import TopNavBarPage from "./component/TopNavBarPage";
import SideNavBarPage from "./component/sideBar/page";
import { App } from 'antd';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='zh'>
            <body>
                <App>
                    <TopNavBarPage/>
                    <div className="body-container">
                        <SideNavBarPage/>
                        {children}
                    </div>
                </App>
            </body>
        </html>
    )
}
