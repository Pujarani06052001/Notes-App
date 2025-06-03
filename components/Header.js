import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">📝 My Notes</span>
      </div>
      <nav className="header-right">
        <Link href="/notes">Notes</Link>
        <Link href="/about">About</Link>
        <Link href="/account">Account</Link>
        <button className="logout-btn">Logout</button>
      </nav>
    </header>
  );
}
