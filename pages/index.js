import React from "react";
import Head from "next/head";
import styled from "styled-components";

const TOKEN = "fbaae48b81b194957dd9a6e1eb7bedef2452a7d1";

export default function HomePage() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://api.waqi.info/feed/here/?token=${TOKEN}`)
      .then(res => res.json())
      .then(res => setData(res.data));
  }, []);

  if (data === null) {
    return null;
  }

  return (
    <>
      <Meta />
      <AqiCard data={data} />
      <AirComposition data={data} />
      <Attribution data={data} />
    </>
  );
}

function AqiCard({ data }) {
  const { city, aqi } = data;
  const { level, implications, gradients } = getAqiDetails(aqi);

  return (
    <Card>
      <AqiMetricContainer gradients={gradients}>
        <CityName>{city.name}</CityName>
        <AqiMetric>{aqi}</AqiMetric>
        <AqiLevelName>{level}</AqiLevelName>
      </AqiMetricContainer>
      <AqiHealthImplications>{implications}</AqiHealthImplications>
    </Card>
  );
}

function AirComposition({ data }) {
  return Object.keys(data.iaqi).map(key => {
    const value = data.iaqi[key].v;

    if (key === "pm25") {
      return (
        <AirCompositionItem>
          <SectionTitle>PM 2.5</SectionTitle>
          {value}
        </AirCompositionItem>
      );
    }

    if (key === "pm10") {
      return (
        <AirCompositionItem>
          <SectionTitle>PM 10</SectionTitle>
          {value}
        </AirCompositionItem>
      );
    }

    if (key === "o3") {
      return (
        <AirCompositionItem>
          <SectionTitle>
            O<sub>3</sub>
          </SectionTitle>
          {value}
        </AirCompositionItem>
      );
    }

    if (key === "so2") {
      return (
        <AirCompositionItem>
          <SectionTitle>
            SO<sub>2</sub>
          </SectionTitle>
          {value}
        </AirCompositionItem>
      );
    }

    if (key === "co") {
      return (
        <AirCompositionItem>
          <SectionTitle>CO</SectionTitle>
          {value}
        </AirCompositionItem>
      );
    }

    if (key === "no2") {
      return (
        <AirCompositionItem>
          <SectionTitle>
            NO<sub>2</sub>
          </SectionTitle>
          {value}
        </AirCompositionItem>
      );
    }
  });
}

function Attribution({ data }) {
  const list = data.attributions.map(attr => (
    <AttributionLink href={attr.url} target="_blank">
      {attr.name}
    </AttributionLink>
  ));

  return (
    <PaddedCard>
      <SectionTitle>Attribution</SectionTitle>
      {list}
    </PaddedCard>
  );
}

function getAqiDetails(aqiValue) {
  if (aqiValue >= 0 && aqiValue <= 50) {
    return {
      level: "Good",
      implications:
        "Air quality is considered satisfactory, and air pollution poses little or no risk.",
      gradients: ["#d4fc79", "#96e6a1"]
    };
  }

  if (aqiValue >= 51 && aqiValue <= 100) {
    return {
      level: "Moderate",
      implications:
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
      gradients: ["#fdfd96", "#f6d365"]
    };
  }

  if (aqiValue >= 101 && aqiValue <= 150) {
    return {
      level: "Unhealthy for Sensitive Groups",
      implications:
        "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
      gradients: ["#fee140", "#fda085"]
    };
  }

  if (aqiValue >= 151 && aqiValue <= 200) {
    return {
      level: "Unhealthy",
      implications:
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
      gradients: ["#ff0844", "#ffb199"]
    };
  }

  if (aqiValue >= 201 && aqiValue <= 300) {
    return {
      level: "Very Unhealthy",
      implications:
        "Health warnings of emergency conditions. The entire population is more likely to be affected.",
      gradients: ["#6a11cb", "#7028e4"]
    };
  }

  if (aqiValue >= 301) {
    return {
      level: "Hazardous",
      implications:
        "Health alert: everyone may experience more serious health effects",
      gradients: ["#874da2", "#c43a30"]
    };
  }
}

function Meta() {
  return (
    <div>
      <Head>
        <title>AirHealth</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-72x72.png"
          rel="icon"
          type="image/png"
          sizes="72x72"
        />
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png"></link>
      </Head>
    </div>
  );
}

const CityName = styled.div`
  color: white;
  font-size: 32px;
  line-height: 32px;
`;

const AqiMetric = styled.div`
  color: white;
  font-size: 150px;
  text-align: center;
`;

const AqiLevelName = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
`;

const AqiHealthImplications = styled.div`
  text-align: center;
  line-height: 24px;
  padding: 16px;
`;

const AttributionLink = styled.a`
  display: block;
  line-height: 24px;
  padding: 8px 0;
  word-break: keep-all;
`;

const SectionTitle = styled.a`
  font-family: Lato-Semibold, sans-serif;
  line-height: 24px;
`;

const Card = styled.div`
  background: white;
  margin: 16px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0px 22px 24px 0px rgba(46, 51, 51, 0.07);
  transition: box-shadow 100ms linear;

  &:hover {
    box-shadow: 5px 5px 20px 0px rgba(46, 51, 51, 0.07);
  }
`;

const AqiMetricContainer = styled.div`
  background-image: linear-gradient(
    45deg,
    ${props => props.gradients[0]} 0%,
    ${props => props.gradients[1]} 25%,
    ${props => props.gradients[0]} 75%,
    ${props => props.gradients[1]} 100%
  );
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  padding: 16px;
`;

const PaddedCard = styled(Card)`
  padding: 16px;
`;

const AirCompositionItem = styled(PaddedCard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;
