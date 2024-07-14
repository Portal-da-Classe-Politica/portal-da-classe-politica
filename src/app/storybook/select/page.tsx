'use client';
import { Icon, Text } from '@base';
import { Select } from '@base/forms/Select';
import { BoxIcon } from '@components/box/BoxIcon';
import { SelectBasic } from '@base/forms/SelectBasic';
import { DatePicker } from '@components/DatePicker';

const Page = () => {
  const testFunc = (val: any, obj: any) => {
    console.log('teste', val);
    console.log('teste', obj);
  };

  return (
    <main className="font-montserrat p-10 bg-green-200 flex flex-col">
      <DatePicker onSelectEnd={testFunc} onSelectStart={testFunc} />
      <SelectBasic
        className="mt-2"
        placeholder="Orange"
        options={[
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' },
          { value: 'value3', label: 'label3' },
          { value: 50, label: 'label4' },
        ]}
        buttonProps={{ size: 'small' }}
      />
      <Select
        className="mt-2"
        placeholder="Orange"
        options={[
          { value: 'value1', label: 'label1' },
          { value: 'value2', label: 'label2' },
          { value: 'value3', label: 'label3' },
          { value: 50, label: 'label4' },
        ]}
        buttonProps={{ size: 'small' }}
        prefixComponent={
          <>
            <Text className="mr-1 font-normal">Categoria |</Text>
          </>
        }
      />

      <Select
        className="mt-2"
        placeholder="Black"
        options={[
          { value: 'value', label: 'label' },
          { value: 'value', label: 'label' },
          { value: 'value', label: 'label' },
          { value: 'value', label: 'label' },
        ]}
        buttonProps={{ size: 'small', style: 'fillBlack' }}
        prefixComponent={
          <>
            <BoxIcon icon="YouTube" size={8} iconSize="sm" className="bg-orange mr-2" />
            <Text className="mr-1 font-normal">Categoria |</Text>
          </>
        }
      />

      <Select
        className="mt-2"
        placeholder="Black"
        options={[
          { value: 'value', label: 'label' },
          { value: 'value', label: 'label' },
          { value: 'value', label: 'label' },
          { value: 'value', label: 'label' },
        ]}
        buttonProps={{ size: 'small', style: 'fillGray' }}
        prefixComponent={
          <>
            <BoxIcon icon="YouTube" size={8} iconSize="sm" className="bg-orange mr-2" />
            <Text className="mr-1 font-normal">Categoria |</Text>
          </>
        }
        suffixComponent={<Icon type="ArrowRight" size="xs" className="ml-2" />}
      />
    </main>
  );
};

export default Page;
