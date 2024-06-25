'use client';
import DatePicker from '@/components/DatePicker';

const Page = () => {
  const testFunc = (val: any, obj: any) => {
    console.log('teste', val);
    console.log('teste', obj);
  };

  return (
    <main className="font-montserrat p-10 bg-green-200 flex flex-col">
      <DatePicker onSelectEnd={testFunc} onSelectStart={testFunc} />
    </main>
  );
};

export default Page;
