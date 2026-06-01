import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../api/userApi";
import "../styles/Home.css";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  return (
    <div>
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        {/* floating orbs (CSS animated) */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* badge */}
        <div className="hero-badge">
          🚀 &nbsp;India's #1 Academic Project Store
        </div>

        <h1>
          Download{" "}
          <span className="grad-text">Ready Made</span>
          <br />Projects
        </h1>

        <p>Academic &nbsp;|&nbsp; Mini &nbsp;|&nbsp; Major &nbsp;|&nbsp; Final Year Projects</p>

        <div className="hero-actions">
          <button className="browse-btn">
            Browse Projects &nbsp;→
          </button>
          <button className="browse-btn-secondary">
            View Categories
          </button>
        </div>

        {/* stats row */}
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">500<span>+</span></div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat">
            <div className="stat-num">10k<span>+</span></div>
            <div className="stat-label">Downloads</div>
          </div>
          <div className="stat">
            <div className="stat-num">4.9<span>★</span></div>
            <div className="stat-label">Rated</div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="box">
          <div className="box-icon">⚡</div>
          Instant Download
        </div>
        <div className="box">
          <div className="box-icon">🔒</div>
          Secure Payment
        </div>
        <div className="box">
          <div className="box-icon">📦</div>
          Source Code + Report
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="project-list">
        <div className="section-header">
          <h2>Latest Projects</h2>
          <a className="view-all-btn" href="/projects">
            View All &nbsp;→
          </a>
        </div>

        <div className="grid">
          {projects.map((p) => (
            <ProjectCard key={p.projectId} project={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}