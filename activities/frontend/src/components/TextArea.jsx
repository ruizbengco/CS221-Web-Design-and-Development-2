import "../components/Input.css";
const TextArea = ({ label, error, rows, cols, ...props }) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <textarea
        rows={rows}
        cols={cols}
        style={{ resize: "none" }}
        {...props}
      ></textarea>
      {error && <span className="error-message">(error)</span>}
    </div>
  );
};

export default TextArea;
