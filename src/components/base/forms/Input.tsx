interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  id?: string;
  name?: string;
  placeholder: string;
  label: string;
  className?: string;
}

export const Input = ({ id, name, placeholder, label, className, ...props }: ButtonProps) => {
  return (
    <input
      id={id}
      name={name}
      type="text"
      className={`appearance-none border border-[#E1E3EA] rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-grayLight3 focus:shadow-outline ${className}`}
      aria-label={label}
      placeholder={placeholder}
      {...props}
    />
  );
};
