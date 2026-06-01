import { useNavigate } from "react-router-dom";
import "../styles/ProjectCard.css";

export default function ProjectCard({ project }) {

  const navigate = useNavigate();

  const open = () => {
    navigate("/project/" + project.projectId);
  };

  return (
    <div className="project-card">

      <h3>{project.title}</h3>

      <p className="desc">
        {project.description?.substring(0,100)}
      </p>

      <div className="price">₹{project.price}</div>

      <button onClick={open}>
        View
      </button>

    </div>
  );
}
