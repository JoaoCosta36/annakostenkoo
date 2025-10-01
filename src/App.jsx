import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import './styles.css';

function Home({ projects }) {
  return (
    <main className="gallery-wrap">
      {projects.length === 0 && <p className="center">No images</p>}

      <div className="projects-grid">
        {projects.map((proj) => (
          <Link
            key={proj.name}
            to={`/project/${proj.name}`}
            className="project-card"
          >
            {proj.images.length > 0 && (
              <img
                loading="lazy"
                src={`${import.meta.env.BASE_URL}${proj.images[0].src}`}
                alt={proj.name}
                className="project-image"
              />
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}

function ProjectPage({ projects }) {
  const { name } = useParams();
  const project = projects.find(p => p.name === name);
  const [modalImg, setModalImg] = useState(null);

  if (!project) return <p className="center">Projeto não encontrado</p>;

  return (
    <main className="gallery-wrap">
      <h2 className="project-heading">{project.name}</h2>

      <div className="project-gallery">
        {project.images.map(img => (
          <img
            key={img.filename}
            loading="lazy"
            src={`${import.meta.env.BASE_URL}${img.src}`}
            alt={img.filename}
            onClick={() => setModalImg(`${import.meta.env.BASE_URL}${img.src}`)}
          />
        ))}
      </div>

      <div className="center">
        <Link to="/" className="back-link">← Back</Link>
      </div>

      {modalImg && (
        <div className="modal" onClick={() => setModalImg(null)}>
          <img src={modalImg} alt="Visualização" />
        </div>
      )}
    </main>
  );
}

function ContactsPage() {
  return (
    <main className="gallery-wrap contacts">
      <h2 className="project-heading">Contacts</h2>
      <p>
        Instagram:{" "}
        <a
          href="https://www.instagram.com/kostandstenko"
          target="_blank"
          rel="noopener noreferrer"
        >
          @kostandstenko
        </a>
      </p>
      <p>
        Email: <a href="mailto:kostandstenko@gmail.com">kostandstenko@gmail.com</a>
      </p>
      <p>
        My Interview:{" "}
        <a
          href="https://youtu.be/-Tr1MvK7lKk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Video
        </a>
      </p>

      {/* Contact Image */}
      <div className="contact-image-wrapper">
        <img
          src={`${import.meta.env.BASE_URL}images/contact_image.jpg`}
          alt="Contact"
          className="contact-image"
        />
      </div>
    </main>
  );
}

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}images/images.json`)
      .then(r => r.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <header className="site-header">
        <h1><Link to="/">ANNA KOSTENKO</Link></h1>
        <nav className="nav-links">
          <Link to="/contacts">Contacts</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home projects={projects} />} />
        <Route path="/project/:name" element={<ProjectPage projects={projects} />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<p className="center">Page not found</p>} />
      </Routes>

      <footer className="site-footer">
        <small>
    Made with ❤️ by{' '}
    <a href="https://www.instagram.com/jps.costa" target="_blank" rel="noopener noreferrer">
      João Costa
    </a>
  </small>
      </footer>
    </Router>
  );
}