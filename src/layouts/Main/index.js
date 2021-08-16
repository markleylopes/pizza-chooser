import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Row, Col, Typography, Divider } from "antd";
import Home from "pages/Home";
import PizzaSize from "pages/PizzaSize";
import PizzaEdge from "pages/PizzaEdge";
import MainHeader from "components/MainHeader";
import PizzaDough from "pages/PizzaDough";
import PizzaSteps from "components/PizzaSteps";
import PizzaTopping from "pages/PizzaTopping";
import PizzaContext, { PizzaProvider } from "contexts/pizzaform";

const { Header, Footer, Content } = Layout;
const { Text, Paragraph } = Typography;

const MainRouter = () => {
  return (
    <PizzaProvider>
      <PizzaContext.Consumer>
        {({ step, points, orderedPizzas }) => (
          <Layout>
            <Header
              style={{
                color: "white",
                position: "fixed",
                zIndex: 1,
                width: "100%",
              }}
            >
              <MainHeader points={points} />
            </Header>
            <Content style={{ paddingTop: 64 }}>
              <Row>
                <Col span={24}>
                  <PizzaSteps step={step} />
                </Col>
              </Row>
            </Content>
            <Content>
              <Router>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/tamanho" component={PizzaSize} />
                  <Route exact path="/massa" component={PizzaDough} />
                  <Route exact path="/borda" component={PizzaEdge} />
                  <Route exact path="/recheio" component={PizzaTopping} />
                  <Route path="/" component={Home} />
                </Switch>
              </Router>
            </Content>
            <Footer>
              <Divider />
              <Row justify="center">
                <Col xs={24} sm={20} md={16} lg={12} xl={12}>
                  <Text strong>Resumo dos pedidos</Text>
                  {orderedPizzas.map((i, index) => (
                    <Paragraph key={`${i.topping}-${index}`}>
                      <Text>
                        {i.topping} - {i.size}
                      </Text>
                    </Paragraph>
                  ))}
                </Col>
              </Row>
            </Footer>
          </Layout>
        )}
      </PizzaContext.Consumer>
    </PizzaProvider>
  );
};
export default MainRouter;
