'use client';

import { DatePicker } from '@components/DatePicker';

const Page = () => {
  const testFunc = (val: any, obj: any) => {
    console.debug('teste', val);
    console.debug('teste', obj);
  };

  return (
    <main className="font-montserrat p-10 bg-green-200 flex flex-col">
      <DatePicker onSelectEnd={testFunc} onSelectStart={testFunc} />
    </main>
  );
};

export default Page;
