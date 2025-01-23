"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully!");
        router.push("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Logout</h2>
      <form onSubmit={onSubmit}>
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        >
          Log Out
        </button>
      </form>
    </div>
  );
}
