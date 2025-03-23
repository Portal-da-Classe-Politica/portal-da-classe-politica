'use client';

import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Map from 'ol/Map';
import View from 'ol/View';
import { createEmpty, isEmpty, extend } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';

import { LastElectionStyle } from './Styles';
import { LastElectionMapTooltip } from './LastElectionMapTooltip';

export const LastElectionMap = ({
  votesByState,
  candidateId,
}: {
  votesByState: Record<string, any>;
  candidateId: string;
}) => {
  const mapRef = useRef<Map | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);

  const tooltipContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipOverlayRef = useRef<Overlay | null>(null);

  const [tooltipProperties, setTooltipProperties] = useState<any>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    if (votesByState && mapElement.current && !mapRef.current) {
      const featureLayers: any[] = [];
      for (const stateVotes of Object.values(votesByState)) {
        const stateLayer = new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON(),
            url: `/api/map/${stateVotes.uf}`,
          }),
          maxZoom: 7,
          style: LastElectionStyle,
          visible: true,
        });
        stateLayer.getSource()?.on('featuresloadend', event => {
          const source = event.target;
          source.getFeatures().forEach((feature: Feature) => {
            feature.set('votes', stateVotes.total);
            feature.set('name', stateVotes.uf);
          });
        });

        const citiesLayer = new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON(),
            url: `/api/map/${stateVotes.uf}/cities`,
          }),
          style: LastElectionStyle,
          minZoom: 7,
          visible: true,
        });
        citiesLayer.getSource()?.on('featuresloadend', event => {
          const source = event.target;
          source.getFeatures().forEach((feature: Feature) => {
            const properties = feature.getProperties();

            const cityVotes = stateVotes.votes.find((v: any) => {
              return v.codigo_ibge === properties.id;
            });

            feature.set('name', String(cityVotes?.municipio || properties.name || '-').toLowerCase());
            feature.set('votes', cityVotes?.votos ?? 0);
            feature.set('id', cityVotes?.codigo_ibge ?? '');
          });
        });

        featureLayers.push(stateLayer, citiesLayer);
      }

      mapRef.current = new Map({
        target: mapElement.current,
        view: new View({
          projection: 'EPSG:4326',
          center: [-51.9253, -14.235],
          zoom: 5,
          minZoom: 4,
        }),
        layers: [new TileLayer({ source: new OSM() }), ...featureLayers],
      });

      mapRef.current.once('loadend', () => {
        let extent = createEmpty();

        featureLayers.forEach((layer: any) => {
          if (layer instanceof VectorLayer) {
            const source = layer.getSource();
            if (source) {
              const layerExtent = source.getExtent();
              if (!isEmpty(layerExtent)) {
                extend(extent, layerExtent); // Merge extents
              }
            }
          }
        });

        if (!isEmpty(extent)) {
          mapRef.current?.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 1000 });
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
  }, [votesByState, candidateId]);

  const tooltipPortal =
    tooltipVisible && tooltipProperties ? <LastElectionMapTooltip {...tooltipProperties} /> : null;

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

export default LastElectionMap;
