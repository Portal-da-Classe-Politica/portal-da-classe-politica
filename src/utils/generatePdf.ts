import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdf = (id: string) => {
  const input = document.getElementById(id);
  if (!input) {
    return;
  }

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
