import PropTypes from "prop-types";
import { Radio, Card, Row, Col, Typography } from "antd";

const { Text } = Typography;

const RadioCardGroup = ({ items, value, onChange, loading }) => (
  <Radio.Group
    name="radiogroup"
    onChange={onChange}
    value={value}
    style={{ width: "100%" }}
  >
    {items.map((item) => (
      <Card loading={loading} key={item.value} style={{ borderRadius: 10 }}>
        <Row>
          <Col flex="auto">{item.value}</Col>
          <Col flex="10px">
            <Radio value={item.value} />
          </Col>
          {item.ingredients && (
            <Col span={24}>
              <Text style={{ fontSize: 10 }}>
                Ingredientes: {item.ingredients.join(", ")}
              </Text>
            </Col>
          )}
        </Row>
      </Card>
    ))}
  </Radio.Group>
);

RadioCardGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
RadioCardGroup.defaultProps = {
  loading: false,
};

export default RadioCardGroup;
