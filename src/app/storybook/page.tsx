import Link from 'next/link';
import { Text } from '@base';

const storybookLinks = [
  {
    title: 'Button',
    link: '/storybook/button',
  },
  {
    title: 'Icon',
    link: '/storybook/icon',
  },
  {
    title: 'Select',
    link: '/storybook/select',
  },
  {
    title: 'cardPost',
    link: '/storybook/cardPost',
  },
];

const Page = () => {
  return (
    <main className="font-montserrat h-full">
      <ul className="list-disc mt-auto h-full">
        <li>
          <Text className="list-item font-bold">Storybook</Text>
          <ul className="list-disc pl-8">
            {storybookLinks.map(({ link, title }) => (
              <li key={link} className="mt-4 hover:text-blue-500">
                <Link target="_blank" href={link}>
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
