import PropTypes from "prop-types";
import React, { createContext } from "react";
import { useLocation } from "react-router-dom";

const initialPizzaValue = {
  dough: "",
  size: "",
  edge: "",
  topping: "",
  ingredients: [],
};

const getCurrentStepByLocation = (key) =>
  ({ tamanho: 1, massa: 2, borda: 3, recheio: 4 }[key] || 0);

const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
  const location = useLocation();
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    points: 0,
    currentPizza: initialPizzaValue,
    orderedPizzas: [],
  });

  React.useEffect(() => {
    const currentStep = getCurrentStepByLocation(
      location.pathname.replace("/", "")
    );

    setStep(currentStep);

    const localData = localStorage.getItem("$data");
    if (localData) setData(JSON.parse(localData));
  }, [location.pathname]);

  React.useEffect(() => {
    const localData = JSON.stringify(data);
    localStorage.setItem("$data", localData);
  }, [data]);

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  const setPoints = (points) =>
    setData({ ...data, points: data.points + points });

  const setCurrentPizza = (currentPizza) => setData({ ...data, currentPizza });

  const changePizzaItem = (value) =>
    setData({ ...data, currentPizza: { ...data.currentPizza, ...value } });

  const finishPizza = (currentPizza = data.currentPizza) => {
    setData({
      ...data,
      orderedPizzas: [...data.orderedPizzas, currentPizza],
      currentPizza: initialPizzaValue,
    });
  };

  const value = {
    ...data,
    step,
    nextStep,
    setStep,
    setPoints,
    previousStep,
    changePizzaItem,
    setCurrentPizza,
    finishPizza,
  };
  return (
    <PizzaContext.Provider value={value}>{children}</PizzaContext.Provider>
  );
};

export default PizzaContext;

PizzaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PizzaProvider };
