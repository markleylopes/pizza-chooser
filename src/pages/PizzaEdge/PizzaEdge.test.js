import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PizzaProvider } from "contexts/pizzaform";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import PizzaEdge from "./PizzaEdge";

const baseUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${baseUrl}/edges`, (req, res, ctx) => {
    return res(ctx.json([{ value: "Catupiry" }, { value: "Cheddar" }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Load pizza edges data", async () => {
  const history = createMemoryHistory();
  const route = "/borda";
  history.push(route);
  render(
    <Router history={history}>
      <PizzaProvider>
        <PizzaEdge />
      </PizzaProvider>
    </Router>
  );
  const component = screen.getByTestId("pizza-edge");
  await waitFor(() => expect(component).toHaveTextContent("Catupiry"));
  await waitFor(() => expect(component).toHaveTextContent("Cheddar"));
});
