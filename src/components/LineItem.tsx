const LineItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`flex ${className}`}>
      <div className="bg-orange w-[4px] mr-5"></div>
      <div className="my-2">{children}</div>
    </div>
  );
};

export default LineItem;
