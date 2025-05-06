import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <header className="header">
      <div className="header-left">SecretEcho</div>
      <div className="header-right">
        {username && <span className="header-username">Hi, {username}</span>}
        <button onClick={handleLogout} className="header-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
