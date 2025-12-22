import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Copy, CheckCircle2, RefreshCw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const GradientGenerator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);
  
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const [angle, setAngle] = useState(135);
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");

  const presetGradients = [
    { name: "Sunset", colors: ["#f093fb", "#f5576c"] },
    { name: "Ocean", colors: ["#667eea", "#764ba2"] },
    { name: "Forest", colors: ["#11998e", "#38ef7d"] },
    { name: "Fire", colors: ["#f12711", "#f5af19"] },
    { name: "Night", colors: ["#0f0c29", "#302b63"] },
    { name: "Cotton Candy", colors: ["#ee9ca7", "#ffdde1"] },
    { name: "Mojito", colors: ["#1d976c", "#93f9b9"] },
    { name: "Cosmic", colors: ["#ff00cc", "#333399"] },
  ];

  const generateRandomGradient = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor1(randomColor());
    setColor2(randomColor());
    setAngle(Math.floor(Math.random() * 360));
  };

  const getGradientCSS = () => {
    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    }
    return `radial-gradient(circle, ${color1}, ${color2})`;
  };

  const getTailwindClass = () => {
    const c1 = color1.replace("#", "");
    const c2 = color2.replace("#", "");
    return `bg-gradient-to-r from-[#${c1}] to-[#${c2}]`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-yellow-400" />
          Gradient Generator
        </h3>
        <p className="text-gray-300 mb-6">
          Create beautiful CSS gradients for your projects.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-4">
            {/* Gradient Type */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGradientType("linear")}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  gradientType === "linear"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                Linear
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGradientType("radial")}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  gradientType === "radial"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                Radial
              </motion.button>
            </div>

            {/* Color Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Color 1</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-12 h-10 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="bg-gray-800 text-white flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white mb-2">Color 2</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-12 h-10 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="bg-gray-800 text-white flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Angle (only for linear) */}
            {gradientType === "linear" && (
              <div>
                <label className="block text-white mb-2">Angle: {angle}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-yellow-400"
                />
              </div>
            )}

            {/* Preset Gradients */}
            <div>
              <label className="block text-white mb-2">Presets</label>
              <div className="grid grid-cols-4 gap-2">
                {presetGradients.map((preset) => (
                  <motion.button
                    key={preset.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setColor1(preset.colors[0]);
                      setColor2(preset.colors[1]);
                    }}
                    className="h-10 rounded-lg border border-gray-700 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})`,
                    }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={generateRandomGradient}
              className="w-full bg-purple-500 hover:bg-purple-400 text-white"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Random Gradient
            </Button>
          </div>

          {/* Preview */}
          <div>
            {/* Gradient Preview */}
            <motion.div
              className="h-48 rounded-xl mb-4 border border-gray-700"
              style={{ background: getGradientCSS() }}
              animate={{ background: getGradientCSS() }}
              transition={{ duration: 0.3 }}
            />

            {/* CSS Output */}
            <div className="space-y-3">
              <div className="relative">
                <label className="block text-white mb-1 text-sm">CSS</label>
                <div className="bg-gray-900 rounded-lg p-3 pr-12 font-mono text-xs text-green-400 border border-gray-700">
                  background: {getGradientCSS()};
                </div>
                <Button
                  onClick={() => copyToClipboard(`background: ${getGradientCSS()};`, "CSS")}
                  size="sm"
                  className="absolute right-2 top-7 bg-gray-700 hover:bg-gray-600"
                >
                  {copied === "CSS" ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>

              <div className="relative">
                <label className="block text-white mb-1 text-sm">Tailwind</label>
                <div className="bg-gray-900 rounded-lg p-3 pr-12 font-mono text-xs text-blue-400 border border-gray-700">
                  {getTailwindClass()}
                </div>
                <Button
                  onClick={() => copyToClipboard(getTailwindClass(), "Tailwind")}
                  size="sm"
                  className="absolute right-2 top-7 bg-gray-700 hover:bg-gray-600"
                >
                  {copied === "Tailwind" ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradientGenerator;
