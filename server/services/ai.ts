import { GoogleGenAI } from '@google/genai';

export async function generateMotivation(stats: any) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // We create a clinically empathetic prompt based on the patient's walking metrics
    const prompt = `
Eres un asistente médico virtual empático y profesional especializado en la rehabilitación de pacientes con claudicación intermitente o enfermedad arterial periférica.

El paciente acaba de terminar una sesión de caminata. Sus métricas son:
- Tiempo caminado: ${Math.floor(stats.walkingTime / 60)} minutos
- Tiempo descansando: ${Math.floor(stats.restingTime / 60)} minutos
- Pasos dados: ${Math.floor(stats.steps)}
- Distancia: ${stats.distance.toFixed(2)} metros
- Nivel de dolor en las piernas reportado (0 al 10): ${stats.painLevel === null ? 'No reportó dolor' : stats.painLevel}

Por favor, dale un corto pero muy motivador mensaje de máximo 3 oraciones felicitando su progreso, y brindándole un consejo práctico basado en sus métricas actuales, especialmente considerando su nivel de dolor. El mensaje debe ir directo al paciente.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('Error generating AI text:', error);
    return '¡Gran trabajo hoy! Recuerda que cada paso cuenta para mejorar la circulación en tus piernas. Descansa lo necesario y nos vemos en la siguiente sesión.';
  }
}
