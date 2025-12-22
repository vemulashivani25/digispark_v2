
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Slider } from './ui/slider';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element but don't autoplay
    audioRef.current = new Audio('/ambient-technology.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <div className="music-player glass-card rounded-full p-2 shadow-lg">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-900 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 rounded-full"
          onClick={() => setShowControls(!showControls)}
        >
          <Music className="h-5 w-5" />
        </Button>
        
        {showControls && (
          <div className="absolute bottom-12 right-0 bg-gray-900 rounded-lg p-4 border border-gray-700 shadow-lg min-w-[200px]">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">Music</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-yellow-400 hover:bg-gray-800"
                  onClick={togglePlay}
                >
                  {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Volume</span>
                  <span>{volume}%</span>
                </div>
                <Slider
                  defaultValue={[volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>
              
              <div className="text-center text-xs text-gray-400">
                {isPlaying ? 'Playing ambient music' : 'Music paused'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
