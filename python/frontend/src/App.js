import React, { useState } from "react";
import axios from "axios";
import TableEditor from "./TableEditor";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [docComponents, setDocComponents] = useState([]);

  const addText = () => {
    setDocComponents([...docComponents, { type: "text", content: "" }]);
  };

  const addTable = () => {
    setDocComponents([...docComponents, { type: "table", rows: [[""]] }]);
  };

  const updateText = (index, value) => {
    const newComponents = [...docComponents];
    newComponents[index].content = value;
    setDocComponents(newComponents);
  };

  const updateTable = (index, rows) => {
    const newComponents = [...docComponents];
    newComponents[index].rows = rows;
    setDocComponents(newComponents);
  };

  const generateDoc = async (type) => {
    try {
      const url =
        type === "docx"
          ? "http://192.168.138.161:8000/generate-docx"
          : "http://192.168.138.161:8000/generate-pdf";

      const payload = { components: docComponents };

      const response = await axios.post(url, payload, { responseType: "blob" });
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.download = `generated.${type}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generating document:", err);
      alert("Failed to generate document. Check console.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          borderRight: "1px solid gray",
          padding: "10px",
        }}
      >
        <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button className="btn btn-primary" onClick={addText}>
            <i className="bi bi-pencil-square me-2"></i>
            Text
          </button>

          <button className="btn btn-secondary" onClick={addTable}>
            <i className="bi bi-table me-2"></i>
            Table
          </button>
        </div>

        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button className="btn btn-success" onClick={() => generateDoc("docx")}>
            <i className="bi bi-file-earmark-text me-2"></i>
            DOCX
          </button>

          <button className="btn btn-danger" onClick={() => generateDoc("pdf")}>
            <i className="bi bi-file-earmark-pdf me-2"></i>
            PDF
          </button>
        </div>
      </div>

      {/* Main frame */}
      <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
        {docComponents.map((comp, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            {comp.type === "text" && (
              <input
                type="text"
                value={comp.content}
                onChange={(e) => updateText(index, e.target.value)}
                placeholder="Enter text"
                style={{ width: "100%", padding: "5px" }}
              />
            )}
            {comp.type === "table" && (
              <TableEditor
                table={comp.rows}
                onChange={(rows) => updateTable(index, rows)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
