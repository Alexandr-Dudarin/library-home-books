import "./style.css";
import { Library } from "./model/Library";
import { AppController } from "./controller/appController";

const library = new Library();

new AppController(library);