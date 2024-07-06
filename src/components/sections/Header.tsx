'use client';
import { cva } from 'cva';
import React, { useEffect, useState } from 'react';
import { LogoIcon } from '../LogoIcon';
import { Button, Icon, IconAwesome, Text } from '../base';
import Link from 'next/link';

const routes = {
  home: '/',
  consult: '/consulta',
  consultList: [],
  projections: '/segunda-camada',
  candidates: '/perfil-candidato',
  about: '/sobre',
  blog: '/blog',
  elections2024: '/eleicao-2024',
};

const variants = cva('', {
  variants: {
    style: {
      light: 'text-white',
      dark: 'text-black',
    },
  },
  defaultVariants: {
    style: 'light',
  },
});

export const Header = ({ style }: { style?: 'light' | 'dark' }) => {
  const classes = variants({ style });
  const logoType = style === 'light' ? 'white' : 'orange';
  const iconColor = style === 'light' ? 'text-white' : 'text-black';

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
      <nav className="hidden xl:block overflow-hidden">
        <ul className="flex">
          <li>
            <LogoIcon type={logoType} />
          </li>
          <li className={`ml-auto self-center mr-5 ${classes}`}>
            <Link href={routes.home}>
              <Text textType="a" size={'L2'} className="font-bold">
                PÁGINA INICIAL
              </Text>
            </Link>
          </li>
          <li className={`flex self-center ${classes} mr-5 inline justify-center items-center`}>
            <Link href={routes.consult}>
              <Text textType="a" size={'L2'}>
                CONSULTAS
              </Text>
            </Link>
            <IconAwesome type="ArrowDown" size="xs" className={`ml-1 ${iconColor}`} />
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <Link href={routes.projections}>
              <Text textType="a" size={'L2'}>
                PROJEÇÕES
              </Text>
            </Link>
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <Link href={routes.candidates}>
              <Text textType="a" size={'L2'}>
                PERFIL DOS CANDIDATOS
              </Text>
            </Link>
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <Link href={routes.about}>
              <Text textType="a" size={'L2'}>
                SOBRE O PROJETO
              </Text>
            </Link>
          </li>
          <li className={`self-center ${classes} mr-5`}>
            <Link href={routes.blog}>
              <Text textType="a" size={'L2'}>
                BLOG
              </Text>
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
            <IconAwesome type="Menu" size="2x" />
          </button>
        </div>

        {isOpen && (
          <div className="z-10 fixed inset-0 transition-opacity">
            <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black opacity-50"></div>
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
            <li className={`ml-auto  mr-5 ${classes}`}>
              <Link href={routes.home}>
                <Text textType="a" size={'L2'} className="font-bold">
                  PÁGINA INICIAL
                </Text>
              </Link>
            </li>
            <li className={`flex `}>
              <Link href={routes.consult}>
                <Text textType="a" size={'L2'}>
                  CONSULTAS
                </Text>
              </Link>
              <Icon type="ArrowDown" size={16} className="ml-1" />
            </li>
            <li className={`self-start mr-5`}>
              <Link href={routes.projections}>
                <Text textType="a" size={'L2'}>
                  PROJEÇÕES
                </Text>
              </Link>
            </li>
            <li className={` mr-5`}>
              <Link href={routes.candidates}>
                <Text textType="a" size={'L2'}>
                  PERFIL DOS CANDIDATOS
                </Text>
              </Link>
            </li>
            <li className={` mr-5`}>
              <Link href={routes.about}>
                <Text textType="a" size={'L2'}>
                  SOBRE O PROJETO
                </Text>
              </Link>
            </li>
            <li className={` mr-5`}>
              <Link href={routes.blog}>
                <Text textType="a" size={'L2'}>
                  BLOG
                </Text>
              </Link>
            </li>
            <li className={``}>
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
