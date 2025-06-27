# Article Summarization Sequence Diagram

## Overview
This sequence diagram illustrates the complete flow of the article summarization process in our application, from user input to the final display of the generated summary.

## Components

### 1. **User**
- The end user who interacts with the application
- Provides article text input and initiates the summarization process

### 2. **Frontend (React)**
- User interface built with React and TypeScript
- Handles user interactions and displays results
- Validates input before sending to backend

### 3. **API (Express Server)**
- Node.js/Express backend server
- Provides REST endpoint `/api/summarize`
- Handles HTTP requests and responses

### 4. **Summarizer**
- Core summarization logic module
- Orchestrates the NLP processing pipeline
- Implements extractive summarization algorithm

### 5. **NLP Engine (Natural Library)**
- Natural language processing utilities
- Provides tokenization and stopword removal
- Supports TF-IDF calculations

## Process Flow

### Phase 1: User Input (Steps 1-2)
1. **User inputs article text** into the textarea component
2. **User clicks "Generate Summary"** button to initiate processing

### Phase 2: Frontend Processing (Step 3)
3. **Frontend validates input** to ensure text is provided and meets requirements

### Phase 3: API Communication (Steps 4-5)
4. **Frontend sends POST request** to `/api/summarize` with article text and sentence count
5. **API validates the request** parameters and structure

### Phase 4: NLP Processing (Steps 6-13)
6. **API calls summarizer function** with validated parameters
7. **Text tokenization** breaks the article into individual sentences
8. **Sentence array returned** to the summarizer for processing
9. **TF-IDF scoring calculation** for each sentence based on term frequency
10. **Stopword removal** filters out common words that don't add meaning
11. **Filtered tokens returned** for final scoring
12. **Sentence scoring** ranks sentences by importance using TF-IDF scores
13. **Top N sentences selected** based on the requested summary length

### Phase 5: Response and Display (Steps 14-17)
14. **Summary returned** from summarizer to API
15. **JSON response sent** back to frontend with the generated summary
16. **Frontend updates UI** with the new summary content
17. **Summary displayed** to the user in the output panel

## Key Technical Details

### Extractive Summarization Algorithm
- **TF-IDF (Term Frequency-Inverse Document Frequency)**: Measures word importance
- **Stopword Filtering**: Removes common words like "the", "and", "is"
- **Sentence Scoring**: Ranks sentences based on the sum of their word TF-IDF scores
- **Top-N Selection**: Chooses the highest-scoring sentences for the summary

### Error Handling
- Input validation at both frontend and backend levels
- Graceful error responses with meaningful messages
- Network error handling for API communication failures

### Performance Considerations
- Asynchronous processing to prevent UI blocking
- Efficient tokenization and scoring algorithms
- Reasonable limits on input text length

## Educational Value

This diagram demonstrates:
- **Separation of Concerns**: Clear boundaries between UI, API, and processing logic
- **RESTful API Design**: Standard HTTP methods and JSON communication
- **NLP Pipeline**: Step-by-step text processing workflow
- **Error Handling**: Validation and error response patterns
- **Asynchronous Processing**: Non-blocking user interface design

The sequence shows how modern web applications handle complex processing tasks while maintaining responsive user interfaces and robust error handling.