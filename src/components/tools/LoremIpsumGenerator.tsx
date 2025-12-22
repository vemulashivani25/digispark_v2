import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Copy, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const LoremIpsumGenerator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [paragraphs, setParagraphs] = useState(3);
  const [textType, setTextType] = useState<"lorem" | "hipster" | "business">("lorem");
  const [generatedText, setGeneratedText] = useState("");

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  const hipsterWords = [
    "artisan", "sustainable", "craft", "organic", "locally-sourced", "vintage",
    "aesthetic", "authentic", "handcrafted", "small-batch", "curated", "bespoke",
    "minimalist", "ethical", "eco-friendly", "farm-to-table", "cold-pressed",
    "vegan", "gluten-free", "plant-based", "raw", "urban", "industrial", "rustic",
    "bohemian", "mindful", "holistic", "wellness", "zen", "conscious", "intentional",
    "sustainable", "recycled", "upcycled", "fair-trade", "biodegradable"
  ];

  const businessWords = [
    "synergy", "leverage", "optimize", "streamline", "innovative", "scalable",
    "robust", "dynamic", "strategic", "proactive", "holistic", "paradigm",
    "benchmark", "stakeholder", "deliverable", "actionable", "best-practice",
    "core-competency", "value-added", "mission-critical", "bottom-line",
    "roi", "kpi", "agile", "disruptive", "ecosystem", "bandwidth", "pivot",
    "growth-hack", "monetize", "incentivize", "empower", "revolutionize"
  ];

  const generateSentence = (wordList: string[]): string => {
    const length = Math.floor(Math.random() * 10) + 8;
    const sentence = [];
    for (let i = 0; i < length; i++) {
      const word = wordList[Math.floor(Math.random() * wordList.length)];
      sentence.push(i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    }
    return sentence.join(" ") + ".";
  };

  const generateParagraph = (wordList: string[]): string => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4;
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence(wordList));
    }
    return sentences.join(" ");
  };

  const generateText = () => {
    const wordList = textType === "lorem" ? loremWords : textType === "hipster" ? hipsterWords : businessWords;
    const text = [];
    for (let i = 0; i < paragraphs; i++) {
      text.push(generateParagraph(wordList));
    }
    setGeneratedText(text.join("\n\n"));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate on first render
  React.useEffect(() => {
    generateText();
  }, [paragraphs, textType]);

  const textTypes = [
    { id: "lorem", label: "Classic Lorem" },
    { id: "hipster", label: "Hipster Ipsum" },
    { id: "business", label: "Corporate Speak" },
  ];

  return (
    <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-yellow-400" />
          Lorem Ipsum Generator
        </h3>
        <p className="text-gray-300 mb-6">
          Generate placeholder text for your designs and mockups.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            {/* Text Type */}
            <div>
              <label className="block text-white mb-2">Text Style</label>
              <div className="flex flex-wrap gap-2">
                {textTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTextType(type.id as typeof textType)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      textType === type.id
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Paragraph Count */}
            <div>
              <label className="block text-white mb-2">Paragraphs: {paragraphs}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={generateText}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <h4 className="text-purple-400 font-semibold mb-2">Word Count</h4>
              <p className="text-gray-300 text-2xl font-mono">
                {generatedText.split(/\s+/).filter(w => w).length} words
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {generatedText.length} characters
              </p>
            </div>
          </div>

          {/* Generated Text */}
          <div>
            <div className="bg-gray-900 rounded-lg p-4 h-[300px] overflow-y-auto border border-gray-700">
              {generatedText.split("\n\n").map((para, index) => (
                <p key={index} className="text-gray-300 text-sm mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoremIpsumGenerator;
