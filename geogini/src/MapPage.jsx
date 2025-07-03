// --- MODIFIED GEO-GINI MAP PAGE WITH IMAGE UPLOAD ---

"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShineBorder } from "@/components/magicui/shine-border";
import { MagicButton } from "@/components/ui/MagicButton";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import ReactMarkdown from "react-markdown";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

import { useEffect, useState, useRef } from "react";

function formatAIResponse(raw) {
  if (!raw) return "";

  // Convert lines that look like headers into real markdown headers
  const withMarkdownHeaders = raw.replace(
    /^(?=(?:[A-Z][^:\n]{1,80}:))(.+?):/gm,
    (_, heading) => `### ${heading.trim()}:\n`
  );

  return withMarkdownHeaders;
}

export default function MapPage() {
  const [metrics, setMetrics] = useState(null);
  const [chatPrompt, setChatPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [askingAI, setAskingAI] = useState(false);
  const avatars = [
    {
      imageUrl:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", // Replace with your real GitHub user ID
      profileUrl: "https://github.com/AntSpace14", // Replace with your GitHub URL
    },
  ];

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;
      if (data?.status === "loading") {
        console.log("🕐 Region selected, metrics loading...");
        setLoading(true);
        return;
      }
      console.log("🎯 Message received:", event.data);
      console.log("🌍 From origin:", event.origin);
      if (typeof event.data === "object" && event.data.lat && event.data.lon) {
        console.log("✅ Valid metrics received!");
        setMetrics(event.data);
        setLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 overflow-x-hidden">
      {/* 🌌 Background Beams */}
      <BackgroundBeams />

      {/* 💡 Instruction Card */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-[90%] sm:w-[40rem]">
        <div className="absolute top-1 right-1 sm:top-2 sm:right-4 z-50 scale-75 sm:scale-80 md:scale-90 lg:scale-95">
          <AvatarCircles numPeople={0} avatarUrls={avatars} />
        </div>
        <CardSpotlight className="w-full">
          {/* 🧭 Welcome Message */}
          <div className="text-xl sm:text-2xl font-semibold text-white mb-2">
            <p>
              Welcome to{" "}
              <span className="font-bold text-cyan-400">GeoGini</span>{" "}
              <span className="italic font-extralight text-neutral-300">
                by Antariksh Sarmah
              </span>
            </p>
          </div>

          <p className="text-sm text-neutral-300">
            GeoGini lets you explore environmental and demographic
            characteristics of any region on the map using satellite data.
            Select an area to get started, ask questions, and analyze trends
            across time.
          </p>

          {/* ⚠️ Recommendation */}
          <p className="mt-4 text-sm text-yellow-300 font-medium">
            ⚠️ For best experience, use a desktop with fullscreen mode in the
            map.
          </p>

          {/* 🪄 Instructions Modal Trigger */}
          <div className="relative z-20 mt-6">
            <Modal>
              <ModalTrigger
                renderAs="div"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-2 text-sm font-semibold text-black dark:text-white bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 transition-transform duration-300 ease-out hover:scale-105 active:scale-95 "
              >
                <span className="relative z-10 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black dark:text-white">
                  Click to know Instructions
                </span>

                {/* Shimmer background on hover */}
                <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 via-black/10 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Hover ring glow */}
                <span className="absolute inset-0 rounded-md ring-1 ring-white/10 group-hover:ring-2 group-hover:ring-neutral-400 dark:group-hover:ring-white/40 transition duration-300 pointer-events-none" />
              </ModalTrigger>

              <ModalBody>
                <ModalContent>
                  <h3 className="text-lg font-bold text-white text-center mb-2">
                    🧪 How to Use GeoGini
                  </h3>

                  {/* 📋 Step-by-step Instructions */}
                  <ul className="text-sm text-neutral-200 space-y-3 mt-4 list-disc list-inside">
                    <li>
                      🖱️ Pick a selection tool from the top-left of the map
                      (preferably the rectangle), and draw over the region
                      you're interested in.
                    </li>
                    <li>
                      ⏳ Wait a few seconds while GeoGini extracts scientific
                      metrics for your selection.
                    </li>
                    <li>
                      🤖 Ask questions in the chat box below — including the
                      name of the region (if known) helps the AI give better
                      answers.
                    </li>
                    <li>
                      🖱️ To make another selection, first click 'exit' on map,
                      click existing shape and delete it, then select the tool
                      again to draw.
                    </li>

                    <li>
                      📈 It's a work in progress, so ocassional inaccuracies may
                      happen, therefore it's recommended to provide region name
                      for better context to the AI.
                    </li>
                    <li>
                      🗺️ You can also toggle individual layers under the
                      "Layers" menu on the map to visualize metrics directly.
                    </li>
                    <li>
                      🤖 You can also upload images/take screenshots of map
                      portions and ask ai directly, or with the selection in the
                      map.
                    </li>
                  </ul>

                  {/* 🎨 Layer Legend */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-white mb-2">
                      🗂️ Layer Color Meanings:
                    </p>
                    <ul className="text-sm text-neutral-300 space-y-1 list-disc list-inside">
                      <li>
                        <strong>🌿 NDVI (Vegetation):</strong> Green = healthy
                        vegetation, White/Brown = little/no vegetation.
                      </li>
                      <li>
                        <strong>🔥 LST (Land Surface Temperature):</strong> Red
                        = hot zones, Blue = cooler areas.
                      </li>
                      <li>
                        <strong>🌧 Rainfall (daily):</strong> Red shades =
                        Intense rainfall, yellow = heavy, green = moderate .
                      </li>
                      <li>
                        <strong>💧 Water Frequency:</strong> Blue = permanent
                        water, White = seasonal or rare.
                      </li>
                      <li>
                        <strong>👥 Population Density:</strong> Brighter= More
                        Population
                      </li>
                    </ul>
                  </div>
                </ModalContent>
              </ModalBody>
            </Modal>
          </div>
        </CardSpotlight>
      </div>

      {/* 🌍 Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 px-4 pt-[24rem] pb-16 text-white">
        {/* 🗺 Map Card */}
        {/* 🗺 Map Card with BorderBeam */}
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-xl bg-black/30 backdrop-blur-sm">
            {/* 🎇 Border Beams */}
            <BorderBeam
              duration={5}
              size={600}
              className="from-transparent via-[#FE8FB5] to-transparent"
            />
            <BorderBeam
              duration={5}
              delay={2.5}
              size={600}
              borderWidth={4}
              className="from-transparent via-[#A07CFE] to-transparent"
            />

            {/* 🌍 Map */}
            <iframe
              src="https://antariksh.users.earthengine.app/view/geogini-gee-latest"
              className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[580px] border-none rounded-2xl"
              title="GEE Map"
              allowFullScreen
            />
          </div>
        </div>
        {/* 💬 Chat Box */}
        <div className="relative w-full max-w-3xl rounded-2xl">
          <ShineBorder
            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            className="rounded-2xl"
          />
          <div className="relative z-10 w-full bg-zinc-900/80 rounded-2xl p-6 shadow-lg">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-28 space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-400 border-t-transparent" />
                <p className="italic text-sm text-neutral-300 animate-pulse">
                  Hold on... loading regional data
                </p>
              </div>
            ) : (
              <textarea
                className="w-full h-28 p-4 rounded-lg bg-black text-white resize-none border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Always mention the region name in your prompt..."
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
              />
            )}
            {metrics && (
              <div className="mt-2 text-sm text-neutral-400">
                ✅ Metrics loaded for selected region.
                <button
                  onClick={() => setMetrics(null)}
                  className="ml-3 text-xs text-red-400 hover:text-red-600 underline"
                >
                  Clear Metrics
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {imageFile && (
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm text-neutral-400">📎 {imageFile.name}</p>
                <button
                  onClick={() => setImageFile(null)}
                  className="text-xs text-red-400 hover:text-red-600 underline"
                >
                  Clear
                </button>
              </div>
            )}

            <div className="w-full flex flex-col sm:flex-row items-center gap-4">
              <RainbowButton
                className="w-full sm:w-auto sm:min-w-[120px] text-center rounded-4xl"
                onClick={handleUploadClick}
              >
                Upload Image
              </RainbowButton>

              <RainbowButton
                className="w-full sm:w-auto sm:min-w-[120px] text-center rounded-4xl"
                onClick={async () => {
                  setAiResponse(null);
                  const noImage = !imageFile;
                  const noPrompt = !chatPrompt.trim();
                  const noRegion = !metrics;

                  const canAskAI =
                    imageFile ||
                    (!imageFile && !noPrompt && !metrics) ||
                    (!imageFile && !noPrompt && metrics);

                  if (!canAskAI) {
                    alert(
                      "⚠️ Please upload an image or write a prompt before asking AI."
                    );
                    return;
                  }

                  if (imageFile && chatPrompt.trim() === "") {
                    alert("⚠️ Please enter a prompt along with the image.");
                    return;
                  }

                  setAskingAI(true); // NEW: Spinner for AI asking only

                  const formData = new FormData();
                  formData.append("prompt", chatPrompt);
                  if (imageFile) formData.append("image", imageFile);
                  if (metrics)
                    formData.append("metrics", JSON.stringify(metrics));

                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_API_BASE_URL}/api/ask-mistral`,
                      {
                        method: "POST",
                        body: formData,
                      }
                    );
                    const data = await res.json();
                    setAiResponse(data.answer);
                  } catch (err) {
                    console.error("❌ Failed to fetch AI response:", err);
                    setAiResponse(
                      "⚠️ Something went wrong while contacting the AI server."
                    );
                  } finally {
                    setAskingAI(false); // Reset AI spinner
                  }
                }}
              >
                {askingAI ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-black">Loading...</span>
                  </div>
                ) : (
                  "Ask AI"
                )}
              </RainbowButton>

              <div className="w-full sm:w-auto sm:min-w-[180px]">
                <Modal>
                  <ModalTrigger className="w-full sm:w-auto text-center">
                    <MagicButton className="w-full sm:w-auto">
                      Show Temporal Data
                    </MagicButton>
                  </ModalTrigger>

                  <ModalBody>
                    <ModalContent>
                      <h3 className="text-lg font-bold text-white text-center mb-2">
                        📊 Temporal Region Summary
                      </h3>
                      <p className="text-sm text-neutral-400 text-center mb-6">
                        This data represents the average environmental
                        conditions for the selected region, calculated over the
                        period <strong>Jan 2024 – Jan 2025</strong>. The layers
                        under map show more recent data filtered with a smaller
                        range. Each metric is derived from high-resolution
                        satellite datasets and aggregated using region-specific
                        means.
                      </p>

                      <div className="text-sm space-y-2 text-neutral-200">
                        <p>
                          <strong>📍 Coordinates:</strong>{" "}
                          <span className="text-cyan-500">{metrics?.lat}</span>,{" "}
                          <span className="text-cyan-500">{metrics?.lon}</span>
                        </p>
                        <p>
                          <strong>🌿 NDVI:</strong>{" "}
                          <span className="text-pink-500">{metrics?.ndvi}</span>{" "}
                          — Average vegetation greenness (2024-2025)
                        </p>
                        <p>
                          <strong>🔥 Land Surface Temp (LST):</strong>{" "}
                          <span className="text-pink-500">
                            {metrics?.lst} °C
                          </span>{" "}
                          — Mean daytime surface temperature (2024-2025)
                        </p>
                        <p>
                          <strong>🌧 Rainfall:</strong>{" "}
                          <span className="text-pink-500">
                            {metrics?.rainfall} mm
                          </span>{" "}
                          — Total annual precipitation (2024-2025)
                        </p>
                        <p>
                          <strong>💧 Water Frequency:</strong>{" "}
                          <span className="text-pink-500">
                            {metrics?.waterFreq} %
                          </span>{" "}
                          — Long-term water presence (1984–2021)
                        </p>
                        <p>
                          <strong>👥 Population Density:</strong>{" "}
                          <span className="text-pink-500">
                            {metrics?.popDensity}
                          </span>{" "}
                          — Mean Estimated people per 100 sq.m (2018-2021)
                        </p>
                      </div>
                    </ModalContent>
                  </ModalBody>
                </Modal>
              </div>
            </div>
          </div>
        </div>

        {/* 🧠 AI Response Card */}
        {aiResponse && (
          <div className="w-full max-w-3xl rounded-2xl mt-8 relative overflow-hidden shadow-xl transition-all duration-300">
            <ShineBorder
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              className="rounded-2xl"
            />

            <div className="relative z-10 w-full bg-zinc-900/80 backdrop-blur-lg rounded-2xl p-6 text-neutral-100">
              <h4 className="text-xl font-semibold mb-4 text-white tracking-wide">
                GeoGini AI Response
              </h4>

              <div
                className="prose prose-sm prose-invert max-w-none leading-relaxed text-[15px] text-zinc-100 
  [&>h1]:mb-4 [&>h2]:mb-4 [&>h3]:mb-4 [&>h4]:mb-4 
  [&>h1]:mt-6 [&>h2]:mt-5 [&>h3]:mt-4 [&>h4]:mt-3"
              >
                <ReactMarkdown>{formatAIResponse(aiResponse)}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 🪄 Instruction Step List
const Step = ({ title }) => (
  <li className="flex items-start gap-2">
    <CheckIcon />
    <span className="text-white">{title}</span>
  </li>
);

// ✅ Check Icon
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-blue-400 mt-[2px]"
  >
    <path d="M9 16.2l-3.5-3.5L4 14.2l5 5L20 8.2l-1.4-1.4z" />
  </svg>
);
