import React, { useEffect, useState } from 'react'
import 'ol/ol.css';
import GPX from 'ol/format/GPX';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import Attribution from 'ol/control/Attribution';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

const DisplayMapWithRoute = (props) => {
    const { zoom, url, centerCoordinates, images, displayImagesOnMap } = props;
    const [mapObject, setMapObject] = useState(null);

    useEffect(() => {



        const attributions =
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

        const raster = new TileLayer({
            source: new XYZ({
                attributions: attributions,
                url: 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=zqQIfCZhtqUzH8SuoWR1',
            }),
        });

        const style = {
            'MultiLineString': new Style({
                stroke: new Stroke({
                    color: '#FF0000',
                    width: 3,
                }),
            }),
        };

        const vector = new VectorLayer({
            source: new VectorSource({
                attributions: attributions,
                url: url,
                format: new GPX(),
            }),
            style: function (feature) {
                return style[feature.getGeometry().getType()];
            },
        });



        setMapObject(new Map({
            target: 'map',
            layers: [raster, vector],
            view: new View({
                center: fromLonLat(centerCoordinates),
                zoom: zoom,
            }),
        }));
    }, []);

    useEffect(() => {
        if (mapObject === null) { return }
        if (images) {
            const layers = [...mapObject.getLayers().getArray()]
            if (layers.length > 2) {
                
                layers.shift();
                layers.shift();
                layers.forEach((layer) => mapObject.removeLayer(layer));
            }

            if (displayImagesOnMap) {
                images.forEach((image) => {
                    if (image.lat == '') { return }

                    const iconFeature = new Feature({
                        geometry: new Point(fromLonLat([image.lon, image.lat])),
                
                    });

                    const iconStyle = new Style({
                        image: new Icon({
                            anchor: [100, 46],
                            anchorXUnits: 'pixels',
                            anchorYUnits: 'pixels',
                            scale: 0.1,
                            src: '/public/img/' + image.img_url,
                        }),
                    });

                    iconFeature.setStyle(iconStyle);

                    const vectorSource = new VectorSource({
                        features: [iconFeature],
                    });

                    const vectorLayer = new VectorLayer({
                        source: vectorSource,
                    });

                    mapObject.addLayer(vectorLayer);

                });
            }
        }
        mapObject.on('click', (e) => {
            console.log(e.coordinate);
        });

    }, [displayImagesOnMap, mapObject]);


    return (
        <div id="map" className="map"></div>
    )
}

export default DisplayMapWithRoute;