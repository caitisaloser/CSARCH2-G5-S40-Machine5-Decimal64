export default function ErrorMessage({
    message,
    className = "arithmetic-error"
}) {
    if (!message) {
        return null;
    }

    return (
        <div
            className={className}
            role="alert"
        >
            {message}
        </div>
    );
}