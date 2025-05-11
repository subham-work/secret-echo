import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <header className="header">
      <div className="header-left">SecretEcho</div>
      <div className="header-right">
        <button onClick={handleLogout} className="header-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
