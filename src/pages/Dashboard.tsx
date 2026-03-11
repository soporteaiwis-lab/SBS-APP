import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Play, Square, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Dashboard() {
  const { 
    isWalking, 
    isResting, 
    walkingTime, 
    steps, 
    distance, 
    startWalking, 
    stopWalkingForPain, 
    resumeWalking,
    finishSession,
    tick,
    profile
  } = useStore();

  const [showPainModal, setShowPainModal] = useState(false);
  const [currentPain, setCurrentPain] = useState<number>(0);

  // Timer effect
  useEffect(() => {
    let interval: number;
    if (isWalking || isResting) {
      interval = window.setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWalking, isResting, tick]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStopClick = () => {
    setShowPainModal(true);
  };

  const confirmStop = () => {
    stopWalkingForPain(currentPain);
    setShowPainModal(false);
  };

  const progressSteps = Math.min((steps / profile.targetSteps) * 100, 100);
  const progressDistance = Math.min((distance / profile.targetDistance) * 100, 100);

  return (
    <div className="flex flex-col min-h-full max-w-md mx-auto px-6 space-y-8">
      <header className="pt-2 pb-2">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Mi Caminata</h1>
        <p className="text-lg text-neutral-500 mt-2">Objetivo diario: 60 minutos</p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex flex-col items-center justify-center">
          <span className="text-5xl font-light text-neutral-900">{Math.floor(steps)}</span>
          <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest mt-2">Pasos</span>
          <div className="w-full h-1.5 bg-neutral-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progressSteps}%` }} />
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex flex-col items-center justify-center">
          <span className="text-5xl font-light text-neutral-900">{Math.floor(distance)}</span>
          <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest mt-2">Metros</span>
          <div className="w-full h-1.5 bg-neutral-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progressDistance}%` }} />
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-7xl font-mono font-light tracking-tighter text-neutral-900">
          {formatTime(walkingTime)}
        </div>
        <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest mt-2">
          Tiempo Efectivo
        </span>
      </div>

      {/* Main Action Button */}
      <div className="flex-1 flex items-center justify-center pb-8">
        {!isWalking && !isResting && (
          <button 
            onClick={startWalking}
            className="w-48 h-48 rounded-full bg-emerald-600 text-white shadow-[0_20px_40px_-15px_rgba(5,150,105,0.5)] flex flex-col items-center justify-center active:scale-95 transition-transform"
          >
            <Play className="w-16 h-16 mb-2 ml-2" fill="currentColor" />
            <span className="text-2xl font-bold tracking-wide">INICIAR</span>
          </button>
        )}

        {isWalking && (
          <button 
            onClick={handleStopClick}
            className="w-48 h-48 rounded-full bg-rose-600 text-white shadow-[0_20px_40px_-15px_rgba(225,29,72,0.5)] flex flex-col items-center justify-center active:scale-95 transition-transform"
          >
            <Square className="w-12 h-12 mb-3" fill="currentColor" />
            <span className="text-2xl font-bold tracking-wide">DETENER</span>
            <span className="text-sm opacity-80 mt-1">(Tengo dolor)</span>
          </button>
        )}

        {isResting && (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-6 py-3 rounded-full">
              <AlertTriangle className="w-6 h-6" />
              <span className="font-medium text-lg">Descansando por dolor</span>
            </div>
            <button 
              onClick={resumeWalking}
              className="w-48 h-48 rounded-full bg-emerald-600 text-white shadow-[0_20px_40px_-15px_rgba(5,150,105,0.5)] flex flex-col items-center justify-center active:scale-95 transition-transform"
            >
              <RefreshCw className="w-12 h-12 mb-3" />
              <span className="text-2xl font-bold tracking-wide">REANUDAR</span>
              <span className="text-sm opacity-80 mt-1">(El dolor pasó)</span>
            </button>
            <button 
              onClick={finishSession}
              className="mt-4 px-8 py-4 rounded-2xl font-bold text-neutral-600 bg-neutral-100 active:bg-neutral-200 transition-colors w-full"
            >
              FINALIZAR SESIÓN
            </button>
          </div>
        )}
      </div>

      {/* Pain Modal */}
      <AnimatePresence>
        {showPainModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Nivel de Dolor</h3>
              <p className="text-neutral-500 mb-8">¿Qué tan fuerte es el dolor en sus piernas? (0 = Sin dolor, 10 = Máximo dolor)</p>
              
              <div className="flex flex-col space-y-6">
                <div className="text-center text-6xl font-light text-rose-600">
                  {currentPain}
                </div>
                
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={currentPain}
                  onChange={(e) => setCurrentPain(parseInt(e.target.value))}
                  className="w-full h-4 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                
                <div className="flex justify-between text-sm font-medium text-neutral-400 px-1">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button 
                    onClick={() => setShowPainModal(false)}
                    className="py-4 rounded-2xl font-bold text-neutral-600 bg-neutral-100 active:bg-neutral-200 transition-colors"
                  >
                    CANCELAR
                  </button>
                  <button 
                    onClick={confirmStop}
                    className="py-4 rounded-2xl font-bold text-white bg-rose-600 active:bg-rose-700 transition-colors"
                  >
                    CONFIRMAR
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
