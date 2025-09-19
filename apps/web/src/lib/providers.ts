import {
  type ProviderName,
  anthropicModels,
  bedrockModels,
  chutesModels,
  deepSeekModels,
  geminiModels,
  groqModels,
  vertexModels,
  mistralModels,
  openAiNativeModels,
  vscodeLlmModels,
  xaiModels,
  // ADD ALL MISSING STATIC MODEL PROVIDERS (build confirmed available)
  cerebrasModels,
  claudeCodeModels,
  doubaoModels,
  featherlessModels,
  fireworksModels,
  ioIntelligenceModels,
  moonshotModels,
  poeModels,
  qwenCodeModels,
  rooModels,
  sambaNovaModels,
  internationalZAiModels,
} from '@roo-code/types';

export const PROVIDERS: Record<
  Exclude<ProviderName, 'fake-ai' | 'human-relay'>,
  { id: ProviderName; label: string; models: string[] }
> = {
  anthropic: {
    id: 'anthropic',
    label: 'Anthropic',
    models: Object.keys(anthropicModels),
  },
  bedrock: {
    id: 'bedrock',
    label: 'Amazon Bedrock',
    models: Object.keys(bedrockModels),
  },
  chutes: {
    id: 'chutes',
    label: 'Chutes AI',
    models: Object.keys(chutesModels),
  },
  deepseek: {
    id: 'deepseek',
    label: 'DeepSeek',
    models: Object.keys(deepSeekModels),
  },
  gemini: {
    id: 'gemini',
    label: 'Google Gemini',
    models: Object.keys(geminiModels),
  },
  'openai-native': {
    id: 'openai-native',
    label: 'OpenAI',
    models: Object.keys(openAiNativeModels),
  },
  vertex: {
    id: 'vertex',
    label: 'GCP Vertex AI',
    models: Object.keys(vertexModels),
  },
  'vscode-lm': {
    id: 'vscode-lm',
    label: 'VS Code LM API',
    models: Object.keys(vscodeLlmModels),
  },
  mistral: {
    id: 'mistral',
    label: 'Mistral',
    models: Object.keys(mistralModels),
  },
  xai: { id: 'xai', label: 'xAI (Grok)', models: Object.keys(xaiModels) },
  groq: { id: 'groq', label: 'Groq', models: Object.keys(groqModels) },

  // ADD ALL 23 MISSING PROVIDERS (complete synchronization)
  // Static model providers (with Object.keys)
  cerebras: { id: 'cerebras', label: 'Cerebras', models: Object.keys(cerebrasModels) },
  'claude-code': { id: 'claude-code', label: 'Claude Code', models: Object.keys(claudeCodeModels) },
  doubao: { id: 'doubao', label: 'Doubao', models: Object.keys(doubaoModels) },
  featherless: { id: 'featherless', label: 'Featherless', models: Object.keys(featherlessModels) },
  fireworks: { id: 'fireworks', label: 'Fireworks', models: Object.keys(fireworksModels) },
  'io-intelligence': { id: 'io-intelligence', label: 'IO Intelligence', models: Object.keys(ioIntelligenceModels) },
  moonshot: { id: 'moonshot', label: 'Moonshot', models: Object.keys(moonshotModels) },
  poe: { id: 'poe', label: 'Poe', models: Object.keys(poeModels) },
  'qwen-code': { id: 'qwen-code', label: 'Qwen Code', models: Object.keys(qwenCodeModels) },
  roo: { id: 'roo', label: 'Roo', models: Object.keys(rooModels) },
  sambanova: { id: 'sambanova', label: 'SambaNova', models: Object.keys(sambaNovaModels) },
  zai: { id: 'zai', label: 'Zai', models: Object.keys(internationalZAiModels) },

  // Dynamic model providers (with models: [])
  cometapi: { id: 'cometapi', label: 'CometAPI', models: [] },
  deepinfra: { id: 'deepinfra', label: 'DeepInfra', models: [] },
  huggingface: { id: 'huggingface', label: 'Hugging Face', models: [] },
  tars: { id: 'tars', label: 'Tars', models: [] },
  'vercel-ai-gateway': { id: 'vercel-ai-gateway', label: 'Vercel AI Gateway', models: [] },

  // EXISTING providers (keep unchanged)
  openai: { id: 'openai', label: 'OpenAI Compatible', models: [] }, // Models are manually added.
  ollama: { id: 'ollama', label: 'Ollama', models: [] }, // Models pulled locally from the Ollama server.
  lmstudio: { id: 'lmstudio', label: 'LM Studio', models: [] }, // Not sure...
  openrouter: { id: 'openrouter', label: 'OpenRouter', models: [] },
  requesty: { id: 'requesty', label: 'Requesty', models: [] },
  litellm: { id: 'litellm', label: 'LiteLLM', models: [] },
  unbound: { id: 'unbound', label: 'Unbound', models: [] },
  glama: { id: 'glama', label: 'Glama', models: [] },
  'gemini-cli': { id: 'gemini-cli', label: 'Gemini CLI', models: [] },
} as Record<
  Exclude<ProviderName, 'fake-ai' | 'human-relay'>,
  { id: ProviderName; label: string; models: string[] }
>;
