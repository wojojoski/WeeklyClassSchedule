"use client";

import { Sidebar } from "flowbite-react";
import { MdArticle } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../lib/AuthContext";

export default function AppSidebar() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }
  console.log(user);

  return (
    <Sidebar aria-label="Sidebar with menu" className="w-60">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={FaHome}>
            Home
          </Sidebar.Item>
          <Sidebar.Item href="/protected/articles" icon={MdArticle}>
            Your Articles
          </Sidebar.Item>
          <Sidebar.Item
            href="/protected/classschedule"
            icon={RiCalendarScheduleLine}
          >
            Class Schedule
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
