'use client';
import Google from '../../../public/images/google-logo.png'
import Image from "next/image";
import Searchbar from '../Components/Searchbar';
import styles from "../styles/homepage.module.css";
import styleMic from "../styles/mic.module.css"
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Homepage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayText, setDisplayText] = useState("Speak Now");
    const [mic, setMic] = useState(false);
    const router = useRouter();
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
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

    const micClicked = mic => {
        setMic(mic);
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setMic(false);
        if (transcript?.length > 0) {
            router.push(`https://www.google.com/search?q=${transcript}`);
        }
    }

    useEffect(() => {
        let timeout, interval;
    
        if (displayText === "Speak Now") {
            // Transition to "Listening" after 2 seconds
            timeout = setTimeout(() => {
                setDisplayText("Listening");
            }, 2000);
        } else if (displayText.startsWith("Listening")) {
            // Animate "Listening..." every 0.3 seconds
            const stages = ["Listening", "Listening.", "Listening..", "Listening..."];
            let stageIndex = 0; // Start from the first stage
            interval = setInterval(() => {
                stageIndex = (stageIndex + 1) % stages.length; // Cycle through stages
                setDisplayText(stages[stageIndex]);
            }, 300); // Adjust the delay between updates
        }
    
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [displayText]);
    

    useEffect(() => {
        console.log(listening, "@@@@@@@")
        // if(!listening && mic){
        //     stopListening();
        // }
    }, [listening]);

    useEffect(() => {
        const recognition = SpeechRecognition.getRecognition();
        if (recognition && mic) {
            recognition.onspeechend = () => {
                console.log('Speech ended');
                stopListening();
            };
        }
    }, [mic, transcript]);

    if (mic) {
        if (!browserSupportsSpeechRecognition) {
            return <span>Browser doesn't support speech recognition.</span>;
        }
        return (
            <Fragment>
                <input className={styleMic.text} type="text" value={transcript || displayText} readOnly/>
                <div className={false ? styleMic.gn2 : styleMic.gn1}>

                    <div className={false ? styleMic.mc2 : styleMic.mc1}>

                    </div>
                </div>
            </Fragment>
        )
    }

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <div className={styles.content}>
                    <Image className={styles.logo} src={Google} alt="Google Logo" width={272} height={92} />
                    <Searchbar setMic={micClicked} searchQuery={searchQuery || transcript} setSearchQuery={setSearchQuery} searchQueryHandler={searchQueryHandler} />
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={routeSearch}>Google Search</button>
                        <button className={styles.button} onClick={() => router.push('https://doodles.google/')}>I'm Feeling Lucky</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
