import React from "react";

function TableEditor({ table, onChange }) {
  const updateCell = (rowIndex, colIndex, value) => {
    const newTable = table.map((row, r) =>
      row.map((cell, c) => (r === rowIndex && c === colIndex ? value : cell))
    );
    onChange(newTable);
  };

  const addRow = () => {
    const newTable = [...table, Array(table[0].length).fill("")];
    onChange(newTable);
  };

  const addColumn = () => {
    const newTable = table.map((row) => [...row, ""]);
    onChange(newTable);
  };

  return (
    <div>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <tbody>
          {table.map((row, rIndex) => (
            <tr key={rIndex}>
              {row.map((cell, cIndex) => (
                <td
                  key={cIndex}
                  style={{ border: "1px solid black", padding: "3px" }}
                >
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => updateCell(rIndex, cIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "5px" }}>
        <button onClick={addRow} style={{ marginRight: "5px" }}>
          Add Row
        </button>
        <button onClick={addColumn}>Add Column</button>
      </div>
    </div>
  );
}

export default TableEditor;
