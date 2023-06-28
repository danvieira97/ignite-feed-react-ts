import styles from './Header.module.css'

import headerLogo from '../assets/akatsuki-48.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <img src={headerLogo} alt="header-logo" />
            <strong>Ignite Feed</strong>
        </header>
    )
}

export default Header;