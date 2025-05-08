const axios = require('axios');

console.log('DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY);

async function askDeepseek(word, lang) {
  // Monta o prompt conforme a nova regra
  const prompt = `Dada a palavra "${word}" (idioma: ${lang}), siga as instruções:
1. Traduza a palavra para português do Brasil, espanhol e inglês.
2. Crie uma frase em inglês usando a palavra e traduza essa frase para português do Brasil.
3. Crie uma frase em espanhol usando a palavra e traduza essa frase para português do Brasil.
4. Crie uma frase em português do Brasil usando a palavra, traduza essa frase para inglês e espanhol.
5. Se possível, forneça a pronúncia da palavra e das frases em inglês e espanhol (formato fonético simples).
6. Retorne tudo em um JSON estruturado assim:
{
  "input": "palavra informada",
  "translations": { "pt-br": "...", "es": "...", "en": "..." },
  "phrases": {
    "en": { "phrase": "...", "translation_ptbr": "...", "pronunciation": "..." },
    "es": { "phrase": "...", "translation_ptbr": "...", "pronunciation": "..." },
    "pt-br": { "phrase": "...", "translation_en": "...", "translation_es": "..." }
  }
}`;

  const response = await axios.post('https://api.deepseek.com/chat/completions', {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: 'Você é um assistente de idiomas. Responda sempre em JSON, sem comentários ou texto extra.' },
      { role: 'user', content: prompt }
    ]
  }, {
    headers: {
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  const message = response.data.choices[0].message.content.trim();

  return {
    answer: message,
    timestamp: new Date().toISOString()
  };
}

module.exports = { askOpenAI: askDeepseek };
