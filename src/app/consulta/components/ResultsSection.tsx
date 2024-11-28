import { Icon } from '@base/Icon';
import { ButtonStyled } from '@base/buttons';

import { ConsultResultDisplay } from '@components/consult/ConsultResultDisplay';
import { generatePdf } from '@utils/generatePdf';

export const ResultsSection = ({ results, pdfId }: { results: any[]; pdfId: string }) => {
  return (
    <>
      <div id="pdf-render">
        {results.map((result, idx) => (
          <ConsultResultDisplay key={idx} result={result} className="mt-12" />
        ))}
      </div>

      {results.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-16 mb-8 md:mb-16">
          <ButtonStyled onClick={() => generatePdf(pdfId)}>
            <Icon type="Download" className="mx-2" size="xl" />
            Baixar Cruzamentos em .PDF
          </ButtonStyled>
        </div>
      )}
    </>
  );
};
