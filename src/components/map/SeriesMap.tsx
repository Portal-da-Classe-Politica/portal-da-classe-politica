'use client';

import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Overlay from 'ol/Overlay';

import { createSeriesStyle } from './Styles';
import { SeriesMapTooltip } from './SeriesMapTooltip';

export interface SeriesMapProps {
  series: { uf: string; value: string }[];
  label: string;
}

export const SeriesMap = ({ series, label }: SeriesMapProps) => {
  const mapRef = useRef<Map | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);

  const tooltipContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipOverlayRef = useRef<Overlay | null>(null);

  const [tooltipProperties, setTooltipProperties] = useState<any>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    if (mapElement.current && !mapRef.current) {
      const values = series.map(s => Number(s.value ?? 0));
      const styles = createSeriesStyle(values);

      const featureLayers = series.map((serie, idx) => {
        return new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON(),
            url: `/api/map/${serie.uf}`,
          }),
          style: styles[idx],
          visible: true,
        });
      });

      mapRef.current = new Map({
        target: mapElement.current,
        view: new View({
          projection: 'EPSG:4326',
          center: [-51.9253, -14.235],
          zoom: 4,
        }),
        layers: [new TileLayer({ source: new OSM() }), ...featureLayers],
      });

      // Create tooltip overlay
      if (tooltipContainerRef.current) {
        tooltipOverlayRef.current = new Overlay({
          element: tooltipContainerRef.current,
          offset: [10, 0],
          positioning: 'bottom-center',
          stopEvent: false,
          insertFirst: false,
        });

        mapRef.current.addOverlay(tooltipOverlayRef.current);

        // Mouse move event to display tooltip
        mapRef.current.on('pointermove', event => {
          const feature = mapRef.current!.forEachFeatureAtPixel(event.pixel, feature => feature);
          if (feature) {
            const id = feature.getId();
            const { geometry: _geometry } = feature.getProperties();

            const value = series.find(serie => serie.uf === id)?.value ?? 0;

            setTooltipProperties({ id, label, value });
            setTooltipVisible(true);
            tooltipOverlayRef.current!.setPosition(event.coordinate);
          } else {
            setTooltipVisible(false);
            tooltipOverlayRef.current!.setPosition(undefined);
          }
        });
      }
    }
  }, [series, label]);

  const tooltipPortal =
    tooltipVisible && tooltipProperties ? <SeriesMapTooltip {...tooltipProperties} /> : null;

  return (
    <>
      <div ref={mapElement} className="flex flex-1" />
      {tooltipPortal &&
        tooltipContainerRef.current &&
        createPortal(tooltipPortal, tooltipContainerRef.current)}
      <div
        ref={tooltipContainerRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}
      />
    </>
  );
};

export default SeriesMap;
