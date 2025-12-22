import { useEffect, useRef, useState } from "react";
import { createToolFallback } from "@/utils/avatarFallback";

interface Tool {
  name: string;
  logo: string;
  category: string;
}

const tools: Tool[] = [
  // Web Dev
  { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg", category: "webdev" },
  { name: "TypeScript", logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg", category: "webdev" },
  { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg", category: "webdev" },
  { name: "Tailwind CSS", logo: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg", category: "webdev" },
  { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg", category: "webdev" },
  { name: "MongoDB", logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg", category: "webdev" },
  
  // SEO
  { name: "SEMrush", logo: "https://cdn.worldvectorlogo.com/logos/semrush.svg", category: "seo" },
  { name: "Ahrefs", logo: "https://cdn.worldvectorlogo.com/logos/ahrefs.svg", category: "seo" },
  { name: "Moz", logo: "https://cdn.worldvectorlogo.com/logos/moz-2.svg", category: "seo" },
  { name: "Google Analytics", logo: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg", category: "seo" },
  { name: "Google Search Console", logo: "https://cdn.worldvectorlogo.com/logos/google-search-console.svg", category: "seo" },
  
  // SMM
  { name: "Buffer", logo: "https://cdn.worldvectorlogo.com/logos/buffer-1.svg", category: "smm" },
  { name: "Hootsuite", logo: "https://cdn.worldvectorlogo.com/logos/hootsuite-1.svg", category: "smm" },
  { name: "Sprout Social", logo: "https://cdn.worldvectorlogo.com/logos/sprout-social.svg", category: "smm" },
  { name: "Canva", logo: "https://cdn.worldvectorlogo.com/logos/canva-1.svg", category: "smm" },
  
  // Virtual Assistance
  { name: "Trello", logo: "https://cdn.worldvectorlogo.com/logos/trello.svg", category: "virtual" },
  { name: "Airtable", logo: "https://cdn.worldvectorlogo.com/logos/airtable-1.svg", category: "virtual" },
  { name: "Asana", logo: "https://cdn.worldvectorlogo.com/logos/asana-logo.svg", category: "virtual" },
  { name: "Notion", logo: "https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg", category: "virtual" },
  { name: "Slack", logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg", category: "virtual" },
  
  // Video Production
  { name: "Adobe Premiere", logo: "https://cdn.worldvectorlogo.com/logos/premiere-cc.svg", category: "video" },
  { name: "After Effects", logo: "https://cdn.worldvectorlogo.com/logos/after-effects-cc.svg", category: "video" },
  { name: "DaVinci Resolve", logo: "https://cdn.worldvectorlogo.com/logos/davinci-resolve.svg", category: "video" },
  { name: "Final Cut Pro", logo: "https://cdn.worldvectorlogo.com/logos/final-cut-pro-x.svg", category: "video" }
];

const categoryColors: Record<string, string> = {
  webdev: "from-blue-400 to-indigo-600",
  seo: "from-green-400 to-emerald-600",
  smm: "from-purple-400 to-fuchsia-600",
  virtual: "from-yellow-400 to-amber-600",
  video: "from-red-400 to-rose-600"
};

const categoryNames: Record<string, string> = {
  webdev: "Web Development",
  seo: "SEO",
  smm: "Social Media",
  virtual: "Virtual Assistance",
  video: "Video Production"
};

const ToolsCarousel = () => {
  const allTools = [...tools];
  const half = Math.ceil(allTools.length / 2);
  const rows = [allTools.slice(0, half), allTools.slice(half)];

  const [isHovering, setIsHovering] = useState(false);
  const carouselRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    const animations: number[] = [];
    rows.forEach((_, i) => {
      const scrollAmt = i % 2 === 0 ? 0.7 : -0.6;
      const ref = carouselRefs[i];
      function animate() {
        if (ref.current && !isHovering) {
          ref.current.scrollLeft += scrollAmt;
          if (scrollAmt > 0 && ref.current.scrollLeft >= ref.current.scrollWidth / 2) {
            ref.current.scrollLeft = 0;
          } else if (scrollAmt < 0 && ref.current.scrollLeft <= 0) {
            ref.current.scrollLeft = ref.current.scrollWidth / 2;
          }
        }
        animations[i] = requestAnimationFrame(animate);
      }
      animations[i] = requestAnimationFrame(animate);
    });
    return () => animations.forEach(anim => cancelAnimationFrame(anim));
  }, [isHovering]);

  const doubleRow = rows.map(row => [...row, ...row]);

  return (
    <div className="w-full space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4">
        {doubleRow.map((row, i) => (
          <div
            key={i}
            className="w-full overflow-x-hidden relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
            <div
              ref={carouselRefs[i]}
              className="flex overflow-x-auto gap-8 py-6 scrollbar-none"
              style={{
                scrollBehavior: "smooth",
                minHeight: "124px"
              }}
            >
              {row.map((tool, j) => (
                <div 
                  key={`${tool.name}-${j}`}
                  className={`
                    flex-shrink-0 w-36 h-24 md:h-28 rounded-xl p-2
                    bg-gradient-to-br ${categoryColors[tool.category] || "from-gray-600 to-gray-800"}
                    border border-white/10 hover:scale-110 hover:border-white/30 transition-all duration-300
                    flex flex-col items-center justify-center gap-2 group
                  `}
                  style={{ minWidth: "8rem" }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white/90 rounded-full p-1 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2">
                    <img 
                      src={tool.logo} 
                      alt={tool.name} 
                      className="max-h-8 max-w-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = createToolFallback(tool.name);
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-white drop-shadow-sm">{tool.name}</span>
                  </div>
                  <span className="text-[10px] font-medium text-white/70 bg-black/30 px-2 py-0.5 rounded-full mt-1">
                    {categoryNames[tool.category]}
                  </span>
                </div>
              ))}
            </div>
            <style>{`
              .scrollbar-none {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-none::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsCarousel;
