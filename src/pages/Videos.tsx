import { PlayCircle, CheckCircle2 } from 'lucide-react';

export default function Videos() {
  const capsules = [
    {
      id: 1,
      title: 'Extensiones de Piernas',
      duration: '5 min',
      completed: true,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400&h=300',
      desc: 'Fortalece los cuádriceps para mejorar la estabilidad.',
    },
    {
      id: 2,
      title: 'Levantarse y Sentarse',
      duration: '8 min',
      completed: false,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400&h=300',
      desc: 'Mejora la fuerza funcional y el equilibrio.',
    },
    {
      id: 3,
      title: 'Elevaciones de Pantorrillas',
      duration: '6 min',
      completed: false,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400&h=300',
      desc: 'Aumenta el flujo sanguíneo en la zona afectada.',
    },
  ];

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-6 space-y-8">
      <header className="pt-8 pb-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Fuerza</h1>
        <p className="text-lg text-neutral-500 mt-2">Cápsulas de entrenamiento</p>
      </header>

      <section className="space-y-6 pb-8">
        <div className="flex items-center justify-between text-sm font-medium text-neutral-500 uppercase tracking-widest mb-4">
          <span>Rutina Semanal</span>
          <span>1/3 Completado</span>
        </div>

        {capsules.map((capsule) => (
          <div 
            key={capsule.id} 
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={capsule.image} 
                alt={capsule.title} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-white font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                  {capsule.duration}
                </span>
                {capsule.completed ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                ) : (
                  <PlayCircle className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold text-neutral-900">{capsule.title}</h3>
              <p className="text-sm text-neutral-500 mt-2 leading-relaxed">{capsule.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
