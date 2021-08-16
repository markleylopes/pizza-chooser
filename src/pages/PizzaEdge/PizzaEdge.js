import { Row, Col, Typography } from "antd";
import React, { useContext } from "react";
import StepButtons from "components/StepButtons";
import PizzaContext from "contexts/pizzaform";
import RadioCardGroup from "components/RadioCardGroup";
import { useHistory } from "react-router-dom";
import { getEdges } from "api";

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

const PizzaEdge = () => {
  const history = useHistory();
  const pizzaContext = useContext(PizzaContext);
  const [edges, setEdges] = React.useState([{ value: "" }]);
  const [loading, setLoading] = React.useState(true);
  const { currentPizza } = pizzaContext;

  React.useEffect(() => {
    getEdges()
      .then((data) => {
        setEdges(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Row style={styles.root} justify="center" data-testid="pizza-edge">
        <Col xs={24} sm={20} md={16} lg={12} xl={12}>
          <Text strong style={{ margin: 10 }}>
            Selecione um item para prosseguir
          </Text>
          <RadioCardGroup
            items={edges}
            loading={loading}
            value={currentPizza.edge}
            onChange={({ target }) =>
              pizzaContext.changePizzaItem({ edge: target.value })
            }
          />
        </Col>
      </Row>
      <Row style={styles.root} justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={12} style={styles.cardInfo}>
          <StepButtons
            disabled={!currentPizza.edge}
            onNext={() => {
              history.push("/recheio");
              pizzaContext.nextStep();
            }}
            onPrevious={() => {
              history.push("/massa");
              pizzaContext.previousStep();
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default PizzaEdge;
