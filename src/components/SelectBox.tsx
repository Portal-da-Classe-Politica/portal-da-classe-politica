import { useState } from 'react';

type ContentProps = {
  title: string;
  content: string | React.ReactNode;
};

type Props = {
  tabs: ContentProps[];
};

const SelectBox = ({ tabs }: Props) => {
  const [selecionado, setSelecionado] = useState(0);

  return (
    <div className="max-w-[1298px]">
      <div className="flex">
        {tabs.map((current, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSelecionado(index);
              }}
              className={`${
                selecionado === index
                  ? 'bg-orange text-white text-[18px] font-bold rounded-t-[10px] py-4 px-8'
                  : 'text-orange text-[18px]  py-4 px-8'
              }`}
            >
              {current.title}
            </div>
          );
        })}
      </div>
      <div className="flex py-10 px-7py-10 px-7 bg-orange">{tabs[selecionado].content}</div>
    </div>
  );
};

export default SelectBox;
