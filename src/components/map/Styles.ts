import { FeatureLike } from 'ol/Feature';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

export const FeatureStyle = (feature: FeatureLike, _: number) => {
  const votes = feature.get('votes');

  return new Style({
    fill: new Fill({
      color: `rgba(243, 162, 139, ${votes ? 1 : 0})`,
    }),
    stroke: new Stroke({
      color: '#ED7451',
      width: 2,
    }),
  });
};
