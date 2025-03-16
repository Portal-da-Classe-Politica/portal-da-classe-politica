import Collapse from '@base/Collapse';

export const ResultCard = ({
  className = '',
  details = [],
  children,
}: {
  className?: string;
  details?: { title: string; text: string }[];
  children: React.ReactNode;
}) => {
  return (
    <div className={`flex flex-col w-full p-4 md:p-12 bg-white drop-shadow-lg rounded-lg ${className}`}>
      {children}
      <div className="flex flex-1 flex-col mt-8">
        {details.map(({ title, text }) => (
          <Collapse key={title} title={title} className="mt-4">
            {text}
          </Collapse>
        ))}
      </div>
    </div>
  );
};
