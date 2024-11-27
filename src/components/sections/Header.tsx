'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cva } from 'cva';

import { routes } from '@routes';
import { LogoIcon } from '../LogoIcon';
import { Button, Icon, Select, Text } from '../base';
import { usePathname, useRouter } from 'next/navigation';

const variants = cva('', {
  variants: {
    style: {
      light: '!text-white',
      dark: '!text-black',
    },
  },
  defaultVariants: {
    style: 'light',
  },
});

const verifyPathSelect = (href: any, currentPath: any) => {
  return href === '/' ? currentPath === '/' : currentPath.startsWith(href);
};

const HeaderTopic = ({
  label,
  currentPath = '',
  href,
}: {
  label: string;
  currentPath: string;
  href: string;
}) => {
  const selected = verifyPathSelect(href, currentPath);
  return (
    <Link target="_blank" href={href}>
      <Text size={'L2'} className={selected ? 'font-bold' : ''}>
        {label}
      </Text>
    </Link>
  );
};

export const Header = ({ style }: { style?: 'light' | 'dark' }) => {
  const classes = variants({ style });
  const logoType = style === 'light' ? 'white' : 'orange';
  const iconColor = style === 'light' ? 'text-white' : 'text-black';

  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscKeyPress = (e: any) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty('overflow', 'hidden');
    } else {
      document.body.style.removeProperty('overflow');
    }

    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="hidden xl:block ">
        <ul className="flex">
          <li>
            <Link href={'/'}>
              <LogoIcon type={logoType} />
            </Link>
          </li>
          <li className={`ml-auto self-center mr-5 ${classes}`}>
            <HeaderTopic label="HOME" href={routes.home} currentPath={pathname} />
          </li>
          <li className={`flex self-center ${classes} mr-5 inline justify-center items-center`}>
            <Select
              className="p-0"
              placeholder="CONSULTAS"
              staticOptions
              sizeInsideText="L2"
              biggerList
              options={[
                { value: routes.consult, label: 'CRUZAMENTOS' },
                { value: routes.projections, label: 'ÍNDICES' },
                { value: routes.candidates, label: 'PERFIL DOS CANDIDATOS' },
              ]}
              onSelect={(myValue, _) => {
                router.push(myValue as string);
                router.refresh();
              }}
              buttonProps={{
                size: 'small',
                style: 'ghostBlack',
                className: `${classes} ${verifyPathSelect(routes.consult, pathname) ? '!font-bold' : ''} hover:!bg-transparent font-b2 !p-0`,
              }}
              suffixComponent={<Icon type="ArrowDown" size="xs" className={`ml-1 ${iconColor}`} />}
            />
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <HeaderTopic label="SOBRE O PROJETO" href={routes.about} currentPath={pathname} />
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <HeaderTopic label="BLOG" href={routes.blog} currentPath={pathname} />
          </li>
          <li className={`self-center ${classes}`}>
            <Link target="_blank" href={routes.elections2024}>
              <Button text="ELEIÇÕES 2024" style="fillBlack" />
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="flex w-full items-center h-16 z-10 xl:hidden pb-10 pt-10">
        <div className="flex items-center w-full justify-between">
          <Link href={'/'}>
            <LogoIcon type={style === 'light' ? 'white' : 'orange'} />
          </Link>
          <button className={`${classes}`} aria-label="Open Menu" onClick={handleDrawer}>
            <Icon type="Menu" size="2x" />
          </button>
        </div>

        {isOpen && (
          <div className="z-10 fixed inset-0 transition-opacity">
            <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black opacity-50" />
          </div>
        )}

        <aside
          className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <span className="flex w-full items-center p-4 border-b">
            <LogoIcon type={'orange'} />
          </span>
          <ul className="text-black flex flex-col justify-start pl-4 gap-3">
            <li className={`mt-12`}>
              <HeaderTopic label="HOME" href={routes.home} currentPath={pathname} />
            </li>
            <li className={`flex `}>
              <HeaderTopic label="CONSULTAS" href={routes.consult} currentPath={pathname} />
            </li>

            <ul className="text-black flex flex-col justify-start pl-4 gap-2">
              <li>
                <HeaderTopic label="CRUZAMENTOS" href={routes.consult} currentPath={pathname} />
              </li>
              <li>
                <HeaderTopic label="ÍNDICES" href={routes.projections} currentPath={pathname} />
              </li>
              <li>
                <HeaderTopic label="PERFIL DOS CANDIDATOS" href={routes.candidates} currentPath={pathname} />
              </li>
            </ul>

            <li>
              <HeaderTopic label="SOBRE O PROJETO" href={routes.about} currentPath={pathname} />
            </li>
            <li>
              <HeaderTopic label="BLOG" href={routes.blog} currentPath={pathname} />
            </li>
            <li>
              <Link target="_blank" href={routes.elections2024}>
                <Button text="ELEIÇÕES 2024" style="fillBlack" />
              </Link>
            </li>
          </ul>
        </aside>
      </nav>
    </>
  );
};
