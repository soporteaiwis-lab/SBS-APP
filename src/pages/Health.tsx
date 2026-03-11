import { HeartPulse, Activity, Info, Clock, ActivitySquare, Droplet, Smile } from 'lucide-react';

export default function Health() {
  return (
    <div className="flex flex-col min-h-[100%] max-w-md mx-auto px-6 space-y-8">
      <header className="pt-2 pb-2">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Salud</h1>
        <p className="text-lg text-neutral-500 mt-2">Monitoreo y educación</p>
      </header>

      {/* Clinical Data */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-emerald-600" />
          Datos Clínicos
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">ITB</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <span className="text-3xl font-light text-neutral-900">0.85</span>
            <p className="text-xs text-neutral-500 mt-1">Índice Tobillo-Brazo</p>
          </div>
          
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">PVR</span>
              <div className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <span className="text-3xl font-light text-neutral-900">Onda</span>
            <p className="text-xs text-neutral-500 mt-1">Pletismografía</p>
          </div>
        </div>
      </section>

      {/* Physiology */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 flex items-center">
          <HeartPulse className="w-5 h-5 mr-2 text-rose-600" />
          Fisiología
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">FC Res</span>
              <ActivitySquare className="w-4 h-4 text-rose-500" />
            </div>
            <span className="text-3xl font-light text-neutral-900">120</span>
            <p className="text-xs text-neutral-500 mt-1">Frecuencia Reserva</p>
          </div>
          
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest">SmO2</span>
              <Droplet className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-3xl font-light text-neutral-900">65%</span>
            <p className="text-xs text-neutral-500 mt-1">Oximetría Muscular</p>
          </div>
        </div>
      </section>

      {/* Quality of Life */}
      <section className="space-y-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex items-start space-x-4">
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Calidad de Vida (EQ-5D)</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Estado de salud actual: <strong>75/100</strong>. Ha mejorado 5 puntos desde el último mes.
            </p>
          </div>
        </div>
      </section>

      {/* Sedentary Time */}
      <section className="space-y-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex items-start space-x-4">
          <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Tiempo Sentado</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Hoy ha pasado <strong>4.5 horas</strong> sentado. Intente levantarse y caminar 5 minutos cada hora.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4 pb-8">
        <h2 className="text-xl font-bold text-neutral-900 flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-600" />
          Educación EAP
        </h2>
        
        <div className="space-y-3">
          {[
            { title: '¿Qué es la claudicación intermitente?', desc: 'El dolor al caminar es normal. Significa que sus músculos necesitan más oxígeno.' },
            { title: 'Importancia de caminar', desc: 'Caminar ayuda a crear nuevos vasos sanguíneos (colaterales) en sus piernas.' },
            { title: 'Cuidado de los pies', desc: 'Revise sus pies diariamente buscando heridas o cambios de color.' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100">
              <h4 className="font-bold text-neutral-900">{item.title}</h4>
              <p className="text-sm text-neutral-500 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
