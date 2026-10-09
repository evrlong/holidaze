export function FieldFeedback({ value, error }) {
  if (!value) return null;
  return error ? (
    <p className="text-red-600">{error}</p>
  ) : (
    <p className="text-green-600">✓ Check</p>
  );
}

export default FieldFeedback;
