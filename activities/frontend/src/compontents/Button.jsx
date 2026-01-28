import "./Button.css"

const Button = ({children, loading, variant = "primary", ...props}) => {
    return (
        <Button className={`btn btn-${variant}`} 
                disabled={loading}>
                    {
                        loading ? (
                            <><span className="spinner">Loading...</span></>
                        ) : (
                            children
                        )
                    }
        </Button>
    );   
};

export default Button;