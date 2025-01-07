import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="site-wrapper">
            <Sidebar />
            <div className="main-wrapper">
                <Header/>
                <main className="content-area">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout; 