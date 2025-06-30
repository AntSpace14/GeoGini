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

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

import { useEffect, useState } from "react";

export default function MapPage() {
  // State to hold metrics and chat prompt
  const [metrics, setMetrics] = useState(null);
  const [chatPrompt, setChatPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;
      if (data?.status === "loading") {
        console.log("🕐 Region selected, metrics loading...");
        setLoading(true); // Show spinner now
        return;
      }
      console.log("🎯 Message received:", event.data);
      console.log("🌍 From origin:", event.origin);
      if (typeof event.data === "object" && event.data.lat && event.data.lon) {
        console.log("✅ Valid metrics received!");
        setMetrics(event.data);
        setLoading(false);

        const summary = `Region selected:\nLatitude: ${event.data.lat}\nLongitude: ${event.data.lon}\nNDVI: ${event.data.ndvi}\nLST: ${event.data.lst}°C\nRainfall: ${event.data.rainfall} mm\nWater Freq: ${event.data.waterFreq}%\nPopulation Density: ${event.data.popDensity}`;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 overflow-x-hidden">
      {/* 🌌 Background Beams */}
      <BackgroundBeams />

      {/* 💡 Instruction Card */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-[90%] sm:w-[40rem]">
        <CardSpotlight className="w-full">
          {/* 🧭 Welcome Message */}
          <p className="text-xl font-bold text-white mb-2">
            Welcome to GeoGini
          </p>
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
              <ModalTrigger>
                <ShimmerButton className="shadow-1xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-md">
                    Click to know Instructions
                  </span>
                </ShimmerButton>
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
                        <strong>🌧 Rainfall:</strong> Darker blue shades =
                        heavier rainfall.
                      </li>
                      <li>
                        <strong>💧 Water Frequency:</strong> Blue = permanent
                        water, Pink/White = seasonal or rare.
                      </li>
                      <li>
                        <strong>👥 Population Density:</strong> Green = low,
                        Yellow = medium, Purple = high.
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
              src="https://fiery-muse-461019-g5.projects.earthengine.app/view/gee-app"
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
                  Hold on... loading region data
                </p>
              </div>
            ) : (
              <textarea
                className="w-full h-28 p-4 rounded-lg bg-black text-white resize-none border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Ask about this region..."
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
              />
            )}

            <div className="w-full flex flex-col sm:flex-row items-center gap-4">
              <RainbowButton
                className="w-full sm:w-auto sm:min-w-[140px] text-center"
                onClick={async () => {
                  const res = await fetch(
                    "http://localhost:3001/api/ask-mistral",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ prompt: chatPrompt, metrics }),
                    }
                  );
                  const data = await res.json();
                  setAiResponse(data.answer); // Display response below
                }}
              >
                Ask AI
              </RainbowButton>

              <div className="w-full sm:w-auto sm:min-w-[180px]">
                <Modal>
                  {/* 🪄 Load Temporal Data with MagicButton */}
                  <ModalTrigger className="w-full sm:w-auto text-center">
                    <MagicButton className="w-full sm:w-auto">
                      Show Temporal Data
                    </MagicButton>
                  </ModalTrigger>

                  {/* 📊 Modal Body */}
                  <ModalBody>
                    <ModalContent>
                      <h3 className="text-lg font-bold text-white text-center mb-2">
                        📊 Temporal Region Summary
                      </h3>
                      <p className="text-sm text-neutral-400 text-center mb-6">
                        This data represents the average environmental
                        conditions for the selected region, calculated over the
                        period <strong>Jan 2022 – Jan 2023</strong>. Each metric
                        is derived from high-resolution satellite datasets and
                        aggregated using region-specific means.
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
                          — Average vegetation greenness (2022-2023)
                        </p>
                        <p>
                          <strong>🔥 Land Surface Temp (LST):</strong>{" "}
                          <span className="text-pink-500">
                            {metrics?.lst} °C
                          </span>{" "}
                          — Mean daytime surface temperature (2022-2023)
                        </p>
                        <p>
                          <strong>🌧 Rainfall:</strong>{" "}
                          <span className="text-pink-500">
                            {metrics?.rainfall} mm
                          </span>{" "}
                          — Total annual precipitation (2022-2023)
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
                          — Estimated people per sq.km (2020)
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
          <div className="w-full max-w-3xl rounded-2xl mt-6">
            <ShineBorder
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              className="rounded-2xl"
            />
            <div className="relative z-10 w-full bg-zinc-800/90 rounded-2xl p-6 shadow-lg text-neutral-100 whitespace-pre-wrap text-sm">
              <h4 className="text-lg font-semibold mb-2 text-white">
                GeoGini Response
              </h4>
              <p>{aiResponse}</p>
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
