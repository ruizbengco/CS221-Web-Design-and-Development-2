import "./Input.css";

const Input = ({label, error, ...props}) => {
    return (
        <div className = "input-group">
            {label && <label className ="input-label">{label}</label>}
            <input className={`input-field ${error ? "inpute-error" : ""}`}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Input;