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
    <Text size={'L2'} className={selected ? 'font-bold' : ''}>
      {label}
    </Text>
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
            <LogoIcon type={logoType} />
          </li>
          <li className={`ml-auto self-center mr-5 ${classes}`}>
            <Link href={routes.home}>
              <HeaderTopic label="PÁGINA INICIAL" href={routes.home} currentPath={pathname} />
            </Link>
          </li>
          <li className={`flex self-center ${classes} mr-5 inline justify-center items-center`}>
            {/* <HeaderTopic label="CONSULTAS" href={routes.consult} currentPath={pathname} /> */}
            <Select
              className="p-0"
              placeholder="CONSULTA"
              staticOptions
              options={[
                { value: routes.consultCandidateProfile, label: 'Perfil dos Candidatos' },
                { value: routes.consultElectionResult, label: 'Resultados das Eleições' },
                { value: routes.consultPartyFiliation, label: 'Filiação Partidária' },
                { value: routes.consultFinancing, label: 'Financiamento de Campanha' },
                { value: routes.consultElectoralMaps, label: 'Mapas Eleitorais' },
                { value: routes.consultElectoralResearch, label: 'Pesquisas Eleitorais' },
              ]}
              onSelect={(myValue, _) => {
                router.push(myValue as string);
                router.refresh();
              }}
              buttonProps={{
                size: 'small',
                style: 'ghostBlack',
                className: `${classes} ${verifyPathSelect(routes.consult, pathname) ? '!font-bold' : ''} hover:!bg-transparent`,
              }}
              suffixComponent={<Icon type="ArrowDown" size="xs" className={`ml-1 ${iconColor}`} />}
            />
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <Link href={routes.projections}>
              <HeaderTopic label="PROJEÇÕES" href={routes.projections} currentPath={pathname} />
            </Link>
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <Link href={routes.candidates}>
              <HeaderTopic label="PERFIL DOS CANDIDATOS" href={routes.candidates} currentPath={pathname} />
            </Link>
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <Link href={routes.about}>
              <HeaderTopic label="SOBRE O PROJETO" href={routes.about} currentPath={pathname} />
            </Link>
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <Link href={routes.blog}>
              <HeaderTopic label="BLOG" href={routes.blog} currentPath={pathname} />
            </Link>
          </li>
          <li className={`self-center ${classes}`}>
            <Link href={routes.elections2024}>
              <Button text="ELEIÇÕES 2024" style="fillBlack" />
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="flex w-full items-center h-16 z-10 xl:hidden pb-10 pt-10">
        <div className="flex items-center w-full justify-between">
          <LogoIcon type={style === 'light' ? 'white' : 'orange'} />
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
            <li className={`mt-12 mr-5`}>
              <Link href={routes.home}>
                <HeaderTopic label="PÁGINA INICIAL" href={routes.home} currentPath={pathname} />
              </Link>
            </li>
            <li className={`flex `}>
              <Link href={routes.consult}>
                <HeaderTopic label="CONSULTAS" href={routes.consult} currentPath={pathname} />
              </Link>
              <Icon type="ArrowDown" size="sm" className="ml-1" />
            </li>
            <li className={`self-start mr-5`}>
              <Link href={routes.projections}>
                <HeaderTopic label="PROJEÇÕES" href={routes.projections} currentPath={pathname} />
              </Link>
            </li>
            <li className={`mr-5`}>
              <Link href={routes.candidates}>
                <HeaderTopic label="PERFIL DOS CANDIDATOS" href={routes.candidates} currentPath={pathname} />
              </Link>
            </li>
            <li className={`mr-5`}>
              <Link href={routes.about}>
                <HeaderTopic label="SOBRE O PROJETO" href={routes.about} currentPath={pathname} />
              </Link>
            </li>
            <li className={`mr-5`}>
              <Link href={routes.blog}>
                <HeaderTopic label="BLOG" href={routes.blog} currentPath={pathname} />
              </Link>
            </li>
            <li>
              <Link href={routes.elections2024}>
                <Button text="ELEIÇÕES 2024" style="fillBlack" />
              </Link>
            </li>
          </ul>
        </aside>
      </nav>
    </>
  );
};
