"use client";

import { useState } from "react";
import AmbientBackdrop from "./components/AmbientBackdrop";
import EntryGate from "./components/EntryGate";
import MusicToggle from "./components/MusicToggle";
import SlideShow from "./components/SlideShow";
import PetalBurst from "./components/PetalBurst";
import GlareOverlay from "./components/GlareOverlay";
import { playWindWhoosh } from "./utils/windSound";
import GreetingScene from "./scenes/GreetingScene";
import LetterScene from "./scenes/LetterScene";
import GalleryScene from "./scenes/GalleryScene";
import InvitationScene from "./scenes/InvitationScene";
import SpotifyScene from "./scenes/SpotifyScene";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [glareTrigger, setGlareTrigger] = useState(0);

  const scenes = [
    <GreetingScene key="greeting" />,
    <LetterScene key="letter" />,
    <GalleryScene key="gallery" />,
    <InvitationScene key="invitation" />,
    <SpotifyScene key="spotify" />,
  ];

  const handleEnter = () => {
    setGlareTrigger((n) => n + 1);
    setBurstTrigger((n) => n + 1);
    playWindWhoosh(0.8);
    setEntered(true);
  };

  return (
    <main className="relative h-[100dvh] w-full">
      <AmbientBackdrop />
      <EntryGate onEnter={handleEnter} />
      <GlareOverlay trigger={glareTrigger} />
      <PetalBurst trigger={burstTrigger} />
      {entered && (
        <>
          <SlideShow scenes={scenes} />
          <MusicToggle />
        </>
      )}
    </main>
  );
}
