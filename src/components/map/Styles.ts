import { FeatureLike } from 'ol/Feature';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

function _getColorByVotes(votes: number, isMultiState: boolean): string {
  if (votes === 0) {
    return 'rgba(255,255,255,0)';
  }

  if (isMultiState) {
    const colors = [
      'rgba(255,224,217,0.8)', // 0: 0-999
      'rgba(255,210,200,0.8)', // 1: 1.000-4.999
      'rgba(255,190,170,0.8)', // 2: 5.000-9.999
      'rgba(255,170,140,0.8)', // 3: 10.000-19.999
      'rgba(255,148,109,0.8)', // 4: 20.000-49.999
      'rgba(255,120,80,0.8)', // 5: 50.000-99.999
      'rgba(255,102,58,0.8)', // 6: 100.000-199.999
      'rgba(245,85,40,0.8)', // 7: 200.000-299.999
      'rgba(235,88,47,0.8)', // 8: 300.000-499.999
      'rgba(200,70,30,0.8)', // 9: 500.000-749.999
      'rgba(180,60,25,0.8)', // 10: 750.000-999.999
      'rgba(160,50,20,0.8)', // 11: 1.000.000-1.999.999
      'rgba(140,40,15,0.8)', // 12: 2.000.000-2.999.999
      'rgba(120,30,10,0.8)', // 13: 3.000.000-4.999.999
      'rgba(80,20,5,0.8)', // 14: 5.000.000+
      'rgba(60,10,2,0.8)', // 15: 10.000.000+
    ];
    let idx = 0;
    switch (true) {
      case votes >= 10000000:
        idx = 15;
        break;
      case votes >= 5000000:
        idx = 14;
        break;
      case votes >= 3000000:
        idx = 13;
        break;
      case votes >= 2000000:
        idx = 12;
        break;
      case votes >= 1000000:
        idx = 11;
        break;
      case votes >= 750000:
        idx = 10;
        break;
      case votes >= 500000:
        idx = 9;
        break;
      case votes >= 300000:
        idx = 8;
        break;
      case votes >= 200000:
        idx = 7;
        break;
      case votes >= 100000:
        idx = 6;
        break;
      case votes >= 50000:
        idx = 5;
        break;
      case votes >= 20000:
        idx = 4;
        break;
      case votes >= 10000:
        idx = 3;
        break;
      case votes >= 5000:
        idx = 2;
        break;
      case votes >= 1000:
        idx = 1;
        break;
      default:
        idx = 0;
    }
    return colors[idx];
  }

  const colors = [
    'rgba(255,224,217,0.8)', // 0: 0-999
    'rgba(255,148,109,0.8)', // 1: 1.000-9.999
    'rgba(255,102,58,0.8)', // 2: 10.000-29.999
    'rgba(245,85,40,0.8)', // 3: 30.000-49.999
    'rgba(235,88,47,0.8)', // 4: 50.000-99.999
    'rgba(160,50,20,0.8)', // 5: 100.000+
    'rgba(120,30,10,0.8)', // 6: 200.000+
  ];

  let idx = 0;
  switch (true) {
    case votes >= 200000:
      idx = 6;
      break;
    case votes >= 100000:
      idx = 5;
      break;
    case votes >= 50000:
      idx = 4;
      break;
    case votes >= 30000:
      idx = 3;
      break;
    case votes >= 10000:
      idx = 2;
      break;
    case votes >= 1000:
      idx = 1;
      break;
    default:
      idx = 0;
  }

  return colors[idx];
}

export const LastElectionStyle = (feature: FeatureLike, _: number) => {
  const votes = feature.get('votes');
  const isMultiState = feature.get('isMultiState');
  return new Style({
    fill: new Fill({
      color: _getColorByVotes(votes || 0, isMultiState || false),
    }),
    stroke: new Stroke({
      color: '#ED7451',
      width: 1,
    }),
  });
};

export const LastCityElectionStyle = (feature: FeatureLike, _: number) => {
  const votes = feature.get('votes');
  const isMultiState = feature.get('isMultiState');
  return new Style({
    fill: new Fill({
      color: _getColorByVotes(votes || 0, isMultiState || false),
    }),
    stroke: new Stroke({
      color: votes ? '#ED7451' : `rgba(0, 0, 0, 0)`,
      width: 1,
    }),
  });
};

export const createSeriesStyle = (values: number[]) => {
  const min = values.reduce((r, v) => Math.min(r, v), Infinity);
  const max = values.reduce((r, v) => Math.max(r, v), -Infinity);

  return values.map(v => (_feature: FeatureLike, _: number) => {
    const opacity = 0.2 + ((v - min) * (0.9 - 0.2)) / (max - min || 1);

    return new Style({
      fill: new Fill({
        color: `rgba(243, 162, 139, ${opacity})`,
      }),
      stroke: new Stroke({
        color: '#ED7451',
        width: 1,
      }),
    });
  });
};

export const SeriesMapStyle = (_feature: FeatureLike, _: number) => {
  return new Style({
    fill: new Fill({
      color: `rgba(243, 162, 139, 0.8)`,
    }),
    stroke: new Stroke({
      color: '#ED7451',
      width: 1,
    }),
  });
};
