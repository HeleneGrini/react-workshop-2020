import Link from "next/link";
import { useRouter } from "next/router";

export const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto flex-row">
        <li className={`nav-item ${router.asPath === "/" ? "active" : ""}`}>
          <Link href="/">
            <a className="nav-link">Hjem</a>
          </Link>
        </li>
        <li
          className={`nav-item ${router.asPath === "/forms" ? "active" : ""}`}
        >
          <Link href="/forms">
            <a className="nav-link">Forms</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
