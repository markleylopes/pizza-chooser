import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PizzaProvider } from "contexts/pizzaform";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import PizzaDough from "./PizzaDough";

const baseUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${baseUrl}/doughs`, (req, res, ctx) => {
    return res(
      ctx.json([
        { value: "Nova-iorquina", description: "d1" },
        { value: "Siciliana", description: "d3" },
        { value: "Napolitana", description: "d4" },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Load pizza dough data", async () => {
  const history = createMemoryHistory();
  const route = "/massa";
  history.push(route);
  render(
    <Router history={history}>
      <PizzaProvider>
        <PizzaDough />
      </PizzaProvider>
    </Router>
  );
  const component = screen.getByTestId("pizza-dough");
  await waitFor(() => expect(component).toHaveTextContent("Nova-iorquina"));
  await waitFor(() => expect(component).toHaveTextContent("Siciliana"));
  await waitFor(() => expect(component).toHaveTextContent("Napolitana"));
});
