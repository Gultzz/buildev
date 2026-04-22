'use server';
/**
 * @fileOverview Um agente de IA especializado que refina ideias iniciais em escopos de projeto estruturados.
 *
 * - clarifyProjectScope - Função que processa a clarificação do projeto.
 * - ClarifyProjectScopeInput - Tipo de entrada para a função.
 * - ClarifyProjectScopeOutput - Tipo de saída para a função.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ClarifyProjectScopeInputSchema = z.object({
  initialProjectIdea: z
    .string()
    .describe('A ideia de alto nível ou conceito inicial fornecido pelo cliente.'),
  language: z
    .string()
    .describe('O idioma em que a resposta deve ser fornecida (ex: pt, en, es).')
    .default('pt'),
});

export type ClarifyProjectScopeInput = z.infer<typeof ClarifyProjectScopeInputSchema>;

const ClarifyProjectScopeOutputSchema = z.object({
  projectName: z
    .string()
    .describe('Um nome conciso e atraente sugerido para o projeto.'),
  projectSummary: z
    .string()
    .describe('Um resumo estruturado do escopo refinado, delineando propósito e valor.'),
  keyFeatures: z
    .array(z.string())
    .describe('Lista de funcionalidades principais recomendadas.'),
  technicalConsiderations: z
    .array(z.string())
    .describe('Aspectos técnicos importantes: tecnologias, escalabilidade ou integrações.'),
  nextSteps: z
    .array(z.string())
    .describe('Próximos passos recomendados para iniciar a forja do projeto.'),
});

export type ClarifyProjectScopeOutput = z.infer<typeof ClarifyProjectScopeOutputSchema>;

export async function clarifyProjectScope(
  input: ClarifyProjectScopeInput
): Promise<ClarifyProjectScopeOutput> {
  return clarifyProjectScopeFlow(input);
}

const clarifyProjectScopePrompt = ai.definePrompt({
  name: 'clarifyProjectScopePrompt',
  input: { schema: ClarifyProjectScopeInputSchema },
  output: { schema: ClarifyProjectScopeOutputSchema },
  prompt: `Você é um consultor sênior de engenharia de software da Buildei Forge.
Sua missão é transformar a ideia bruta de um cliente em um escopo técnico profissional, minimalista e de alta performance.

CRÍTICO: Você DEVE fornecer a saída inteiramente no idioma: {{{language}}}.

Seja extremamente profissional, focado em excelência técnica e design minimalista.

Ideia do Cliente: {{{initialProjectIdea}}}

Estruture o escopo focando no que é essencial para um MVP de elite.`,
});

const clarifyProjectScopeFlow = ai.defineFlow(
  {
    name: 'clarifyProjectScopeFlow',
    inputSchema: ClarifyProjectScopeInputSchema,
    outputSchema: ClarifyProjectScopeOutputSchema,
  },
  async (input) => {
    const { output } = await clarifyProjectScopePrompt(input);
    if (!output) {
      throw new Error('Não foi possível gerar a clarificação do escopo.');
    }
    return output;
  }
);
