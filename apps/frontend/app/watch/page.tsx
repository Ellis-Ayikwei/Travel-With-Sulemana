"use client";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play, Share2, X, Eye, ArrowRight, Film } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function WatchPage() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const videos = [
    {
      id: 1,
      title: "The Ghana National Mosque",
      description: "The second largest mosque in West Africa, funded by the Turkish Hudai Foundation. The complex includes a residence for the imam, a school, and a library.",
      category: "Adventure",
      date: "2023",
      views: "1.2M",
      duration: "1:15",
      thumbnail: "https://img.youtube.com/vi/QAMxBhN-czM/maxresdefault.jpg",
      videoId: "QAMxBhN-czM",
      videoUrl: "https://www.youtube.com/watch?v=QAMxBhN-czM",
    },
    {
      id: 2,
      title: "Journey to Larabanga Mosque",
      description: "The oldest mosque in Ghana (1421). Built with whitewashed adobe, it holds spiritual mysteries and the history of the Gonja kingdom.",
      category: "Culture",
      date: "2022",
      views: "210K",
      duration: "1:00",
      thumbnail: "https://img.youtube.com/vi/1IXxgz-q-Z4/maxresdefault.jpg",
      videoId: "1IXxgz-q-Z4",
      videoUrl: "https://www.youtube.com/watch?v=1IXxgz-q-Z4",
    },
    {
      id: 3,
      title: "The Famous Adomi Bridge",
      description: "A latticed steel arch suspension bridge crossing the Volta River at Atimpoku, serving as a vital gateway in West Africa.",
      category: "History",
      date: "2023",
      views: "98K",
      duration: "1:00",
      thumbnail: "https://img.youtube.com/vi/Ke9hSqa3D98/maxresdefault.jpg",
      videoId: "Ke9hSqa3D98",
      videoUrl: "https://www.youtube.com/watch?v=Ke9hSqa3D98",
    },
    {
      id: 4,
      title: "Zorngoo Dance by Gonja's",
      description: "A unique traditional dance from the Savannah region, originally inspired by the movements of monkeys in the bush.",
      category: "City",
      date: "2022",
      views: "75K",
      duration: "4:37",
      thumbnail: "https://img.youtube.com/vi/uTtJ_LwucFU/maxresdefault.jpg",
      videoId: "uTtJ_LwucFU",
      videoUrl: "https://www.youtube.com/watch?v=uTtJ_LwucFU",
    },
    {
      id: 5,
      title: "Secrets of Tengzug Shrines",
      description: "Explore the Tongo Hills, home to ancient shrines that served as spiritual refuges during the resistance to British rule.",
      category: "History",
      date: "2023",
      views: "60K",
      duration: "5:55",
      thumbnail: "https://img.youtube.com/vi/Ggb1NU9sJJ0/maxresdefault.jpg",
      videoId: "Ggb1NU9sJJ0",
      videoUrl: "https://www.youtube.com/watch?v=Ggb1NU9sJJ0",
    },
    {
      id: 6,
      title: "Mole National Park Safari",
      description: "Go on a safari in Ghana's largest wildlife refuge to see elephants, antelopes, and rare bird species in their natural habitat.",
      category: "Adventure",
      date: "2022",
      views: "45K",
      duration: "10:31",
      thumbnail: "https://img.youtube.com/vi/cGQF0UweTCA/maxresdefault.jpg",
      videoId: "cGQF0UweTCA",
      videoUrl: "https://www.youtube.com/watch?v=cGQF0UweTCA",
    },
    {
      id: 7,
      title: "Nbonwuraana of Gonja Land",
      description: "The story of the legendary warriors who fought alongside Ndewura Jakpa to establish the Savannah region.",
      category: "Leisure",
      date: "2023",
      views: "38K",
      duration: "10:25",
      thumbnail: "https://img.youtube.com/vi/6ngXtIlLS2o/maxresdefault.jpg",
      videoId: "6ngXtIlLS2o",
      videoUrl: "https://www.youtube.com/watch?v=6ngXtIlLS2o",
    },
    {
      id: 8,
      title: "Daboya: Ghana’s Smock Factor",
      description: "A visit to one of the most unique craft villages in West Africa, famous for its hand-woven traditional textiles.",
      category: "Culture",
      date: "2023",
      views: "29K",
      duration: "10:18",
      thumbnail: "https://img.youtube.com/vi/eJ39z_wpwvs/maxresdefault.jpg",
      videoId: "eJ39z_wpwvs",
      videoUrl: "https://youtu.be/eJ39z_wpwvs",
    }
  ];

  const categories = ["All", "Adventure", "Culture", "History", "City", "Leisure"];
  const filteredVideos = selectedCategory === "All" ? videos : videos.filter((v) => v.category === selectedCategory);

  const handleShare = async (e: React.MouseEvent, video: typeof videos[0]) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({ title: video.title, url: video.videoUrl });
      } catch (err) { /* silent fail */ }
    } else {
      await navigator.clipboard.writeText(video.videoUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation />

      {/* --- HERO: Dynamic Theme Background --- */}
      <section className="relative h-[65vh] flex items-center overflow-hidden border-b border-gray-100 dark:border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 dark:from-black dark:via-black/70 to-transparent z-10" />
          <img 
            src={videos[0].thumbnail} 
            className="w-full h-full object-cover scale-105 blur-[1px] opacity-30 dark:opacity-40" 
            alt="Hero"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
               <Film className="w-4 h-4 text-amber-600 dark:text-amber-500" />
               <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-500">
                Premium Documentaries
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight dark:text-white text-gray-900">
              GHANA <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 dark:from-white dark:to-gray-500">
                UNVEILED.
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
                Discover the pulse of West Africa. From sacred heritage sites to the modern rhythm of the city, experience Ghana through our lens.
            </p>
            <button 
              onClick={() => setSelectedVideo(videos[0].id)}
              className="flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-all shadow-xl dark:shadow-amber-500/10"
            >
              <Play className="fill-current w-5 h-5" /> Start Exploring
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- STICKY NAV: Glassmorphism Theme --- */}
      <section className="sticky top-0 z-40 bg-white/80 dark:bg-black/60 backdrop-blur-md border-y border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-8 overflow-x-auto no-scrollbar items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap relative pb-2 ${
                  selectedCategory === cat 
                  ? "text-amber-600 dark:text-amber-500" 
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- GRID: Themed Cards --- */}
      <section className="py-20 px-6 container mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                {/* Thumbnail Wrapper */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-white/5">
                  <img
                    src={video.thumbnail}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={video.title}
                  />
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-colors" />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <div className="w-14 h-14 bg-white/90 dark:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-5 h-5 fill-black dark:fill-white text-black dark:text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 dark:bg-amber-500 text-white dark:text-black text-[10px] font-black rounded uppercase tracking-tighter">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tracking-widest uppercase text-amber-600 dark:text-amber-500">
                      {video.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{video.date}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed font-medium">
                    {video.description}
                  </p>
                  
                  <div className="pt-4 flex items-center justify-between">
                     <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                        <Eye className="w-3.5 h-3.5" /> {video.views}
                     </div>
                     <button 
                        onClick={(e) => handleShare(e, video)}
                        className="p-2 text-gray-400 hover:text-amber-600 dark:hover:text-white transition-colors"
                     >
                        <Share2 className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- MODAL: Theater Mode --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              >
                Close <X className="w-5 h-5" />
              </button>
              <YouTube
                videoId={videos.find(v => v.id === selectedVideo)?.videoId}
                opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1 } }}
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CTA: Theme Aware --- */}
      <section className="py-24 bg-gray-50 dark:bg-transparent relative overflow-hidden">
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-gray-900 dark:text-white">
                THE ADVENTURE <br/> STARTS HERE.
            </h2>
            <Link
              href="/book"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gray-900 dark:bg-amber-500 text-white dark:text-black hover:bg-amber-600 dark:hover:bg-white transition-all rounded-full font-black uppercase tracking-widest text-sm shadow-xl"
            >
              Book Your Experience <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
         </div>
      </section>

      <Footer />
    </div>
  );
}