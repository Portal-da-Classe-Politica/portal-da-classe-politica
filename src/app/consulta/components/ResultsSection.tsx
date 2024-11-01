import { BarChartCard } from '@components/charts/BarChartCard';
import { ButtonStyled } from '@base/buttons';
import { Icon } from '@base/Icon';
import { LineChartCard } from '@components/charts/LineChartCard';
import { DonutChartCard } from '@components/charts/DonutChartCard';
import { MapResultCard } from './MapResultCard';
import { KpiSection } from './KpiSecrtion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const ResultsSection = ({ results }: { results: any[] }) => {
  const saveToPdf = () => {
    console.log('what');

    const input = document.getElementById('capture')!;
    console.log('what');
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
      {results.map((result, idx) => {
        if (!result?.success || !result.data) {
          return null;
        }

        if (result.type === 'kpi') {
          return <KpiSection data={result.data} key={idx} />;
        }

        const data = result.data;
        switch (data.type) {
          case 'map': {
            return (
              <MapResultCard
                key={idx}
                className="mt-12"
                title={data.title}
                label={data.label}
                series={data.series}
              />
            );
          }
          case 'line': {
            return (
              <LineChartCard
                key={idx}
                className="mt-12"
                title={data.title}
                yAxisTitle={data.extraData.yAxisLabel}
                xAxisTitle={data.extraData.xAxisLabel}
                categories={data.xAxis}
                series={data.series}
              />
            );
          }
          case 'bar': {
            return (
              <BarChartCard
                key={idx}
                className="mt-12"
                title={data.title}
                categories={data.series.map(({ name }: any) => name)}
                series={[
                  {
                    name: data.seriesName,
                    data: data.series.map(({ value }: any) => value),
                  },
                ]}
                metaData={data?.extraData?.bigNumbers}
              />
            );
          }
          case 'donut': {
            return (
              <DonutChartCard
                key={idx}
                className="mt-12"
                title={data.title}
                labels={data.series.map(({ name }: any) => name)}
                series={data.series.map(({ value }: any) => value)}
                topics={data.extraData}
              />
            );
          }
          default:
            return <></>;
        }
      })}

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
