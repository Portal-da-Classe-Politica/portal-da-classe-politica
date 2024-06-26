const Input = ({ placeholder, label }: { placeholder: string; label: string }) => {
  return (
    <>
      <input
        className="appearance-none border border-[#E1E3EA] rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-grayLight3 focus:shadow-outline"
        id="username"
        type="text"
        aria-label={label}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
