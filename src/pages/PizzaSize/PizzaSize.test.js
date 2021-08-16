import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PizzaProvider } from "contexts/pizzaform";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import PizzaSize from "./PizzaSize";

const baseUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${baseUrl}/sizes`, (req, res, ctx) => {
    return res(ctx.json([{ value: "Média" }, { value: "Grande" }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Load pizza size data", async () => {
  const history = createMemoryHistory();
  const route = "/tamanho";
  history.push(route);
  render(
    <Router history={history}>
      <PizzaProvider>
        <PizzaSize />
      </PizzaProvider>
    </Router>
  );
  const component = screen.getByTestId("pizza-size");
  await waitFor(() => expect(component).toHaveTextContent("Média"));
  await waitFor(() => expect(component).toHaveTextContent("Grande"));
});
