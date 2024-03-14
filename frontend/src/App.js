import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Import des styles bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

//Import des composant de pages
import Accueil from './components/Accueil';
import Menu from './components/Menu';
import ClientListe from './components/ClientListe'
import CompteListe from './components/CompteListe'
import ClientDetail from './components/ClientDetail'

function App() {

  return (
      <Router>
          <Container>
              <Routes>
                  <Route path="/" element={<Accueil />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/clientListe" element={<ClientListe />} />
                  <Route path="/compteListe" element={<CompteListe />} />
                  <Route path="/clientDetail/:id" element={<ClientDetail />} />
              </Routes>
          </Container>
      </Router>
  );
}

export default App;