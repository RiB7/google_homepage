'use client';  
import Google from '../../../public/images/google-logo.png'
import Image from "next/image";
import Searchbar from '../Components/Searchbar';
import styles from "../styles/homepage.module.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useRouter } from "next/navigation";  
import { useState } from 'react';

export default function Homepage() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const searchQueryHandler = event => {
        
        if (event?.key === "Enter" && searchQuery?.length > 0) {
            router.push(`https://www.google.com/search?q=${searchQuery}`);  
        }
    };
    const routeSearch = () => {
        if (searchQuery?.length > 0) {
            router.push(`https://www.google.com/search?q=${searchQuery}`);  
        }
    }
  
    return (
        <div className={styles.container}>
            <Header/>
            <main className={styles.main}>
                <div className={styles.content}>
                    <Image className={styles.logo} src={Google} alt="Google Logo" width={272} height={92}/>
                    <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchQueryHandler={searchQueryHandler}/>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={routeSearch}>Google Search</button>
                        <button className={styles.button} onClick={()=>router.push('https://doodles.google/')}>I'm Feeling Lucky</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
