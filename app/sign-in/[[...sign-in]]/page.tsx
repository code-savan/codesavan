import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="auth-container flex items-center justify-center min-h-[calc(100vh-100px)] py-10">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-[550px]",
            card: "shadow-xl border border-gray-100",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
            formFieldInput: "rounded-md border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600",
            footerActionLink: "text-blue-600 hover:text-blue-800"
          },
          variables: {
            colorPrimary: '#2563eb'
          }
        }}
        signUpUrl="/sign-up"
        afterSignInUrl="/admin"
      />
    </div>
  );
}
