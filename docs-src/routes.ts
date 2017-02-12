// tslint:disable-next-line:no-unused-variable
import { VNode } from "@cycle/dom";
import { Stream } from "xstream";
import { Index } from "./index";
import { Breadcrumb} from "./collections";


let prefix = "/cycle-semantic-ui";
let routes = {
  "/": Index.run,
};
routes[prefix + "/collections/breadcrumb"] = Breadcrumb.run;
export default routes;
