import { useState } from 'react';
import { Icon } from './Icon';

export default function Collapse({
  title,
  className = '',
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col  border rounded-2xl shadow p-4 ${className}`}>
      <button
        className="flex w-full justify-between items-center w-full text-lg font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <Icon className="w-5 h-5" type={isOpen ? 'ArrowUp' : 'ArrowDown'} />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out mt-2 text-gray-700 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
