type FieldFeedbackProps = {
  value: string;
  error?: string;
};

export function FieldFeedback({ value, error }: FieldFeedbackProps) {
  if (!value) return null;
  return error ? (
    <p className="text-error-600">{error}</p>
  ) : (
    <p className="text-success-600">✓ Check</p>
  );
}

export default FieldFeedback;
