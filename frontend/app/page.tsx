import Login from "./login/page";

export default function Home() {
  const isLoggedIn = false;

  if (!isLoggedIn) return <Login />;

  return <h1>Hello there home</h1>;
}
