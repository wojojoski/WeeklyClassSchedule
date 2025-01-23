"use client";

import { Sidebar } from "flowbite-react";
import { MdArticle } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaHome, FaBars } from "react-icons/fa";
import { useAuth } from "../lib/AuthContext";
import { useState } from "react";

export default function AppSidebar() {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return null;
  }
  console.log(user);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar aria-label="Sidebar with menu" className="w-60 h-full">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/"
                icon={FaHome}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Sidebar.Item>
              <Sidebar.Item
                href="/protected/articles"
                icon={MdArticle}
                onClick={() => setIsOpen(false)}
              >
                Your Articles
              </Sidebar.Item>
              <Sidebar.Item
                href="/protected/classschedule"
                icon={RiCalendarScheduleLine}
                onClick={() => setIsOpen(false)}
              >
                Class Schedule
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  );
}
