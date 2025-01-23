"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        signOut(auth).then(() => {
          console.log("User signed out automatically after registration.");
          router.push("/");
        });
      }, 5000);
    }
  }, [user, auth, router]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Email Verification Required
      </h1>
      <p className="text-center text-gray-700">
        We have sent a verification email to your address:
        <br />
        <span className="font-bold text-gray-900">{user?.email}</span>
      </p>
      <p className="text-center text-gray-700 mt-4">
        Please click on the verification link in the email to activate your
        account.
      </p>
      <p className="text-center text-red-600 mt-4 font-medium">
        After logging in, click on your profile picture and update your details
        You will be logged out automatically in 5 seconds.
      </p>
    </div>
  );
}
