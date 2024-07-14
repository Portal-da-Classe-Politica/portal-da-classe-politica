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

import { FeatureStyle } from './Styles';
import { getCenter } from 'ol/extent';
import { Tooltip } from './Tooltip';

export interface MapComponentProps {
  state: string;
  candidateId: string | number;
}

export const MapComponent = ({ state, candidateId }: MapComponentProps) => {
  const mapRef = useRef<Map | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);

  const tooltipContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipOverlayRef = useRef<Overlay | null>(null);

  const [tooltipProperties, setTooltipProperties] = useState<any>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    if (mapElement.current && !mapRef.current) {
      const featureLayers = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: `/api/map?state=${state}&candidateId=${candidateId}`,
        }),
        style: FeatureStyle,
        visible: true,
      });

      mapRef.current = new Map({
        target: mapElement.current,
        view: new View({
          projection: 'EPSG:4326',
          center: [-51.9253, -14.235],
          zoom: 5,
        }),
        layers: [new TileLayer({ source: new OSM() }), featureLayers],
      });

      mapRef.current.once('loadend', () => {
        const view = mapRef.current?.getView();
        const ext = featureLayers.getSource()?.getExtent();
        if (view && ext) {
          view.animate({ center: getCenter(ext), duration: 2000, zoom: 7 });
        }
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
            const { geometry: _geometry, ...properties } = feature.getProperties();
            setTooltipProperties(properties);
            setTooltipVisible(true);
            tooltipOverlayRef.current!.setPosition(event.coordinate);
          } else {
            setTooltipVisible(false);
            tooltipOverlayRef.current!.setPosition(undefined);
          }
        });
      }
    }
  }, [state, candidateId]);

  const tooltipPortal = tooltipVisible && tooltipProperties ? <Tooltip {...tooltipProperties} /> : null;

  return (
    <>
      <div ref={mapElement} style={{ width: '100%', height: '80vh' }} />
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

export default MapComponent;
