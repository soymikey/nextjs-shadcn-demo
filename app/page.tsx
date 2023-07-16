import UserAuthForm from "@/components/UserAuthForm";

function LoginPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your username below to login your account
        </p>
      </div>
      <UserAuthForm />
    </div>
  );
}

export default LoginPage;
