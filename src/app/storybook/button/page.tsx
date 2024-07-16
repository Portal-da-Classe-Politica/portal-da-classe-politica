import { Button, ButtonProps } from '@base';

const Page = () => {
  return (
    <main className="font-montserrat p-10">
      {[
        ['Orange small', { size: 'small' }],
        ['Orange standard', { size: 'standard' }],
        ['Orange large', { size: 'large' }],
        ['Orange Outlined', { size: 'large', style: 'outlinedOrange' }],
        ['Orange ghost', { style: 'ghostOrange' }],
        ['Orange link', { style: 'linkOrange' }],
        ['Orange Disabled', { disabled: true }],
        ['Black Fill', { style: 'fillBlack' }],
        ['Black outlined', { style: 'outlinedBlack' }],
        ['Black Ghost', { style: 'ghostBlack' }],
        ['Black Link', { style: 'linkBlack' }],
        ['Black Disabled', { disabled: true, style: 'fillBlack' }],
      ].map((el: any, idx: number) => {
        const text = el[0] as string;
        const props = el[1] as ButtonProps;

        return (
          <div key={idx} className="py-2">
            <Button
              text={text}
              color={props?.color || 'orange'}
              style={props?.style || 'fillOrange'}
              size={props?.size || 'standard'}
              disabled={props?.disabled || false}
            />
          </div>
        );
      })}
    </main>
  );
};

export default Page;
