

import React, { useState, useEffect } from "react";  
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import styles from "../styles/searchBar.module.css";
import MicIcon from "../../../public/images/mic.svg";  
import ImageIcon from "../../../public/images/image.svg";
import Image from "next/image";

export default function Searchbar(props) {
    const {
        searchQuery,
        setSearchQuery,
        searchQueryHandler,
        setMic
    } = props;

    const [isUploadOpen, setIsUploadOpen] = useState(false); // State to handle image upload section visibility
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Preview the selected image
        }
    };
     
    return (
        <div className={styles.searchBox}>
            <AiOutlineSearch size={18} color="#9aa0a6" />
            <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                value={searchQuery}
                autoFocus
                className={styles.searchInput}
            />
            <div className={styles.icons}>
                {searchQuery && (
                    <IoMdClose
                        size={24}
                        color="#70757a"
                        className={styles.clearIcon}
                        onClick={() => setSearchQuery("")}
                    />
                )}
                <Image className={styles.micIcon} src={MicIcon} alt="mic" onClick={()=>setMic(true)}/>
                <Image className={styles.imageIcon} src={ImageIcon} alt="image" onClick={() => setIsUploadOpen(true)}/>
            </div>
            {isUploadOpen && (
                <div className={styles.uploadSection}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                    />
                    {image && <img src={image} alt="Uploaded" className={styles.imagePreview} />}
                    <button 
                        className={styles.closeUploadButton} 
                        onClick={() => setIsUploadOpen(false)} // Close upload section
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};
