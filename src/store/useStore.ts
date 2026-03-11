import { create } from 'zustand';

interface UserProfile {
  age: number;
  vcm: number; // Velocidad de Marcha Máxima
  hrReserve: number; // Frecuencia Cardíaca de Reserva
  targetSteps: number;
  targetDistance: number;
  targetTime: number; // in seconds (60 mins = 3600)
}

interface AppState {
  profile: UserProfile;
  isWalking: boolean;
  isResting: boolean;
  walkingTime: number; // seconds
  restingTime: number; // seconds
  steps: number;
  distance: number; // meters
  painLevel: number | null;
  
  // Actions
  startWalking: () => void;
  stopWalkingForPain: (pain: number) => void;
  resumeWalking: () => void;
  finishSession: () => void;
  tick: () => void;
  setPainLevel: (pain: number | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  profile: {
    age: 75,
    vcm: 1.2, // m/s
    hrReserve: 120,
    targetSteps: 4500,
    targetDistance: 3000,
    targetTime: 3600,
  },
  isWalking: false,
  isResting: false,
  walkingTime: 0,
  restingTime: 0,
  steps: 0,
  distance: 0,
  painLevel: null,

  startWalking: () => set({ isWalking: true, isResting: false, painLevel: null }),
  
  stopWalkingForPain: (pain) => set({ 
    isWalking: false, 
    isResting: true, 
    painLevel: pain 
  }),
  
  resumeWalking: () => set({ 
    isWalking: true, 
    isResting: false, 
    painLevel: null 
  }),

  finishSession: async () => {
    const state = get();
    try {
      if (state.walkingTime > 0) {
        await fetch('http://localhost:3001/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            walkingTime: state.walkingTime,
            restingTime: state.restingTime,
            steps: state.steps,
            distance: state.distance,
            painLevel: state.painLevel,
          }),
        });
      }
    } catch (err) {
      console.error(err);
    }
    
    set({
      isWalking: false,
      isResting: false,
      walkingTime: 0,
      restingTime: 0,
      steps: 0,
      distance: 0,
      painLevel: null,
    });
  },

  tick: () => set((state) => {
    if (state.isWalking) {
      // Simulate steps and distance based on time
      // Assume 1.5 steps per second, and 0.8 meters per step
      const newSteps = state.steps + 1.5;
      const newDistance = state.distance + 1.2;
      return {
        walkingTime: state.walkingTime + 1,
        steps: newSteps,
        distance: newDistance,
      };
    }
    if (state.isResting) {
      return { restingTime: state.restingTime + 1 };
    }
    return state;
  }),

  setPainLevel: (pain) => set({ painLevel: pain }),
}));
