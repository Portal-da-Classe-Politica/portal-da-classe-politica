import Link from 'next/link';
import Text from '@base/Text';

const storybookLinks = [
  {
    title: 'Button',
    link: '/storybook/button',
  },
  {
    title: 'Icon',
    link: '/storybook/icon',
  },
];

const Page = () => {
  return (
    <main className="font-montserrat">
      <ul className="list-disc mt-8">
        <li>
          <Text className="list-item font-bold">Storybook</Text>
          <ul className="list-disc pl-8">
            {storybookLinks.map(({ link, title }) => (
              <li key={link} className="mt-4 hover:text-blue-500">
                <Link href={link} target="_blank">
                  <Text className="list-item">{title}</Text>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </main>
  );
};

export default Page;
