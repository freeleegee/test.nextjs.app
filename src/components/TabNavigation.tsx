import Link from 'next/link';
import '../styles/globals.css';

const TabNavigation: React.FC = () => {
return (
<nav>
<ul>
<li>
<Link  href="/read" style={{ textDecoration: 'underline' }}>Read Records</Link>
</li>
</ul>
<ul>
<li>
<Link  href="/write" style={{ textDecoration: 'underline' }}>Write Record</Link>
</li>
</ul>
</nav>
);
};

export default TabNavigation;