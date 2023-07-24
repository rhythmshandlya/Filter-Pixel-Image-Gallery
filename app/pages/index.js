import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SwitchableTabs from "../components/tabs/SwitchableTabs";
import ImageGallery from "../components/gallery/ImageGallery";

export default function Home() {
  return (
    <div className={styles.container}>
      <SwitchableTabs>
        <div>
          <ImageGallery />
        </div>
        <div></div>
      </SwitchableTabs>
    </div>
  );
}
