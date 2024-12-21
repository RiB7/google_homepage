import ProfileIcon from "./ProfileIcon";
import styles from "../styles/header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <span className={styles.link}>Gmail</span>
                <span className={styles.link}>Images</span>
            </div>
            <ProfileIcon />
        </header>
    );
}
