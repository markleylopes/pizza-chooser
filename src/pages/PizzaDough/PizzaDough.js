import { Row, Col, Typography } from "antd";
import React, { useContext } from "react";
import StepButtons from "components/StepButtons";
import PizzaContext from "contexts/pizzaform";
import RadioCardGroup from "components/RadioCardGroup";
import { useHistory } from "react-router-dom";
import { getDoughs } from "api";

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

const PizzaDough = () => {
  const history = useHistory();
  const pizzaContext = useContext(PizzaContext);
  const [doughs, setDoughs] = React.useState([{ value: "" }]);
  const [loading, setLoading] = React.useState(true);
  const { currentPizza } = pizzaContext;

  React.useEffect(() => {
    getDoughs()
      .then((data) => {
        setDoughs(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Row style={styles.root} justify="center" data-testid="pizza-dough">
        <Col xs={24} sm={20} md={16} lg={12} xl={12}>
          <Text strong style={{ margin: 10 }}>
            Selecione um item para prosseguir
          </Text>
          <RadioCardGroup
            loading={loading}
            items={doughs}
            value={currentPizza.dough}
            onChange={({ target }) =>
              pizzaContext.changePizzaItem({ dough: target.value })
            }
          />
        </Col>
      </Row>
      <Row style={styles.root} justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={12} style={styles.cardInfo}>
          <StepButtons
            onNext={() => {
              history.push("/borda");
              pizzaContext.nextStep();
            }}
            disabled={!currentPizza.dough}
            onPrevious={() => {
              history.push("/tamanho");
              pizzaContext.previousStep();
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default PizzaDough;
