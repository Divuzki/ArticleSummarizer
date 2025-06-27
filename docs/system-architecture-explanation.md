# Figure 4.1 – System Architecture

## Overview
This system architecture diagram illustrates the complete flow of the article summarization process, from user input through natural language processing to the final summary display. The system implements an extractive summarization approach using TF-IDF (Term Frequency-Inverse Document Frequency) scoring.

## Architecture Components

### 1. User Input Layer
**Purpose**: Capture and validate user requirements
- **Article Text**: Raw text content to be summarized
- **URL (Optional)**: Web article URL for content extraction
- **Summary Length**: User-specified number of sentences
- **Language**: Currently supports English text processing

### 2. Web Interface Layer
**Technology**: React Frontend with TypeScript
- **Input Validation**: Ensures text quality and length requirements
- **Loading States**: Provides user feedback during processing
- **Error Handling**: Graceful handling of processing failures
- **Responsive Design**: Optimized for various screen sizes

### 3. Preprocessing Layer
**Purpose**: Prepare text for NLP analysis
- **Text Cleaning**: Remove formatting artifacts and normalize text
- **Input Validation**: Verify text meets processing requirements
- **Format Normalization**: Standardize text structure
- **Length Checking**: Ensure text is within processing limits

### 4. Natural Language Processing Pipeline

#### 4.1 Sentence Tokenization
**Technology**: Natural Library Sentence Tokenizer
- Splits article into individual sentences
- Identifies sentence boundaries using punctuation and context
- Handles complex sentence structures and abbreviations

#### 4.2 TF-IDF Processing
**Algorithm**: Term Frequency-Inverse Document Frequency
- **Term Frequency (TF)**: Measures word occurrence within sentences
- **Inverse Document Frequency (IDF)**: Weights terms by rarity across sentences
- **Score Calculation**: Combines TF and IDF for importance ranking

#### 4.3 Stopword Removal
**Purpose**: Filter out non-meaningful words
- Removes common words: "the", "and", "is", "are", etc.
- Improves relevance of importance scoring
- Uses predefined English stopword list

#### 4.4 Word Tokenization
**Process**: Break sentences into individual words
- Converts text to lowercase for consistency
- Splits on whitespace and punctuation
- Filters out non-alphabetic tokens

### 5. Sentence Scoring & Ranking
**Algorithm**: Extractive Summarization
- **Importance Calculation**: Sum of TF-IDF scores for words in each sentence
- **Normalization**: Scores adjusted by sentence length
- **Ranking**: Sentences ordered by importance score
- **Selection**: Top N sentences chosen based on user preference

### 6. Summary Generation
**Process**: Combine selected sentences
- **Sentence Ordering**: Maintains original document order
- **Text Formatting**: Ensures proper spacing and punctuation
- **Quality Assurance**: Validates summary coherence

### 7. Summary Display
**Interface**: React Component with Enhanced UX
- **Formatted Output**: Clean, readable summary presentation
- **Statistics**: Word count and sentence count display
- **History Tracking**: Saves previous summaries for reference
- **Export Options**: Copy to clipboard functionality

## Data Flow Architecture

### Forward Flow (Request Processing)
1. **User Input** → Web Interface (HTTP POST)
2. **Web Interface** → Preprocessing (API Call)
3. **Preprocessing** → NLP Pipeline (Clean Text)
4. **Parallel Processing**: Tokenization, TF-IDF, Stopword Removal
5. **NLP Results** → Sentence Scoring & Ranking
6. **Scored Sentences** → Summary Generation
7. **Generated Summary** → Summary Display

### Reverse Flow (Response Delivery)
1. **Summary Display** → Web Interface (JSON Response)
2. **Web Interface** → User (Rendered HTML)

## Technical Implementation Details

### Backend Architecture
- **Framework**: Node.js with Express server
- **NLP Library**: Natural.js for text processing
- **API Design**: RESTful endpoints with JSON communication
- **Error Handling**: Comprehensive validation and error responses

### Frontend Architecture
- **Framework**: React with TypeScript
- **State Management**: React hooks for component state
- **API Communication**: Axios for HTTP requests
- **Styling**: Tailwind CSS for responsive design

### Algorithm Specifications
- **Summarization Type**: Extractive (selects existing sentences)
- **Scoring Method**: TF-IDF with stopword filtering
- **Selection Strategy**: Top-N highest scoring sentences
- **Order Preservation**: Maintains original sentence sequence

## Performance Characteristics

### Scalability Considerations
- **Processing Time**: Linear with document length
- **Memory Usage**: Efficient tokenization and scoring
- **Concurrent Requests**: Stateless processing supports multiple users

### Quality Metrics
- **Relevance**: TF-IDF ensures important content selection
- **Coherence**: Original sentence order maintains readability
- **Coverage**: Configurable summary length for user needs

## Educational Value

This architecture demonstrates several key computer science concepts:

1. **Natural Language Processing**: Practical application of NLP techniques
2. **Information Retrieval**: TF-IDF scoring for content relevance
3. **Web Architecture**: Full-stack application design patterns
4. **API Design**: RESTful service architecture
5. **User Experience**: Responsive interface design principles

The system provides an excellent example of how complex NLP algorithms can be integrated into user-friendly web applications while maintaining performance and scalability.