import { useState } from "react";
import { uploadProjectApi } from "../../api/adminUploadApi";
import "../../styles/AdminAddProject.css";

export default function AdminAddProject() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    language: "JAVA",
    level: "BEGINNER",
  });

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleImage = (e) => setImage(e.target.files[0]);

  const handleSubmit = async () => {

    if (!file) {
      alert("Please select ZIP file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "data",
        new Blob([JSON.stringify(form)], { type: "application/json" })
      );

      formData.append("file", file);

      if (image) {
        formData.append("image", image);
      }

      await uploadProjectApi(formData);

      alert("Project Uploaded Successfully 🎉");

      setForm({
        title: "",
        description: "",
        price: "",
        language: "JAVA",
        level: "BEGINNER",
      });

      setFile(null);
      setImage(null);

    } catch (err) {
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">

      <h2>Add New Project</h2>

      <input
        name="title"
        placeholder="Project Title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />

      <select name="language" onChange={handleChange}>
        <option>JAVA</option>
        <option>PYTHON</option>
      </select>

      <select name="level" onChange={handleChange}>
        <option>BEGINNER</option>
        <option>INTERMEDIATE</option>
        <option>ADVANCED</option>
      </select>

      <label>ZIP File</label>
      <input type="file" accept=".zip" onChange={handleFile} />

      <label>Project Image</label>
      <input type="file" accept="image/*" onChange={handleImage} />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Uploading..." : "Upload Project"}
      </button>

    </div>
  );
}
