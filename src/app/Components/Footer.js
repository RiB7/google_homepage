import React from "react";
import { quickLinks, settingMenu } from "../utils/constants";
import styles from "../styles/footer.module.css";  

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <span className={styles.text}>India</span>
      </div>

      {/* Quick Links and Settings Menu section */}
      <div className={styles.links}>
        <div className={styles.container}>
          {quickLinks.map((menu, index) => (
            <span key={index} className={styles.link}>
              {menu}
            </span>
          ))}
        </div>

        <div className={styles.container}>
          {settingMenu.map((menu, index) => (
            <span key={index} className={styles.link}>
              {menu}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
