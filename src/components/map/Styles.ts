import { FeatureLike } from 'ol/Feature';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

export const LastElectionStyle = (feature: FeatureLike, _: number) => {
  const votes = feature.get('votes');
  return new Style({
    fill: new Fill({
      color: `rgba(243, 162, 139, ${votes ? '0.9' : '0'})`,
    }),
    stroke: new Stroke({
      color: '#ED7451',
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
