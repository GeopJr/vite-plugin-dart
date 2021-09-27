import "./index.dart";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCTextField } from "@material/textfield";
import { MDCRipple } from "@material/ripple";

const topAppBarElement = document.querySelector(".mdc-top-app-bar");

new MDCTopAppBar(topAppBarElement);
new MDCTextField(document.querySelector(".mdc-text-field1"));
new MDCTextField(document.querySelector(".mdc-text-field2"));
new MDCRipple(document.querySelector(".mdc-button1"));
new MDCRipple(document.querySelector(".mdc-button2"));

const app = document.getElementById("app");

app.innerHTML = `
  <h1>Hello Vite!</h1>
`;
