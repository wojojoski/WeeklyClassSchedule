import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 text-center p-4">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
