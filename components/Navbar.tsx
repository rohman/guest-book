import Link from 'next/link';

const Navbar = () => {
    return (<nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Guest Book</a>
        </Link>
        <Link href="/guestbook/new">
            <a className="create">Create Guest Book</a>
        </Link>
    </nav>);
}

export default Navbar;