type LocationInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function LocationInput({ value, onChange }: LocationInputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Where are you going?"
      autoComplete="off"
      className="w-full min-w-0 bg-transparent text-sm outline-none"
    />
  );
}
