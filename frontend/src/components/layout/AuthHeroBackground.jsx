
import React from "react";
import { CheckCircle, Leaf, ShieldCheck } from "lucide-react";

export const AuthHeroBackground = ({ children }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">

      {/* Main hero image behind the form */}
      <div
        className="absolute top-0 left-0 w-full h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dvjpd3ofj/image/upload/v1763216901/top-view-indian-dessert-arrangement_1_ota0na.jpg')",
        }}
      >
        {/* Light overlay so text and form stay readable */}
        <div className="absolute inset-0 bg-black/12"></div>
      </div>

      {/* Wrapper that positions the form at the point where the hero image meets the lower area */}
      <div
        className="absolute left-1/2 z-20 w-full max-w-md px-4"
        style={{
          top: "calc(var(--nav-height, 64px) + 60vh - 350px)",
          transform: "translateX(-50%)",
        }}
      >
        {/* Container that keeps a fixed desktop height so alignment stays consistent */}
        <div className="mx-auto">
          <div className="h-[480px] sm:h-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Icons + quality labels sitting right under the form */}
      <div
        className="absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-6 px-4 flex-wrap justify-center text-sm"
        style={{
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
