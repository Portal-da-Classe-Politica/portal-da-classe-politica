const ChipContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="mr-3 bg-orangeLight1 py-[3px] px-[8px] text-c2 text-orange font-bold rounded-[20px] text-nowrap">
      {children}
    </span>
  );
};

export default ChipContainer;
