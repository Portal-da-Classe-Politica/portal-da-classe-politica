const TextArea = ({
  id,
  name,
  placeholder,
  label,
}: {
  id?: string;
  name?: string;
  placeholder: string;
  label: string;
}) => {
  return (
    <textarea
      id={id}
      name={name}
      className="appearance-none border border-[#E1E3EA] rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-grayLight3 focus:shadow-outline resize-none"
      placeholder={placeholder}
      aria-label={label}
      rows={5}
      cols={33}
    />
  );
};

export default TextArea;
