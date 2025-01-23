"use client";

import "./globals.css";
import AppFooter from "./components/AppFooter";
import Navbar from "./components/AppNavbar";
import Sidebar from "./components/AppSidebar";
import { AuthProvider } from "./lib/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <div className="flex flex-1 relative">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 w-full">{children}</main>
          </div>
          <AppFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
