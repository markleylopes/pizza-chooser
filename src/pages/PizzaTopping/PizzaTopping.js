import { Row, Col, Typography } from "antd";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import PizzaContext from "contexts/pizzaform";
import StepButtons from "components/StepButtons";
import RadioCardGroup from "components/RadioCardGroup";
import { getToppings } from "api";

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

const PizzaTopping = () => {
  const history = useHistory();
  const pizzaContext = useContext(PizzaContext);
  const [toppings, setToppings] = React.useState([{ value: "" }]);

  const [loading, setLoading] = React.useState(true);
  const { currentPizza } = pizzaContext;

  React.useEffect(() => {
    getToppings()
      .then((data) => {
        setToppings(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Row style={styles.root} justify="center" data-testid="pizza-topping">
        <Col xs={24} sm={20} md={16} lg={12} xl={12}>
          <Text strong style={{ margin: 10 }}>
            Selecione um item para prosseguir
          </Text>
          <RadioCardGroup
            items={toppings}
            loading={loading}
            value={currentPizza.topping}
            onChange={({ target }) =>
              pizzaContext.changePizzaItem({ topping: target.value })
            }
          />
        </Col>
      </Row>
      <Row style={styles.root} justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={12} style={styles.cardInfo}>
          <StepButtons
            disabled={!currentPizza.topping}
            onNext={() => {
              pizzaContext.finishPizza();
              pizzaContext.setStep(0);
              history.push("/");
            }}
            nextTitle="Finalizar"
            onPrevious={() => {
              history.push("/borda");

              pizzaContext.previousStep();
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default PizzaTopping;
