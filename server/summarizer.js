import natural from "natural";

const { WordTokenizer, SentenceTokenizer, TfIdf } = natural;

const tokenizer = new WordTokenizer();
const sentenceTokenizer = new SentenceTokenizer();
const stopwords = natural.stopwords;

/**
 * Summarize text using extractive summarization
 * @param {string} text - The text to summarize
 * @param {number} sentenceCount - Number of sentences to include in summary
 * @returns {string} - The summarized text
 */
export async function summarizeText(text, sentenceCount = 5) {
  try {
    // Step 1: Break text into sentences
    const sentences = sentenceTokenizer.tokenize(text);

    if (sentences.length <= sentenceCount) {
      return text; // Return the original text if it's already short enough
    }

    // Step 2: Calculate TF-IDF scores
    const tfidf = new TfIdf();

    // Add each sentence as a document to the TF-IDF model
    sentences.forEach((sentence) => {
      // Tokenize, filter stopwords, and join tokens for each sentence
      const tokens = tokenizer.tokenize(sentence.toLowerCase());
      const filteredTokens = tokens.filter(
        (token) => !stopwords.includes(token)
      );
      tfidf.addDocument(filteredTokens);
    });

    // Step 3: Score each sentence based on TF-IDF
    const sentenceScores = [];

    sentences.forEach((sentence, sentenceIndex) => {
      let score = 0;
      const tokens = tokenizer.tokenize(sentence.toLowerCase());
      const filteredTokens = tokens.filter(
        (token) => !stopwords.includes(token)
      );

      // Calculate the sum of TF-IDF scores for each term in the sentence
      filteredTokens.forEach((term) => {
        const termScore = tfidf.tfidf(term, sentenceIndex);
        score += termScore;
      });

      // Normalize score by sentence length (if sentence has words)
      if (filteredTokens.length > 0) {
        score = score / filteredTokens.length;
      }

      // Store sentence with its score and original position
      sentenceScores.push({
        sentence,
        score,
        position: sentenceIndex,
      });
    });

    // Step 4: Sort sentences by score
    sentenceScores.sort((a, b) => b.score - a.score);

    // Step 5: Select top N sentences
    const topSentences = sentenceScores
      .slice(0, sentenceCount)
      // Sort by original position to maintain original flow
      .sort((a, b) => a.position - b.position)
      .map((item) => item.sentence);

    // Step 6: Join sentences to create summary
    return topSentences.join(" ");
  } catch (error) {
    console.error("Error in summarization process:", error);
    throw new Error("Failed to summarize text: " + error.message);
  }
}
