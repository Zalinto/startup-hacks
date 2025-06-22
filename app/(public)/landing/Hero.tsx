import React from "react";
// import { Safari } from "@/components/magicui/safari";
import { HeroVideoDialog } from "@/components/magicui/hero-video-dialog";
import { Particles } from "@/components/magicui/particles";

const Hero = () => {
  return (
    <section className="relative px-4 mx-auto w-full font-dmSans min-h-screen overflow-hidden flex flex-col pt-[30vh] bg-custom-bg">
      {/* Background particles */}
      <Particles
        className="absolute inset-0 -z-10 pointer-events-none"
        quantity={125}
        color="#ffffff"
        size={0.8}
      />
      <div className="flex flex-col gap-8 w-full mx-auto max-w-7xl text-center">
        {/* Headline */}
        <h1 className="text-white font-bold text-5xl sm:text-7xl">
          Build Zeroto: From Idea to <br /> Launch in Minutes
        </h1>
        {/* Description */}
        <p className="text-lg sm:text-xl text-white">
          Instantly validate, plan, and execute your startup idea <br /> using
          voice and AI agents. No planning required.
        </p>

        {/* CTA */}
        <div className="flex justify-center gap-5 w-full">
          <a
            href="/"
            className="
                bg-white hover:bg-white/90 text-black border-white
                    border shadow-none font-bold text-lg sm:text-xl px-10 py-3 rounded-md 
                    transition duration-200
                "
          >
            Get Started for Free
          </a>
        </div>
        {/* Video */}
        <div className="relative mt-8">
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
      {/* Blur */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0 z-20
          h-4/6
          bg-gradient-to-t
          dark:from-black
        "
      />
    </section>
  );
};

export default Hero;
