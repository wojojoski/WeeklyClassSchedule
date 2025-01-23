"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      {user?.photoURL ? (
        <Link href="/protected/user/profile" passHref>
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-12 h-12 rounded-full border border-gray-300"
          />
        </Link>
      ) : (
        <div>
          <Link href="/protected/user/profile" passHref>
            <img
              className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
              src="/guestpic.jpg"
            />
          </Link>
        </div>
      )}

      <div>
        <p className="font-medium text-white-900">
          {user?.displayName || "Guest"}
        </p>
        <p className="text-sm text-white-600">{user?.email || "No email"}</p>
      </div>
    </div>
  );
}
