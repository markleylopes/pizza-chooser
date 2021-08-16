import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";

const baseUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${baseUrl}/suggestion`, (req, res, ctx) => {
    return res(
      ctx.json({
        size: "Grande",
        dough: "Napolitana",
        edge: "Tradicional",
        topping: "Frango com catupiry",
        price: 29,
        points: 50,
        ingredients: ["Frango", "Orégano", "Tomate"],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Load pizza title on suggestion", async () => {
  render(<Home />);
  await waitFor(() =>
    expect(screen.getByTestId("home")).toHaveTextContent(
      "Frango com catupiry - Grande"
    )
  );
});
