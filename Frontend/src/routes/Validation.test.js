import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Validation from "./Validation";
import { Provider } from "react-redux";
import store from "../store/index";
let object = new Object({
    id: "1",
    firstName: "SEBAS",
    lastName: "BOLIVAR",
    dateOfBirth: "1998-08-05T05:33:12.000Z",
  });
describe("Async Validation", () => {
  //   test("Renders Data Validation title", async () => {
  //     render(
  //       <Provider store={store}>
  //         <Validation />
  //       </Provider>
  //     );

  //     const titleElement = screen.getByText("Data Validation", {
  //       exact: true,
  //     });
  //     expect(titleElement).toBeInTheDocument();
  //   });

  //   test("Renders no subtitle is button is NOT clicked", async () => {
  //     render(
  //       <Provider store={store}>
  //         <Validation />
  //       </Provider>
  //     );
  //     // query instead of get because query returns
  //     // null if the element is not found
  //     const autoElement = screen.queryByText("Auto", {
  //       exact: true,
  //     });
  //     expect(autoElement).toBeNull();
  //   });

  //   test("Renders Auto subtitle is Get latests access button is clicked", async () => {
  //     render(
  //       <Provider store={store}>
  //         <Validation />
  //       </Provider>
  //     );
  //     // query instead of get because query returns
  //     // null if the element is not found
  //     const buttonTestElement = screen.getByText(
  //       "Get latest access",
  //       {
  //         exact: true,
  //       },
  //       { setTimeout: 2000 }
  //     );

  //     await act(async () => {
  //       await userEvent.click(buttonTestElement);
  //     });

  //     const autoElement = await screen.findByText("Auto", {
  //       exact: true,
  //     });
  //     expect(autoElement).toBeInTheDocument();
  //   });

    // test("Renders Process access request button if request succeds", async () => {
    //   render(
    //     <Provider store={store}>
    //       <Validation />
    //     </Provider>
    //   );

    //   const buttonTestElement = screen.getByText(
    //     "Get latest access",
    //     {
    //       exact: true,
    //     },
    //     { setTimeout: 2000 }
    //   );

    //   await act(async () => {
    //     await userEvent.click(buttonTestElement);
    //   });

    //   // find instead of get because find queries return promises
    //   // use when testing async functions
    //   const processRequestButtonElement = await screen.findByText(
    //     "Process access request"
    //   );
    //   expect(processRequestButtonElement).toBeInTheDocument();
    // });

  test("Renders form with guest Info  if request succeds", async () => {

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => object,
    });

      render(
        <Provider store={store}>
          <Validation />
        </Provider>
      );

    const buttonTestElement = screen.getByText(
      "Get latest access",
      {
        exact: true,
      },
      { setTimeout: 2000 }
    );

      await userEvent.click(buttonTestElement);
   

    // find instead of get because find queries return promises
    // use when testing async functions
    const inputFirstNameElement = await screen.findByText(
      "Process access request"
    );
    // expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(inputFirstNameElement).toBeInTheDocument();
  });
});
