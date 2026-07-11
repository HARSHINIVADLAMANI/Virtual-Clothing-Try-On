import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, Smartphone, Zap, Shirt, ScanFace, MousePointerClick, RefreshCcw } from 'lucide-react';
import { CLOTHING_ITEMS } from '../data';

export function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const interactiveFeatures = [
    {
      id: 0,
      title: 'Scan & Track',
      icon: <ScanFace className="w-5 h-5" />,
      description: 'Advanced facial mesh generation perfectly contours products to your unique features.'
    },
    {
      id: 1,
      title: 'Select & Snap',
      icon: <MousePointerClick className="w-5 h-5" />,
      description: 'Browse our extensive catalog and apply different styles instantly with a single tap.'
    },
    {
      id: 2,
      title: 'Real-time Adjust',
      icon: <RefreshCcw className="w-5 h-5" />,
      description: 'The AR overlay automatically adjusts as you move, tilt, or rotate your head.'
    }
  ];

  return (
    <div className="flex-1 bg-white w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden bg-neutral-50 flex items-center justify-center min-h-[70vh] md:min-h-[85vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-64 md:w-96 h-64 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
          
          {/* subtle grid background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text Column */}
          <motion.div 
            className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/60 backdrop-blur-md border border-neutral-200 text-xs md:text-sm font-semibold text-neutral-700 mb-6 shadow-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
              <span>Next-Gen AR E-Commerce</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-neutral-900 tracking-tighter leading-[1.1] mb-6">
              Try Before <br className="hidden lg:block"/> You Buy. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Anywhere.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed font-medium">
              Transform your screen into a magic mirror. Overlay digital fashion perfectly onto yourself in real-time, right from your web browser. No apps, no downloads.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
              <Link 
                to="/marketplace" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-base md:text-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Shirt className="w-5 h-5" />
                Explore Marketplace
              </Link>
              <Link 
                to="/try-on" 
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-full font-bold text-base md:text-lg transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Open AR Mirror
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Interactive Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="flex-1 w-full max-w-md lg:max-w-none relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-[2.5rem] bg-neutral-900 p-2 sm:p-4 border-8 border-white shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-[2rem] overflow-hidden">
                {/* Simulated AR View */}
                <div className="absolute inset-0 opacity-80 ">
                   <img src="assets/images/Image.png" alt="Person" className="w-full h-full object-cover  " />
                </div>
                
                {/* Scanner line effect */}
                <motion.div 
                  className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_20px_4px_rgba(59,130,246,0.5)] z-10"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Floating UI Elements */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
                  {CLOTHING_ITEMS.slice(0,3).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (i * 0.2) }}
                      className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden shadow-lg"
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-white text-xs font-medium tracking-wider">AR TRACKING ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Decorative blobs behind phone */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
          </motion.div>
          
        </div>
      </section>

      {/* Interactive Experience Section */}
      <section className="py-20 md:py-32 bg-white max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-6">Flawless Integration. <br/>Instant Satisfaction.</h2>
            <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
              We bridge the gap between imagination and reality. See exactly how accessories fit your face shape before making a purchase decision.
            </p>

            <div className="flex flex-col gap-4">
              {interactiveFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`text-left p-6 rounded-2xl transition-all border ${
                    activeTab === feature.id 
                      ? 'bg-blue-50 border-blue-200 shadow-sm' 
                      : 'bg-white border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`p-2 rounded-lg ${activeTab === feature.id ? 'bg-blue-100 text-blue-600' : 'bg-neutral-100 text-neutral-600'}`}>
                      {feature.icon}
                    </div>
                    <h3 className={`font-bold text-lg ${activeTab === feature.id ? 'text-blue-900' : 'text-neutral-900'}`}>
                      {feature.title}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {activeTab === feature.id && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-neutral-600 mt-2 pl-14"
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-neutral-100 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
                >
                  {activeTab === 0 && (
                    <div className="relative w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
                       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
                       
                       {/* Face Mesh Abstraction */}
                       <div className="relative w-32 h-48 sm:w-48 sm:h-64 border-2 border-neutral-700 rounded-[2.5rem] sm:rounded-[3rem] flex items-center justify-center overflow-hidden">
                          {/* Face features (eyes, nose, mouth) */}
                          <div className="absolute top-1/3 left-1/4 w-6 sm:w-8 h-1.5 sm:h-2 border-b-2 border-neutral-600 rounded-full" />
                          <div className="absolute top-1/3 right-1/4 w-6 sm:w-8 h-1.5 sm:h-2 border-b-2 border-neutral-600 rounded-full" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 sm:w-4 h-4 sm:h-6 border-l-2 border-b-2 border-neutral-600 rounded-bl-lg" />
                          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-1.5 sm:h-2 border-b-2 border-neutral-600 rounded-full" />

                          {/* Scanning Grid */}
                          <motion.div 
                            className="absolute inset-0 z-10 grid grid-cols-6 grid-rows-8 gap-1 sm:gap-2 p-1 sm:p-2 opacity-50"
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {Array.from({ length: 48 }).map((_, i) => (
                              <div key={i} className="w-1 h-1 bg-blue-500 rounded-full place-self-center shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            ))}
                          </motion.div>

                          {/* Scanner Line */}
                          <motion.div 
                            className="absolute left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_15px_3px_rgba(59,130,246,0.6)] z-20"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />
                       </div>

                       {/* Status text */}
                       <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-neutral-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-700">
                         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                         <span className="text-blue-400 text-[10px] sm:text-xs font-mono">TRACKING: OK</span>
                       </div>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-blue-50 rounded-2xl overflow-hidden shadow-inner">
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply" />

                      {/* Person Silhouette */}
                      <div className="absolute bottom-0 w-32 h-48 sm:w-48 sm:h-64 bg-white border border-neutral-200 rounded-t-full flex justify-center pt-6 sm:pt-8 shadow-sm">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-neutral-100" />
                        {/* Animated overlay item */}
                        <motion.div 
                           className="absolute top-16 sm:top-20 bg-blue-600 text-white p-3 sm:p-4 rounded-xl shadow-xl shadow-blue-500/20 z-10"
                           initial={{ scale: 0, opacity: 0, y: -20 }}
                           animate={{ scale: [0, 1.1, 1], opacity: [0, 1, 1], y: [0, 0, 0] }}
                           transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.2, 1] }}
                        >
                          <Shirt className="w-8 h-8 sm:w-12 sm:h-12" />
                        </motion.div>
                      </div>

                      {/* Floating Selection Menu */}
                      <motion.div 
                        className="absolute top-4 sm:top-8 w-56 sm:w-64 bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-xl border border-neutral-200 grid grid-cols-3 gap-2"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        {[1,2,3].map((i) => (
                          <div key={i} className="aspect-square bg-neutral-50 rounded-xl border border-neutral-100 relative overflow-hidden group">
                            <motion.div 
                              className="absolute inset-0 bg-blue-500/10"
                              animate={{ opacity: i === 2 ? [0, 1, 0] : 0 }}
                              transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.2, 1] }}
                            />
                            {i === 2 && <Shirt className="w-full h-full text-blue-600 p-2 sm:p-3" />}
                            
                            {/* Cursor */}
                            {i === 2 && (
                              <motion.div 
                                className="absolute bottom-0 right-0 z-20"
                                animate={{ x: [30, 0, 30], y: [30, 0, 30], scale: [1, 0.8, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.2, 1] }}
                              >
                                <MousePointerClick className="w-5 h-5 text-neutral-800 drop-shadow-md fill-white" />
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div className="relative w-full h-full bg-neutral-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
                       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-multiply" />
                       
                       {/* Synchronized moving elements */}
                       <motion.div 
                         className="relative mt-8 sm:mt-12"
                         animate={{ rotate: [-15, 15, -15], x: [-10, 10, -10] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                       >
                         {/* Head silhouette */}
                         <div className="w-32 h-48 sm:w-40 sm:h-56 bg-white border-4 border-neutral-300 rounded-[3rem] sm:rounded-[4rem] shadow-sm flex items-center justify-center overflow-hidden relative">
                           <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-neutral-200 absolute top-8 sm:top-12" />
                           <div className="w-4 h-6 sm:w-6 sm:h-8 rounded-full bg-neutral-200 absolute top-24 sm:top-32" />
                         </div>

                         {/* AR Glasses pinned to head */}
                         <motion.div 
                           className="absolute top-10 sm:top-14 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-8 sm:h-10 border-4 border-neutral-800 rounded-xl flex items-center justify-between px-1 bg-black/10 backdrop-blur-sm"
                           animate={{ 
                             boxShadow: ['0px 10px 15px -3px rgba(0,0,0,0.1)', '0px 20px 25px -5px rgba(0,0,0,0.1)', '0px 10px 15px -3px rgba(0,0,0,0.1)']
                           }}
                           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                         >
                            <div className="w-8 h-6 sm:w-10 sm:h-8 bg-blue-500/40 rounded-md sm:rounded-lg border-2 border-neutral-800" />
                            <div className="w-2 h-1 sm:h-1.5 bg-neutral-800" />
                            <div className="w-8 h-6 sm:w-10 sm:h-8 bg-blue-500/40 rounded-md sm:rounded-lg border-2 border-neutral-800" />
                         </motion.div>

                         {/* Alignment guides */}
                         <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 border border-blue-400/30 rounded-full border-dashed pointer-events-none" />
                         <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 border border-blue-400/20 rounded-full border-dashed pointer-events-none" />
                       </motion.div>

                       {/* Status UI */}
                       <div className="absolute top-4 right-4 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-sm">
                         <RefreshCcw className="w-3 h-3 text-blue-500 animate-spin" style={{ animationDuration: '3s' }} />
                         <span className="text-neutral-600 text-[10px] sm:text-xs font-bold tracking-wider">SYNCING</span>
                       </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Overlay stats card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-neutral-100 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Latency</p>
                  <p className="text-2xl font-bold text-neutral-900">&lt; 50ms</p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900 text-white text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to see for yourself?</h2>
          <p className="text-xl text-neutral-400 mb-10">Step into the virtual fitting room right now. No setup required.</p>
          <button 
            onClick={() => navigate('/try-on')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-[0_0_30px_rgba(37,99,235,0.4)]"
          >
            Launch Experience
          </button>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 bg-neutral-950 border-t border-neutral-800 text-center">
        <p className="text-neutral-500 text-sm">
          A creative and Interactive Product by Harshini Vadlamani
        </p>
      </footer>
    </div>
  );
}
