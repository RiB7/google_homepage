import { TbGridDots } from "react-icons/tb";
import Image from "next/image";
import Profile from "../../../public/images/profile-200x200.jpg";
import ProfileRing from "../../../public/images/profile-ring.svg";

import styles from "../styles/profileIcon.module.css";

const ProfileIcon = () => {
    return (
        <div className={styles.container}>
            <span className={styles.gridIcon}>
                <TbGridDots size={20} color="#5f6368" />
            </span>
            <span className={styles.profileWrapper}>
                <Image className={styles.profileRing} src={ProfileRing} alt="Profile Ring" />
                <span className={styles.profileImageWrapper}>
                    <Image className={styles.profileImage} src={Profile} alt="Profile" />
                </span>
            </span>
        </div>
    );
};

export default ProfileIcon;
