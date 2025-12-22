import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, BarChart3, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const KeywordDensityChecker = () => {
  const [content, setContent] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [analysis, setAnalysis] = useState<{
    wordCount: number;
    charCount: number;
    keywordCount: number;
    density: number;
    topWords: { word: string; count: number }[];
  } | null>(null);

  const stopWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
    "being", "have", "has", "had", "do", "does", "did", "will", "would",
    "could", "should", "may", "might", "must", "shall", "can", "need",
    "this", "that", "these", "those", "i", "you", "he", "she", "it", "we",
    "they", "what", "which", "who", "when", "where", "why", "how", "all",
    "each", "every", "both", "few", "more", "most", "other", "some", "such",
    "no", "not", "only", "own", "same", "so", "than", "too", "very", "just",
    "as", "if", "then", "because", "while", "although", "though", "after",
    "before", "during", "about", "into", "through", "during", "before"
  ]);

  const analyzeContent = () => {
    if (!content.trim()) return;

    const words = content.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const wordCount = words.length;
    const charCount = content.length;

    // Count target keyword
    const keywordLower = targetKeyword.toLowerCase().trim();
    const keywordCount = keywordLower
      ? words.filter((w) => w === keywordLower).length
      : 0;
    const density = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;

    // Get top words (excluding stop words)
    const wordFreq: Record<string, number> = {};
    words.forEach((word) => {
      if (!stopWords.has(word) && word.length > 2) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    const topWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    setAnalysis({
      wordCount,
      charCount,
      keywordCount,
      density,
      topWords,
    });
  };

  const getDensityStatus = (density: number) => {
    if (density < 0.5) return { color: "text-yellow-400", message: "Low - Consider using the keyword more" };
    if (density > 3) return { color: "text-red-400", message: "High - Risk of keyword stuffing" };
    return { color: "text-green-400", message: "Optimal - Good keyword density" };
  };

  return (
    <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-yellow-400" />
          Keyword Density Checker
        </h3>
        <p className="text-gray-300 mb-6">
          Analyze your content for SEO optimization and keyword usage.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Target Keyword (optional)</label>
              <Input
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                placeholder="Enter your focus keyword"
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Content to Analyze</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your content here to analyze keyword density and get SEO insights..."
                className="bg-gray-800 text-white border-gray-700 min-h-[250px]"
              />
            </div>

            <Button
              onClick={analyzeContent}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black"
            >
              <Search className="w-4 h-4 mr-2" />
              Analyze Content
            </Button>
          </div>

          {/* Results */}
          <div>
            {analysis ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-gray-400 text-sm">Word Count</p>
                    <p className="text-2xl font-bold text-white font-mono">
                      {analysis.wordCount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-gray-400 text-sm">Characters</p>
                    <p className="text-2xl font-bold text-white font-mono">
                      {analysis.charCount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Keyword Density */}
                {targetKeyword && (
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-400 text-sm">"{targetKeyword}" Density</p>
                      <span className={`text-sm font-semibold ${getDensityStatus(analysis.density).color}`}>
                        {analysis.density.toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          analysis.density > 3
                            ? "bg-red-500"
                            : analysis.density < 0.5
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(analysis.density * 20, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {analysis.density >= 0.5 && analysis.density <= 3 ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className={getDensityStatus(analysis.density).color}>
                        {getDensityStatus(analysis.density).message}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      Found {analysis.keywordCount} times in {analysis.wordCount} words
                    </p>
                  </div>
                )}

                {/* Top Keywords */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-white font-semibold mb-3">Top Keywords</p>
                  <div className="space-y-2">
                    {analysis.topWords.map((item, index) => (
                      <div key={item.word} className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm w-6">{index + 1}.</span>
                        <span className="flex-1 text-gray-300">{item.word}</span>
                        <span className="text-yellow-400 font-mono text-sm">{item.count}x</span>
                        <div className="w-20 bg-gray-700 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-yellow-400"
                            style={{
                              width: `${(item.count / analysis.topWords[0].count) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEO Tips */}
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-blue-400 font-semibold mb-2">SEO Tips</h4>
                  <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                    <li>Aim for 1-3% keyword density</li>
                    <li>Use keywords naturally in headings</li>
                    <li>Include variations and synonyms</li>
                    <li>Aim for 300+ words for blog posts</li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter content and click analyze to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordDensityChecker;
