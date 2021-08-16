import PropTypes from "prop-types";
import { Row, Col, Typography } from "antd";
import pizzaImage from "assets/pizza.png";
import coin from "assets/coin.png";

const { Text, Title } = Typography;

const styles = {
  root: { padding: 10 },
  logo: {
    display: "inline-block",
    lineHeight: 0,
    alignSelf: "start",
  },
  logoTextContainer: {
    display: "inline-block",
    lineHeight: 0,
  },
  logoTextFlexContainer: {
    display: "flex",
    flexFlow: "column",
  },
  logoText: { margin: 10, color: "white", lineHeight: 0 },
  flex: {
    display: "flex",
  },
  flexEnd: {
    display: "flex",
    justifyContent: "end",
  },
};

const MainHeader = ({ points = 0 }) => (
  <Row style={styles.root}>
    <Col span={12} style={styles.flex}>
      <img width="40px" src={pizzaImage} alt="Logo" style={styles.logo} />
      <div style={styles.logoTextContainer}>
        <div style={styles.logoTextFlexContainer}>
          <Title strong type="secondary" level={4} style={styles.logoText}>
            PizzaChooser
          </Title>
          <Text style={styles.logoText}>é pizza, sim</Text>
        </div>
      </div>
    </Col>
    <Col span={12} style={styles.flexEnd}>
      <img width="40px" src={coin} alt="Logo" style={styles.logo} />
      <div style={styles.logoTextContainer}>
        <div style={styles.logoTextFlexContainer}>
          <Text strong style={styles.logoText}>
            ChooserPoints
          </Text>
          <Text style={styles.logoText}>{`${points} pontos`}</Text>
        </div>
      </div>
    </Col>
  </Row>
);

MainHeader.propTypes = {
  points: PropTypes.number.isRequired,
};
export default MainHeader;
