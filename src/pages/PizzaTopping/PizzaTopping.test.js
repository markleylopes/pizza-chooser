import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PizzaProvider } from "contexts/pizzaform";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import PizzaTopping from "./PizzaTopping";

const baseUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${baseUrl}/toppings`, (req, res, ctx) => {
    return res(
      ctx.json([{ value: "Frango Catupiry" }, { value: "Calabresa" }])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Load pizza toppings data", async () => {
  const history = createMemoryHistory();
  const route = "/recheio";
  history.push(route);
  render(
    <Router history={history}>
      <PizzaProvider>
        <PizzaTopping />
      </PizzaProvider>
    </Router>
  );
  const component = screen.getByTestId("pizza-topping");
  await waitFor(() => expect(component).toHaveTextContent("Frango Catupiry"));
  await waitFor(() => expect(component).toHaveTextContent("Calabresa"));
});
