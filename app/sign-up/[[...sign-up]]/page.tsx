// import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <p className="text-gray-500 text-center mb-4">
          Authentication temporarily disabled.
        </p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Back to Home
        </button>
      </div>
    </div>
  );
}
