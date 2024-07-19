import React from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';

import { ButtonStyled, Icon, Loader, Text } from './base';
import { routes } from '@routes';

export interface TableStructure {
  headers: {
    title: string;
    key?: string;
    className?: string;
    render?: () => React.ReactNode;
  }[];
  cells: {
    key: string;
    className?: string;
    render?: (_value: any, _row: any) => React.ReactNode;
  }[];
}

const TableComponent = ({
  structure,
  loading,
  totalPages,
  currentPage,
  pageChange,
  values = [],
}: {
  structure: TableStructure;
  loading: boolean;
  totalPages: number;
  values: any[];
  currentPage: number;
  // eslint-disable-next-line
  pageChange: (page: number) => void;
}) => {
  return (
    <>
      <div className="container mx-auto p-8 hidden md:block bg-white shadow-xl rounded-lg">
        <div className="overflow-x-auto ">
          <table className="min-w-full">
            <thead>
              <tr className="w-full text-orange border-b-2 border-orange">
                {structure.headers.map((header, idx) =>
                  header.render ? (
                    header.render()
                  ) : (
                    <th key={idx} className={`text-left p-4 font-semibold ${header.className}`}>
                      {header.title}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={structure.headers.length} className="w-full p-16">
                    <div className="flex flex-1 justify-center align-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                values.map((value, idx) => (
                  <tr key={idx} className="border-b flex flex-col sm:table-row">
                    {structure.cells.map(cell => (
                      <td key={cell.key} className={`p-4 font-semibold ${cell.className}`}>
                        {cell.render ? cell.render(value, values[idx]) : value[cell.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {values.length > 0 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel={<Icon type="ArrowRight" />}
              onPageChange={e => {
                pageChange(e.selected + 1);
              }}
              forcePage={currentPage - 1}
              className="flex gap-2 text-orange place-items-center mt-4 justify-end"
              activeClassName={'font-bold'}
              pageClassName={'border border-orange rounded-full px-2'}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel={<Icon type="ArrowLeft" />}
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {loading && (
          <div className="flex flex-1 justify-center align-center md:hidden">
            <Loader />
          </div>
        )}
        {!loading &&
          values.map((value, idx) => {
            return (
              <div key={idx} className="w-full p-2  md:hidden bg-white shadow-xl rounded-lg flex-1">
                {structure.headers.map((sValue, index) => {
                  return (
                    <div className="text-left p-2 " key={index}>
                      <Text size="B1" className="font-bold">
                        {sValue.title}
                      </Text>
                      <Text size="B2"> {value[sValue.key ?? '']}</Text>
                    </div>
                  );
                })}
                <div className="p-2 text-center">
                  <Link href={routes.candidate(value.candidatoId)}>
                    <ButtonStyled size="small" style="fillOrange" className="w-[210px]">
                      <Text textType="span" size="L2">
                        MAIS INFORMAÇÕES
                      </Text>
                    </ButtonStyled>
                  </Link>
                </div>
              </div>
            );
          })}
        <div className="md:hidden">
          {values.length > 0 && (
            <div className="flex overflow-x-auto">
              <ReactPaginate
                breakLabel="..."
                nextLabel={<Icon type="ArrowRight" />}
                onPageChange={e => {
                  pageChange(e.selected + 1);
                }}
                forcePage={currentPage - 1}
                className="flex gap-2 text-orange place-items-center mt-4 justify-end"
                activeClassName={'font-bold'}
                pageClassName={'border border-orange rounded-full px-2'}
                pageRangeDisplayed={2}
                pageCount={totalPages}
                marginPagesDisplayed={1}
                previousLabel={<Icon type="ArrowLeft" />}
                renderOnZeroPageCount={null}
              />
            </div>
          )}
          {values.length === 0 && (
            <div className="text-center w-full">
              <Text>Nenhum dado encontrado.</Text>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TableComponent;
