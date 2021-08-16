import { Row, Col, Typography } from "antd";
import React, { useContext } from "react";
import StepButtons from "components/StepButtons";
import PizzaContext from "contexts/pizzaform";
import RadioCardGroup from "components/RadioCardGroup";
import { useHistory } from "react-router-dom";
import { getSizes } from "api";

const { Text } = Typography;

const styles = {
  root: {
    padding: 10,
  },
  cardInfo: {
    display: "flex",
    justifyContent: "end",
  },
};

const PizzaSize = () => {
  const history = useHistory();
  const pizzaContext = useContext(PizzaContext);
  const [sizes, setSizes] = React.useState([{ value: "" }]);
  const [loading, setLoading] = React.useState(true);
  const { currentPizza } = pizzaContext;

  React.useEffect(() => {
    getSizes()
      .then((data) => {
        setSizes(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Row style={styles.root} justify="center" data-testid="pizza-size">
        <Col xs={24} sm={20} md={16} lg={12} xl={12}>
          <Text strong style={{ margin: 10 }}>
            Selecione um item para prosseguir
          </Text>
          <RadioCardGroup
            loading={loading}
            items={sizes}
            value={currentPizza.size}
            onChange={({ target }) =>
              pizzaContext.changePizzaItem({ size: target.value })
            }
          />
        </Col>
      </Row>
      <Row style={styles.root} justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={12} style={styles.cardInfo}>
          <StepButtons
            disabled={!currentPizza.size}
            onNext={() => {
              history.push("/massa");
              pizzaContext.nextStep();
            }}
            onPrevious={() => {
              history.push("/");
              pizzaContext.previousStep();
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default PizzaSize;
