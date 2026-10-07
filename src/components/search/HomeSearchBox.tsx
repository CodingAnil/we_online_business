'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Mic, MicOff, Navigation } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomeSearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isListening, setIsListening] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-IN';

        rec.onstart = () => {
          setIsListening(true);
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setIsListening(false);
        };

        rec.onerror = () => {
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        setRecognition(rec);
      }
    }
  }, []);

  const handleVoiceSearch = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in this browser. Please try Chrome or Safari.');
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await res.json();
            if (data.city) {
              setLocation(data.city);
            } else if (data.locality) {
              setLocation(data.locality);
            } else {
              setLocation('Delhi');
            }
          } catch {
            setLocation('Delhi');
          }
        },
        () => {
          setLocation('Delhi');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 w-full">
      {/* Location Search Input */}
      <div className="flex flex-1 items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-[#111827] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm relative group focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
        <MapPin className="h-5 w-5 text-indigo-500 shrink-0" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or locality"
          className="w-full bg-transparent border-0 outline-none text-sm placeholder:text-gray-400 focus:ring-0 focus:outline-none pr-10"
        />
        <button
          type="button"
          onClick={handleAutoDetect}
          title="Detect my location"
          className="absolute right-3 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-500 hover:text-indigo-600 transition"
        >
          <Navigation className="h-4 w-4" />
        </button>
      </div>

      {/* Query Search Input */}
      <div className="flex flex-1 lg:flex-[1.5] items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-[#111827] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm relative group focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
        <Search className="h-5 w-5 text-indigo-500 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What service or business are you looking for?"
          className="w-full bg-transparent border-0 outline-none text-sm placeholder:text-gray-400 focus:ring-0 focus:outline-none pr-12"
        />
        <button
          type="button"
          onClick={handleVoiceSearch}
          title={isListening ? 'Stop listening' : 'Search by voice'}
          className={`absolute right-3 p-1.5 rounded-lg transition ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-450 hover:text-indigo-500'
          }`}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-200 cursor-pointer text-center"
      >
        Search Now
      </button>
    </form>
  );
}
