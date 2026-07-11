import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Filter, LayoutGrid, GalleryHorizontalEnd, ChevronLeft, ChevronRight } from 'lucide-react';
import { CLOTHING_ITEMS, CATEGORIES, ClothingItem } from '../data';

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'swipe'>('grid');
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, viewMode]);

  const filteredItems = selectedCategory === 'All' 
    ? CLOTHING_ITEMS 
    : CLOTHING_ITEMS.filter(item => item.category === selectedCategory);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -80) {
      // Swipe left -> Next item
      setCurrentIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
    } else if (swipe > 80) {
      // Swipe right -> Prev item
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  // Ensure view mode switches to grid on desktop sizes, so it matches the md:hidden on the toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && viewMode === 'swipe') {
        setViewMode('grid');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  return (
    <div className="flex-1 bg-neutral-50 w-full p-4 sm:p-6 flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 flex-1 w-full h-full">
        
        <div className="flex items-center justify-between shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">Marketplace</h2>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* View Mode Toggle (Mobile/Tablet) */}
            <div className="flex items-center bg-white rounded-full border border-neutral-200 p-1 shadow-sm md:hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('swipe')}
                className={`p-1.5 rounded-full transition-colors ${viewMode === 'swipe' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400'}`}
              >
                <GalleryHorizontalEnd className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neutral-200 shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Filters</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product List */}
        {viewMode === 'grid' || window.innerWidth >= 768 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 mt-2 sm:mt-4 pb-12">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all overflow-hidden flex flex-col group"
              >
                <div className="aspect-[4/5] relative bg-neutral-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                    <span className="bg-white/90 backdrop-blur text-[9px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-neutral-700 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold text-neutral-900 mb-0.5 sm:mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-xs sm:text-base text-neutral-500 font-medium">{item.price}</p>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/try-on/${item.id}`)}
                    className="mt-3 sm:mt-5 w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Try On AR</span><span className="sm:hidden">Try On</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center mt-2 relative min-h-[500px]">
            <div className="relative w-full max-w-sm aspect-[3/4.5] max-h-[70vh]">
              <AnimatePresence>
                {filteredItems.map((item, index) => {
                  const offset = index - currentIndex;
                  if (offset < -1 || offset > 2) return null;

                  const isFront = offset === 0;

                  return (
                    <motion.div
                      key={item.id}
                      className="absolute inset-0 bg-white rounded-[2rem] border border-neutral-200 shadow-xl overflow-hidden flex flex-col origin-bottom cursor-grab active:cursor-grabbing"
                      style={{
                        zIndex: 10 - Math.abs(offset)
                      }}
                      initial={false}
                      animate={{
                        scale: isFront ? 1 : offset > 0 ? 1 - offset * 0.05 : 1,
                        y: isFront ? 0 : offset > 0 ? offset * 15 : 0,
                        x: offset < 0 ? -400 : 0,
                        opacity: offset < 0 ? 0 : 1 - offset * 0.15,
                        rotate: offset < 0 ? -15 : 0,
                        pointerEvents: isFront ? 'auto' : 'none'
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      drag={isFront ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.8}
                      onDragEnd={isFront ? handleDragEnd : undefined}
                    >
                      <div className="flex-1 relative bg-neutral-100 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                        />
                        <div className="absolute top-5 left-5">
                          <span className="bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded-full text-neutral-700 shadow-sm pointer-events-none">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col justify-between bg-white border-t border-neutral-100 shrink-0">
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 mb-1">{item.name}</h3>
                          <p className="text-lg text-neutral-500 font-medium">{item.price}</p>
                        </div>
                        
                        <button
                          onClick={() => navigate(`/try-on/${item.id}`)}
                          className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3.5 rounded-xl text-base font-bold transition-colors shadow-md"
                        >
                          <Camera className="w-5 h-5" />
                          <span className="hidden sm:inline">Try On AR</span><span className="sm:hidden">Try On</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            {filteredItems.length > 0 && (
              <div className="absolute -bottom-4 md:bottom-4 left-0 right-0 flex items-center justify-center gap-6">
                <button 
                  onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 disabled:opacity-50 disabled:bg-neutral-50 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="text-sm font-medium text-neutral-400">
                  {currentIndex + 1} of {filteredItems.length}
                </div>
                <button 
                  onClick={() => setCurrentIndex(prev => Math.min(prev + 1, filteredItems.length - 1))}
                  disabled={currentIndex === filteredItems.length - 1}
                  className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 disabled:opacity-50 disabled:bg-neutral-50 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
            
            {filteredItems.length === 0 && (
              <div className="text-neutral-500 text-center">
                <p className="font-medium text-lg mb-2">No items found</p>
                <p className="text-sm">Try changing the category filter.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
