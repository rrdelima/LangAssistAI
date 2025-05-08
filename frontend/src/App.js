import React, { useState } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('');

  // Função melhorada para detectar idioma
  function detectLang(word) {
    // Remove espaços e pontuação
    const clean = word.trim().toLowerCase();
    // Lista de palavras comuns em português e espanhol para ajudar na detecção
    const ptWords = ['ão', 'lh', 'nh', 'ç', 'é', 'á', 'í', 'ó', 'ú', 'ê', 'ô', 'ã', 'õ', 'dade', 'ção', 'lhe', 'que', 'por', 'mas', 'com', 'para', 'uma', 'vermelho', 'azul', 'bom', 'ruim', 'grande', 'pequeno'];
    const esWords = ['ñ', 'll', 'á', 'é', 'í', 'ó', 'ú', '¿', '¡', 'ción', 'que', 'por', 'pero', 'con', 'para', 'una', 'rojo', 'azul', 'bueno', 'malo', 'grande', 'pequeño'];
    if (/^[a-zA-Z]+$/.test(clean)) return 'en';
    if (ptWords.some(w => clean.includes(w))) return 'pt-br';
    if (esWords.some(w => clean.includes(w))) return 'es';
    // fallback: se tiver acento e não for espanhol, assume português
    if (/[ãõçáéíóúâêô]/.test(clean)) return 'pt-br';
    // fallback: se tiver ñ ou ¿ ou ¡, assume espanhol
    if (/[ñ¿¡]/.test(clean)) return 'es';
    return 'pt-br';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    const detectedLang = detectLang(word);
    setLang(detectedLang);
    try {
      const response = await fetch(`https://langassist-backend.onrender.com/ask?word=${encodeURIComponent(word)}&lang=${detectedLang}`);
      if (!response.ok) throw new Error('Erro ao buscar resultados');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Erro ao buscar resultados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LangAssist AI</h1>
      </header>
      <main className="App-body">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Digite uma palavra em inglês, português ou espanhol"
            value={word}
            onChange={e => setWord(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>Buscar</button>
        </form>
        {loading && <p>Carregando...</p>}
        {error && <p className="error">{error}</p>}
        {result && (
          <div className="results">
            <h2>Resultados para: <span className="input-word">{result.input}</span></h2>
            <div className="translations">
              <h3>Traduções</h3>
              <ul>
                <li><b>Português (BR):</b> {result.translations['pt-br']}</li>
                <li><b>Espanhol:</b> {result.translations['es']}</li>
                <li><b>Inglês:</b> {result.translations['en']}</li>
              </ul>
            </div>
            <div className="phrases">
              <h3>Frases</h3>
              <div className="phrase-block">
                <b>Inglês:</b>
                <div>Frase: {result.phrases.en.phrase}</div>
                <div>Tradução (pt-br): {result.phrases.en.translation_ptbr}</div>
                {result.phrases.en.pronunciation && <div>Pronúncia: {result.phrases.en.pronunciation}</div>}
              </div>
              <div className="phrase-block">
                <b>Espanhol:</b>
                <div>Frase: {result.phrases.es.phrase}</div>
                <div>Tradução (pt-br): {result.phrases.es.translation_ptbr}</div>
                {result.phrases.es.pronunciation && <div>Pronúncia: {result.phrases.es.pronunciation}</div>}
              </div>
              <div className="phrase-block">
                <b>Português (BR):</b>
                <div>Frase: {result.phrases['pt-br'].phrase}</div>
                <div>Tradução (inglês): {result.phrases['pt-br'].translation_en}</div>
                <div>Tradução (espanhol): {result.phrases['pt-br'].translation_es}</div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="App-footer">
        LangAssist AI &copy; 2024 - Todos os direitos reservados
      </footer>
    </div>
  );
}

export default App;
