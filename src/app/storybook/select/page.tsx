import { Icon, Text } from '@base';
import { Select } from '@/components/base/forms/Select';
import { BoxIcon } from '@/components/box/BoxIcon';

const Page = () => {
  return (
    <main className="font-montserrat p-10 bg-green-200 flex flex-col">
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
            <BoxIcon iconType="YouTube" size={8} iconSize={20} className="bg-orange mr-2" />
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
            <BoxIcon iconType="YouTube" size={8} iconSize={20} className="bg-orange mr-2" />
            <Text className="mr-1 font-normal">Categoria |</Text>
          </>
        }
        suffixComponent={<Icon type="ArrowRight" size={10} className="ml-2" />}
      />
    </main>
  );
};

export default Page;
