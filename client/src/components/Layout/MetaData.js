import { HelmetProvider, Helmet } from "react-helmet-async";

function MetaData({ title }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
}

export default MetaData;
