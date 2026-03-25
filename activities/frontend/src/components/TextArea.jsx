import "../components/Input.css";
const TextArea = ({ label, error, rows, ...props }) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <textarea
        className="input-field"
        rows={rows}
        style={{ resize: "none", width: "100%", boxSizing: "border-box" }}
        {...props}
      ></textarea>
      {error && <span className="error-message">(error)</span>}
    </div>
  );
};

export default TextArea;
