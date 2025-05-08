const {Translate} = require('@google-cloud/translate').v2;

// Inicializa o cliente do Google Translate
const translate = new Translate({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

async function translateText(text, targetLang) {
  try {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error('Erro na tradução:', error);
    throw error;
  }
}

async function translateWord(word, sourceLang) {
  try {
    // Traduz para português, espanhol e inglês
    const ptBr = await translateText(word, 'pt-BR');
    const es = await translateText(word, 'es');
    const en = await translateText(word, 'en');

    // Cria frases de exemplo
    const enPhrase = `This is a ${en} example.`;
    const esPhrase = `Este es un ejemplo de ${es}.`;
    const ptBrPhrase = `Este é um exemplo de ${ptBr}.`;

    // Traduz as frases
    const enPhrasePtBr = await translateText(enPhrase, 'pt-BR');
    const esPhrasePtBr = await translateText(esPhrase, 'pt-BR');
    const ptBrPhraseEn = await translateText(ptBrPhrase, 'en');
    const ptBrPhraseEs = await translateText(ptBrPhrase, 'es');

    // Monta o resultado em JSON
    const result = {
      input: word,
      translations: {
        'pt-br': ptBr,
        'es': es,
        'en': en
      },
      phrases: {
        'en': {
          phrase: enPhrase,
          translation_ptbr: enPhrasePtBr,
          pronunciation: '' // Google Translate não fornece pronúncia
        },
        'es': {
          phrase: esPhrase,
          translation_ptbr: esPhrasePtBr,
          pronunciation: '' // Google Translate não fornece pronúncia
        },
        'pt-br': {
          phrase: ptBrPhrase,
          translation_en: ptBrPhraseEn,
          translation_es: ptBrPhraseEs
        }
      }
    };

    return {
      answer: JSON.stringify(result),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erro ao processar tradução:', error);
    throw error;
  }
}

module.exports = { translateWord }; 