import { createInterface } from "readline";
import { Rover, continueConfirmation, invalidInputPrompt } from "./index";
import { IRoverPosition } from "./types";
import { navigationValuesChecker } from "../utils";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let cache: IRoverPosition;

export const navigateRover = (rover_position: IRoverPosition | any) => {
  console.log("\n", "\n");
  console.log("CURRENT ROVER POSITION", rover_position);
  console.log(
    "<<<<--- Input L or R to steer rover left or right, input M to move rover one step forward --->>>>"
  );

  cache = rover_position;

  console.table({
    L: {
      Operations: "LEFT",
    },
    R: {
      Operations: "RIGHT",
    },
    M: {
      Operations: "MOVE",
    },
    S: {
      Operations: "STOP",
    },
  });
  readline.question("input here: ", async (position) => {
    const isInputValid = navigationValuesChecker(position);
    if (!isInputValid) {
      invalidInputPrompt(cache);
    } else {
      const rover = new Rover(rover_position);
      const location = position.toUpperCase();
      switch (location) {
        case "L":
          const left_pan_res = rover.panLeft();
          navigateRover(left_pan_res);
          break;
        case "R":
          const right_pan_res = rover.panRight();
          navigateRover(right_pan_res);
          break;
        case "M":
          const move_res = rover.move();
          console.log("move_res:", move_res);
          navigateRover(move_res);
          break;
        case "S":
          const res = rover.stop();
          continueConfirmation(res);
          break;
        default:
          break;
      }
    }
  });
};
