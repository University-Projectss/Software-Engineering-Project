export default function Login() {
  return (
    <div className="w-screen h-screen flex flex-row items-center">
      <div className="h-screen w-1/2 overflow-hidden">
        <img src="/login-cat.png" alt="cat on purple background" />
      </div>
      <div className="relative h-screen w-1/2 flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 h-fit w-fit p-4 px-8 bg-darkPurple rounded-br-3xl">
          <h1 className="text-slate-50 text-5xl font-bold">WELCOME</h1>
        </div>

        <div className="relative h-1/3 flex flex-col border-black border justify-between">
          <h1 className="text-darkPurple text-4xl font-bold">Login</h1>
          <input type="email" name="email" id="email" placeholder="Email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button className="absolute">Login</button>
        </div>

        <div className="absolute flex flex-row bottom-4 text-darkPurple">
          <p className="mr-1">Don't have an account?</p>
          <p className="font-bold underline cursor-pointer">Create one!</p>
        </div>
      </div>
    </div>
  );
}
