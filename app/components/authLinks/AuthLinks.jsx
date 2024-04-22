// Import necessary components
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  // Use state for the menu toggle
  const [open, setOpen] = useState(false);

  // Get session information using useSession
  const { data: session, status } = useSession();

  return (
    <>
      {/* Render links based on authentication status */}
      {status === "loading" ? (
        <p>Loading...</p> // Display loading indicator while fetching session
      ) : status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={() => signOut()}>
            Logout
          </span>
        </>
      )}

      {/* Hamburger menu toggle button */}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {/* Responsive menu when open */}
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>

          {/* Render links based on authentication status within the menu */}
          {session ? ( // Check for session existence before accessing data
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link} onClick={() => signOut()}>
                Logout
              </span>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
