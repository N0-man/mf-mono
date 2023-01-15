import './styles.css';

function Header() {
  return (<header>
    <h1>n0man's Cafe</h1>
    <nav>
      <ul>
        <li><a href="/">Welcome</a></li>
        <li><a href="/eat">Eat</a></li>
        <li><a href="/drink">Drink</a></li>
        <li><a href="/enjoy">Enjoy</a></li>
        <li><a href="/gohome">Go Home</a></li>
      </ul>
    </nav>
  </header>);
}

export default Header;
