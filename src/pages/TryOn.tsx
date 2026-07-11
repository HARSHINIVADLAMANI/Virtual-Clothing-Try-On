import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';
import { Camera, ArrowLeft, Video, VideoOff, Maximize, Minimize, ChevronDown, ChevronUp } from 'lucide-react';
import { ARViewer } from '../components/ARViewer';
import { CLOTHING_ITEMS, ClothingItem, VITE_SNAP_CAMERA_KIT_API_TOKEN} from '../data';
import { CameraKitConfig } from '../types';

export function TryOn() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [config, setConfig] = useState<CameraKitConfig>({
    apiToken: '',
    lensId: '',
    lensGroupId: ''
  });
  
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // const token = import.meta.env.VITE_SNAP_CAMERA_KIT_API_TOKEN || '';
    const token = VITE_SNAP_CAMERA_KIT_API_TOKEN || '';
    
    let initialItem = CLOTHING_ITEMS[0];
    if (id) {
      const found = CLOTHING_ITEMS.find(item => item.id === id);
      if (found) initialItem = found;
    }
    
    setSelectedItem(initialItem);
    setConfig({
      apiToken: token,
      lensId: initialItem.lensId,
      lensGroupId: initialItem.lensGroupId,
    });
    
    setIsReady(true);
    
    if (token) {
      setIsActive(true);
    }
  }, [id]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isFullscreen]);

  const toggleCamera = () => {
    if (!config.apiToken && !isActive) {
      alert("Please configure the VITE_SNAP_CAMERA_KIT_API_TOKEN environment variable.");
      return;
    }
    setIsActive(!isActive);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSelectItem = (item: ClothingItem) => {
    setSelectedItem(item);
    setConfig(prev => ({
      ...prev,
      lensId: item.lensId,
      lensGroupId: item.lensGroupId
    }));
    
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
      setTimeout(() => setIsActive(true), 100);
    }
    
    navigate(`/try-on/${item.id}`, { replace: true });
    setShowSuggestions(false);
  };

  if (!isReady || !selectedItem) return null;

  return (
    <div className="flex-1 flex flex-col bg-neutral-50 w-full h-full text-neutral-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate('/marketplace')}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Marketplace</span>
          </button>
          
          <div className="flex items-center gap-3"> 
            <button
                onClick={toggleCamera}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  isActive 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                {isActive ? (
                  <>
                    <VideoOff className="w-4 h-4" /> <span className="hidden sm:inline">Stop Camera</span>
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4" /> <span className="hidden sm:inline">Start Camera</span>
                  </>
                )}
            </button>
          </div>
        </div>

        {/* Product Details & AR Viewer Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-[500px]">
          
          {/* Details Column */}
          <div className="lg:w-1/3 flex flex-col gap-6 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm">
              <span className="inline-block bg-neutral-100 text-neutral-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                {selectedItem.category}
              </span>
              <h1 className="text-3xl font-extrabold text-neutral-900 mb-2 leading-tight">
                {selectedItem.name}
              </h1>
              <p className="text-2xl font-medium text-neutral-500 mb-6">{selectedItem.price}</p>
              
              <div className="prose prose-neutral text-neutral-600 text-sm mb-8">
                <p>Experience how this product looks on you in real-time. Make sure you are in a well-lit area and face the camera directly for the best AR experience.</p>
              </div>

              {/* Suggestions Toggle */}
              <div className="border-t border-neutral-100 pt-6">
                <button 
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="w-full flex items-center justify-between text-neutral-900 font-semibold hover:text-blue-600 transition-colors"
                >
                  <span>More like this</span>
                  {showSuggestions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {showSuggestions && (
                  <div className="mt-4 flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
                    {CLOTHING_ITEMS.filter(item => item.id !== selectedItem.id).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        className="shrink-0 w-20 rounded-xl overflow-hidden relative transition-all border-2 border-transparent hover:border-blue-500/50"
                        title={item.name}
                      >
                        <div className="aspect-[4/5] relative">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AR Viewer Column */}
          <div className="lg:w-2/3 flex flex-col order-1 lg:order-2 w-full items-center">
            <div 
              ref={containerRef}
              className={`bg-neutral-900 overflow-hidden flex items-center justify-center transition-all duration-300 ${
                isFullscreen 
                  ? 'fixed inset-0 z-[99999] w-screen h-[100dvh] m-0 p-0 rounded-none border-none shadow-none' 
                  : 'relative border border-neutral-200 w-full flex-1 min-h-[70vh] md:min-h-[500px] lg:min-h-[600px] rounded-3xl shadow-sm'
              }`}
            >
              <div className="absolute inset-0 w-full h-full">
                <ARViewer config={config} isActive={isActive} />
              </div>

              {isActive && (
                <button
                  onClick={toggleFullscreen}
                  className="absolute bottom-4 right-4 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors border border-white/10"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              )}
              
              {!isActive && (
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 text-white w-full h-full">
                  <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Camera is Off</h3>
                  <p className="text-neutral-400 mb-6 max-w-sm text-sm">Start the camera to try on this item in Augmented Reality.</p>
                  <button
                    onClick={toggleCamera}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg shadow-blue-900/20"
                  >
                    Start Camera
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
