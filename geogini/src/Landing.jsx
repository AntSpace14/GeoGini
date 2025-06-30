import { AuroraBackground } from "@/components/ui/aurora-background";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { FlipWords } from "@/components/ui/flip-words";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AvatarCircles } from "@/components/magicui/avatar-circles";



export default function Landing() {
  const navigate = useNavigate();

  const typewriter = [
   
    { text: "GeoGini.", className: "text-4xl sm:text-6xl md:text-7xl lg:text-10xl font-bold" },
  ];

  const flipWords = ["stuck?", "bored?", "frustrated?", "excited?", "curious?"];

  const avatars = [
    {
      imageUrl: "https://github.com/AntSpace14.png", // Replace with your real GitHub user ID
      profileUrl: "https://github.com/AntSpace14", // Replace with your GitHub URL
    },
  ];


  return (
    <AuroraBackground>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center text-white px-4">

        {/* Top sentence very close to typewriter */}
        <div className="flex flex-col items-center">
        <p className="italic text-base sm:text-lg md:text-lg lg:text-xl text-neutral-200 dark:text-neutral-300 -mb-1 sm:-mb-2 md:-mb-3 text-center">
        Interact with maps and AI both like never before
        </p>

          <TypewriterEffectSmooth words={typewriter} />
        </div>
        
        <div className="flex justify-center px-3 mt-5 sm:mt-4 md:mt-4 lg:mt-4">
        <div className="font-sans text-left text-3xl sm:text-2xl md:text-4xl font-normal text-neutral-200 dark:text-neutral-100 leading-tight">
        <p className="text-bold">Feeling</p>
        <p className="italic">
        <FlipWords words={flipWords} />
        </p>
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
      Learn with <AuroraText>AI</AuroraText>
    </h1>
        </div>
        </div>
      
        

        {/* Restored button design + working click */}
        <InteractiveHoverButton
        onClick={() => navigate("/map")}
        className="mt-8 sm:mt-8 md:mt-8 text-base sm:text-lg md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-3"
        >
       Get Started
      </InteractiveHoverButton>
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-50">
      <AvatarCircles numPeople={0} avatarUrls={avatars} />
    </div>
  

      </div>
    </AuroraBackground>
  );
}
