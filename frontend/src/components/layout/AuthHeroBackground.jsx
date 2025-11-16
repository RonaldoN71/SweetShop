// src/components/layout/AuthHeroBackground.jsx
import React from "react";
import { CheckCircle, Leaf, ShieldCheck } from "lucide-react";

/**
 * Layout behaviour:
 * - heroHeight = 60vh
 * - cardHeight (desktop) = 520px (so card center = 260px)
 * - we place card so its center is exactly at (navHeight + heroHeight)
 *
 * Adjust --nav-height in CSS if your navbar is different.
 */

export const AuthHeroBackground = ({ children }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">

      {/* HERO IMAGE (absolute, behind everything) */}
      <div
        className="absolute top-0 left-0 w-full h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dvjpd3ofj/image/upload/v1763216901/top-view-indian-dessert-arrangement_1_ota0na.jpg')",
        }}
      >
        {/* subtle overlay to keep form readable */}
        <div className="absolute inset-0 bg-black/12"></div>
      </div>

      {/* CENTERING WRAPPER.
          We position the card absolutely so we can align its center precisely
          with the bottom of the hero image (taking navbar height into account).
          --nav-height is a CSS variable you can set (fallback 64px).
      */}
      <div
        className="absolute left-1/2 z-20 w-full max-w-md px-4"
        style={{
          // card desktop height = 480px -> center is at 240px
          // top coordinate = navHeight + heroHeight - cardCenter
          // Moving it up more: using -350px instead of -300px
          top: "calc(var(--nav-height, 64px) + 60vh - 350px)",
          transform: "translateX(-50%)",
        }}
      >
        {/* Put the children (card) here.
            IMPORTANT: ensure the card inside uses the same fixed height on desktop
            so the measured center stays correct (we set h-[480px] below for the Card wrapper).
        */}
        <div className="mx-auto">
          {/*
            We wrap children in a container that has the expected measured height
            on desktop (h-[480px]) so the center alignment is exact.
            On small screens we use auto height (sm:h-auto) so layout becomes natural.
          */}
          <div className="h-[480px] sm:h-auto">
            {children}
          </div>
        </div>
      </div>

      {/* FEATURES: positioned just below the form card */}
      <div
        className="absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-6 px-4 flex-wrap justify-center text-sm"
        style={{
          // Position right below the card bottom: moved up by reducing gap from 16px to 8px
          top: "calc(var(--nav-height, 64px) + 60vh - 350px + 480px + 8px)",
          width: "100%",
        }}
      >
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-5 h-5 text-yellow-600" />
          <span className="font-medium text-gray-700">High Quality</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Leaf className="w-5 h-5 text-green-600" />
          <span className="font-medium text-gray-700">100% Vegetarian</span>
        </div>

        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-5 h-5 text-yellow-700" />
          <span className="font-medium text-gray-700">Hygienic</span>
        </div>
      </div>
    </div>
  );
};
