'use server';
/**
 * @fileOverview An AI agent that refines and clarifies nascent project ideas into a structured project scope.
 *
 * - clarifyProjectScope - A function that handles the project clarification process.
 * - ClarifyProjectScopeInput - The input type for the clarifyProjectScope function.
 * - ClarifyProjectScopeOutput - The return type for the clarifyProjectScope function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ClarifyProjectScopeInputSchema = z.object({
  initialProjectIdea: z
    .string()
    .describe(
      'A high-level concept or nascent idea for a software project provided by a potential client.'
    ),
  language: z.string().describe('The language in which the response should be provided (e.g., pt, en).').default('pt'),
});
export type ClarifyProjectScopeInput = z.infer<
  typeof ClarifyProjectScopeInputSchema
>;

const ClarifyProjectScopeOutputSchema = z.object({
  projectName: z
    .string()
    .describe(
      'A concise and appealing suggested name for the software project.'
    ),
  projectSummary: z
    .string()
    .describe(
      'A structured summary of the refined project scope, outlining its core purpose and value proposition.'
    ),
  keyFeatures: z
    .array(z.string())
    .describe('A list of potential key features for the project.'),
  technicalConsiderations: z
    .array(z.string())
    .describe(
      'Important technical aspects, such as suggested technologies, scalability, or integration needs.'
    ),
  nextSteps: z
    .array(z.string())
    .describe(
      'Recommended next steps for the client to further define or kick-off the project with Buildei.'
    ),
});
export type ClarifyProjectScopeOutput = z.infer<
  typeof ClarifyProjectScopeOutputSchema
>;

export async function clarifyProjectScope(
  input: ClarifyProjectScopeInput
): Promise<ClarifyProjectScopeOutput> {
  return clarifyProjectScopeFlow(input);
}

const clarifyProjectScopePrompt = ai.definePrompt({
  name: 'clarifyProjectScopePrompt',
  input: { schema: ClarifyProjectScopeInputSchema },
  output: { schema: ClarifyProjectScopeOutputSchema },
  prompt: `You are an expert software consultant and project clarifier for Buildei, a software house.
Your task is to take a client's high-level project idea and transform it into a structured and refined project scope.

CRITICAL: You MUST provide the output in the requested language: {{{language}}}.

Be professional, thorough, and provide clear, actionable insights.

Client's Initial Project Idea: {{{initialProjectIdea}}}

Please provide a structured output including a suggested project name, a summary, key features, technical considerations, and clear next steps.
`,
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
      throw new Error('Failed to clarify project scope.');
    }
    return output;
  }
);
