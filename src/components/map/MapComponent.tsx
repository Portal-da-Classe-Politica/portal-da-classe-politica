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
import { transform } from 'ol/proj';

import GeoJsonAcre from './geojson/acre.json';
import GeoJsonBahia from './geojson/bahia.json';

export const MapComponent: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);

  const tooltipContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipOverlayRef = useRef<Overlay | null>(null);

  const [tooltipProperties, setTooltipProperties] = useState<any | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    if (mapElement.current && !mapRef.current) {
      mapRef.current = new Map({
        target: mapElement.current,
        view: new View({
          projection: 'EPSG:4326',
          center: transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
          zoom: 2,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: new GeoJSON().readFeatures(GeoJsonAcre),
            }),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: new GeoJSON().readFeatures(GeoJsonBahia),
            }),
          }),
        ],
      });

      // Create tooltip overlay
      if (mapRef.current && tooltipContainerRef.current) {
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
  }, []);

  const tooltipPortal =
    tooltipVisible && tooltipProperties ? <h1>{JSON.stringify(tooltipProperties)}</h1> : null;

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
