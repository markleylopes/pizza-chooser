import PropTypes from "prop-types";
import { Card, Row, Col, Typography, Badge } from "antd";
import PizzaCardImage from "assets/pizza-card.jpg";

const { Title, Paragraph, Text } = Typography;

const PizzaCard = ({
  edge,
  size,
  price,
  dough,
  points,
  onClick,
  topping,
  loading,
  isSelected,
  ingredients,
}) => (
  <>
    <Badge.Ribbon text={`${points} pontos`}>
      <Card
        onClick={onClick}
        hoverable
        loading={loading}
        style={{
          height: 320,
          borderRadius: 10,
          border: isSelected ? "solid 2px #0eaa0e" : "",
        }}
        bodyStyle={{ padding: 20 }}
      >
        <Row glutter={10} style={{ paddingBottom: 10 }}>
          <Col>
            <Text strong type="secondary">
              Pizza do dia
            </Text>
          </Col>
        </Row>
        <Row>
          <Col flex="200px">
            <img
              width={200}
              alt="example"
              style={{ borderRadius: 10 }}
              src={PizzaCardImage}
            />
          </Col>
          <Col flex="auto" style={{ paddingLeft: 20, fontSize: 10 }}>
            <Title level={5}>
              {topping} - {size}
            </Title>
            <Paragraph>
              <Title level={5} type="secondary">
                Massa
              </Title>
              <Text>{dough}</Text>
            </Paragraph>
            <Paragraph>
              <Title level={5} type="secondary">
                Borda
              </Title>
              <Text>{edge}</Text>
            </Paragraph>
            <Paragraph>
              <Title level={5} type="secondary">
                Ingredientes
              </Title>
              <Text>{ingredients.join(", ")}</Text>
            </Paragraph>
            <Paragraph>
              <Text strong type="success" style={{ fontSize: 20 }}>
                R$ {price}
              </Text>
            </Paragraph>
          </Col>
        </Row>
      </Card>
    </Badge.Ribbon>
  </>
);

PizzaCard.propTypes = {
  topping: PropTypes.string,
  edge: PropTypes.string,
  size: PropTypes.string,
  dough: PropTypes.string,
  price: PropTypes.number,
  isSelected: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  points: PropTypes.number,
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

PizzaCard.defaultProps = {
  dough: "",
  edge: "",
  topping: "",
  loading: false,
  isSelected: false,
  size: "",
  onClick: () => false,
  price: 0,
  points: 0,
  ingredients: [],
};

export default PizzaCard;
