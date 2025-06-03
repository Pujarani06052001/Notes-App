import Header from "../components/Header";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
export default function Home() {
  return (
    <div>
      <Header />
      <h1>My Notes</h1>
      <LoginForm />
      <SignupForm />
    </div>
    
  );
}
