// "How AI works, from scratch": the one list every series page and the series map read from.
// A part with a `file` is published; without one it shows as coming soon. Order here is reading order.
window.ELI5_SERIES = {
  id: 'how-ai-works',
  title: 'How AI works, from scratch',
  hub: 'how-ai-works-from-scratch.html',
  tracks: {
    llm: { name: 'How LLMs work', short: 'LLM track', color: '#76d5c1' },
    chip: { name: 'How chips work', short: 'Chip track', color: '#c3b8ff' }
  },
  parts: [
    { id: 'text-becomes-numbers-eli5', track: 'llm', title: 'Text becomes numbers', blurb: 'Tokens, the word list, and meaning as a position on a map', file: 'text-becomes-numbers-eli5.html' },
    { id: 'guess-the-next-word-eli5', track: 'llm', title: 'The only job: guess the next word', blurb: 'Scores, chances, temperature, and why it writes one piece at a time', file: 'guess-the-next-word-eli5.html' },
    { id: 'what-a-chip-is-eli5', track: 'chip', title: 'What a chip actually is', blurb: 'Billions of tiny switches, and how switches add numbers', file: 'what-a-chip-is-eli5.html' },
    { id: 'the-cpu-eli5', track: 'chip', title: 'The CPU: the chip in your laptop', blurb: 'A few very clever workers doing one task after another' },
    { id: 'the-gpu-eli5', track: 'chip', title: 'The GPU: thousands of simple workers', blurb: 'Why drawing a game screen and running AI need the same thing' },
    { id: 'learning-is-nudging-numbers-eli5', track: 'llm', title: 'Learning is nudging numbers', blurb: 'Training from two knobs to billions: error, slope, and the walk downhill' },
    { id: 'attention-eli5', track: 'llm', title: 'Attention: words looking at words', blurb: 'How each word gathers meaning from the words before it' },
    { id: 'memory-bottleneck-eli5', track: 'chip', title: 'Memory: the real bottleneck', blurb: 'Why moving numbers costs more than doing maths on them' },
    { id: 'the-transformer-eli5', track: 'llm', title: 'The transformer, assembled', blurb: 'Stacking the pieces into one full pass through the model' },
    { id: 'ai-chips-eli5', track: 'chip', title: 'AI chips: GPUs, TPUs and Trainium', blurb: 'What each design removes or adds to get better at AI maths' },
    { id: 'why-bigger-works-eli5', track: 'llm', title: 'Scale: why bigger works', blurb: 'Data, compute, and the surprisingly steady rules of scaling' },
    { id: 'many-chips-as-one-eli5', track: 'chip', title: 'Many chips as one', blurb: 'Why one chip is not enough, and how thousands are wired together' },
    { id: 'autocomplete-to-assistant-eli5', track: 'llm', title: 'From autocomplete to assistant', blurb: 'Fine-tuning and human feedback: how a word-guesser learns to help' },
    { id: 'context-window-eli5', track: 'llm', title: 'Memory and the context window', blurb: 'What the model can see at once, and why long chats forget' },
    { id: 'why-models-make-things-up-eli5', track: 'llm', title: 'Why models make things up', blurb: 'Confident mistakes: where they come from and why they are hard to stop' },
    { id: 'thinking-and-tools-eli5', track: 'llm', title: 'Thinking and using tools', blurb: 'Reasoning steps, searching, running code, and acting as an agent' },
    { id: 'how-chips-are-made-eli5', track: 'chip', title: 'How chips are made', blurb: 'Silicon, light, and the factories the whole industry depends on' }
  ],
  bonus: { id: 'inside-llm-serving-eli5', title: 'Inside LLM serving: one model, millions of chats', blurb: 'Where software meets hardware: one shared model serving millions of chats', file: 'inside-llm-serving-eli5.html' }
};
