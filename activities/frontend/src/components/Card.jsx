import "./Card.css"

const Card = ({title, children}) => {
    return (
        <div className="card-container">
            <div className="card">
                {title && <h2 className="card-title">{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Card;