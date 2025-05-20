import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SummarizerPage from './pages/SummarizerPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow">
        <SummarizerPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;