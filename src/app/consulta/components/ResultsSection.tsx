import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Icon } from '@base/Icon';
import { ButtonStyled } from '@base/buttons';

import { ConsultResultDisplay } from '@components/consult/ConsultResultDisplay';

export const ResultsSection = ({ results }: { results: any[] }) => {
  const saveToPdf = () => {
    const input = document.getElementById('capture')!;
    html2canvas(input, {
      scale: 2,
      useCORS: true,
    }).then((canvas: any) => {
      const imgData: HTMLImageElement = canvas.toDataURL('image/jpeg', 0.7);
      const pdf = new jsPDF('p', 'px', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const scaleFactor = pageWidth / imgWidth;
      const scaledImgWidth = imgWidth * scaleFactor;
      const scaledImgHeight = imgHeight * scaleFactor;

      const totalPages = Math.ceil(scaledImgHeight / pageHeight);

      for (let i = 0; i < totalPages; i++) {
        const yOffset = -i * pageHeight;

        pdf.addImage(imgData, 'JPEG', 0, yOffset, scaledImgWidth, scaledImgHeight);

        if (i < totalPages - 1) {
          pdf.addPage();
        }
      }
      pdf.save('Consulta.pdf');
    });
  };

  return (
    <>
      {results.map((result, idx) => (
        <ConsultResultDisplay key={idx} result={result} className="mt-12" />
      ))}

      {results.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-16 mb-8 md:mb-16">
          <ButtonStyled onClick={() => saveToPdf()}>
            <>
              <Icon type="Download" className="mx-2" size="xl" />
              Baixar Cruzamentos em .PDF
            </>
          </ButtonStyled>
        </div>
      )}
    </>
  );
};
