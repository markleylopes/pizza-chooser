import { Button, Space } from "antd";
import PropTypes from "prop-types";

const StepButtons = ({ onNext, nextTitle, onPrevious, disabled }) => {
  return (
    <Space>
      <Button disabled={disabled} onClick={onPrevious}>
        Anterior
      </Button>
      <Button disabled={disabled} type="primary" onClick={onNext}>
        {nextTitle}
      </Button>
    </Space>
  );
};

StepButtons.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  nextTitle: PropTypes.string,
  disabled: PropTypes.bool,
};

StepButtons.defaultProps = {
  nextTitle: "Próximo",
  disabled: false,
};

export default StepButtons;
