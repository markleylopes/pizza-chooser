import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Space } from "antd";
import PizzaCard from "components/PizzaCard";
import PizzaContext from "contexts/pizzaform";
import { getSuggestion } from "api";

const styles = {
  root: {
    padding: 10,
  },
  cardInfo: {
    display: "flex",
    justifyContent: "end",
  },
};

const Home = () => {
  const history = useHistory();
  const [isSelected, setIsSelected] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const pizzaContext = useContext(PizzaContext);

  React.useEffect(() => {
    getSuggestion()
      .then((data) => {
        setSuggestion(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Row style={styles.root} justify="center" data-testid="home">
        <Col xs={24} sm={20} md={16} lg={12} xl={12}>
          <PizzaCard
            loading={loading}
            isSelected={isSelected}
            onClick={() => {
              if (!isSelected) pizzaContext.setPoints(50);
              if (isSelected) pizzaContext.setPoints(-50);

              setIsSelected(!isSelected);
            }}
            {...suggestion}
          />
        </Col>
      </Row>
      <Row style={styles.root} justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={12} style={styles.cardInfo}>
          <Space>
            <Button
              type="text"
              onClick={() => {
                if (isSelected) pizzaContext.setCurrentPizza(suggestion);

                pizzaContext.setStep(1);
                history.push("/tamanho");
              }}
            >
              Personalizar
            </Button>
            <Button
              type="primary"
              disabled={!isSelected}
              onClick={() => {
                pizzaContext.finishPizza(suggestion);
                setIsSelected(false);
              }}
            >
              Adicionar
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Home;
