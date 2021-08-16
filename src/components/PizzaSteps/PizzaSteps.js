import { Steps } from "antd";
import PropTypes from "prop-types";

const { Step } = Steps;

const PizzaSteps = ({ step }) => {
  return (
    <div style={{ padding: 10 }}>
      <Steps current={step} size="small">
        <Step title="Pizza" />
        <Step title="Tamanho" />
        <Step title="Massa" />
        <Step title="Borda" />
        <Step title="Recheio" />
      </Steps>
    </div>
  );
};

PizzaSteps.propTypes = {
  step: PropTypes.number,
};

PizzaSteps.defaultProps = {
  step: 0,
};

export default PizzaSteps;
