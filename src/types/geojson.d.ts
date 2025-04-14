declare module "*.geojson" {
  const value: FeatureCollection<Point | MultiPoint, GeoJsonProperties>;
  export default value;
}