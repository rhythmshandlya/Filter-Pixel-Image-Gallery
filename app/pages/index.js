import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SwitchableTabs from "../components/tabs/SwitchableTabs";
import ImageGallery from "../components/gallery/ImageGallery";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div className={styles.container}>
        <button
          className="text-red-200"
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>

        <SwitchableTabs>
          <div>
            <ImageGallery />
          </div>
          <div></div>
        </SwitchableTabs>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="text-red-200"
          onClick={() => {
            signIn();
          }}
        >
          Sign in
        </button>
      </div>
    );
  }
}
