import { VotesByState } from './LastElectionMapSection';

const ThermalScale = ({ votesByState }: { votesByState: Record<string, VotesByState> }) => {
  const isMultiState = Object.keys(votesByState).length > 1;

  const formatNumber = (value: number): string => {
    if (value >= 1_000_000) {
      return `${Math.round(value / 1_000_000)}M`;
    } else if (value >= 1_000) {
      return `${Math.round(value / 1_000)}k`;
    }
    return Math.round(value).toString();
  };

  return (
    <div className="relative flex items-center justify-between gap-2 md:flex-col w-full md:w-[30px]">
      <span className="text-l font-bold text-grayMix4">
        {isMultiState ? formatNumber(10000000) : formatNumber(500000)}+
      </span>
      <div className="term-container h-[30px] w-full border rounded-md md:w-[30px] md:h-[400px] relative">
        {isMultiState ? (
          <>
            <span className="absolute md:top-[12%] top-[30px] md:left-[35px] left-[12%] text-xs text-grayMix4">
              {formatNumber(1000000)}
            </span>
            <span className="absolute md:top-[30%] top-[30px] md:left-[35px] left-[30%] text-xs text-grayMix4">
              {formatNumber(500000)}
            </span>
            <span className="absolute md:top-[50%] top-[30px] md:left-[35px] left-[50%] text-xs text-grayMix4">
              {formatNumber(100000)}
            </span>
            <span className="absolute md:top-[70%] top-[30px] md:left-[35px] left-[70%] text-xs text-grayMix4">
              {formatNumber(50000)}
            </span>
            <span className="absolute md:top-[87%] top-[30px] md:left-[35px] left-[87%] text-xs text-grayMix4">
              {formatNumber(10000)}
            </span>
          </>
        ) : (
          <>
            <span className="absolute md:top-[12%] top-[30px] md:left-[35px] left-[12%] text-xs text-grayMix4">
              {formatNumber(100000)}
            </span>
            <span className="absolute md:top-[30%] top-[30px] md:left-[35px] left-[30%] text-xs text-grayMix4">
              {formatNumber(50000)}
            </span>
            <span className="absolute md:top-[50%] top-[30px] md:left-[35px] left-[50%] text-xs text-grayMix4">
              {formatNumber(20000)}
            </span>
            <span className="absolute md:top-[70%] top-[30px] md:left-[35px] left-[70%] text-xs text-grayMix4">
              {formatNumber(5000)}
            </span>
            <span className="absolute md:top-[87%] top-[30px] md:left-[35px] left-[87%] text-xs text-grayMix4">
              {formatNumber(1000)}
            </span>
          </>
        )}
      </div>
      <span className="text-l font-bold text-grayMix4">0</span>
    </div>
  );
};

export default ThermalScale;
