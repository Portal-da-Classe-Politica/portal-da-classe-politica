export const Radio = ({
  name,
  id = '',
  value,
  label,
  className = '',
}: {
  name: string;
  id: string;
  value: string;
  label: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input type="radio" name={name} id={id} value={value} className="mr-2" />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
