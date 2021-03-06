import * as assert from "assert";
import { Row } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Row", function () {
  describe("render", function () {
    it("should return a basic row when called without any arguments", function () {
      let row = Row.render();
      assert.equal(row.data.props.className, "ui row");
      assert.equal(row.children.length, 0);
    });
    it("should support argument syntax", function () {
      let row = Row.render({ stretched: true }, ["Content"]);
      assert.equal(row.children.length, 1);
      assert.equal(row.data.props.className, "ui stretched row");
      assert.equal((row.children[0] as VNode).text, "Content");
      row = Row.render(["Content"]);
      assert.equal(row.children.length, 1);
      assert.equal(row.data.props.className, "ui row");
      assert.equal((row.children[0] as VNode).text, "Content");
      row = Row.render({ stretched: true });
      assert.equal(row.children.length, 0);
      assert.equal(row.data.props.className, "ui stretched row");
    });
    it("should support verbose argument object syntax", function () {
      let row = Row.render({
        props: { stretched: true },
        content: {
          main: ["Content"]
        }
      });
      assert.equal(row.children.length, 1);
      assert.equal(row.data.props.className, "ui stretched row");
      assert.equal((row.children[0] as VNode).text, "Content");
      row = Row.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(row.children.length, 1);
      assert.equal(row.data.props.className, "ui row");
      assert.equal((row.children[0] as VNode).text, "Content");
      row = Row.render({
        props: { stretched: true }
      });
      assert.equal(row.children.length, 0);
      assert.equal(row.data.props.className, "ui stretched row");
    });
    it("should support shorthand argument object syntax", function () {
      let row = Row.render({
        props: { stretched: true },
        content: ["Content"]
      });
      assert.equal(row.children.length, 1);
      assert.equal(row.data.props.className, "ui stretched row");
      assert.equal((row.children[0] as VNode).text, "Content");
      row = Row.render({
        content: ["Content"]
      });
      assert.equal(row.children.length, 1);
      assert.equal(row.data.props.className, "ui row");
      assert.equal((row.children[0] as VNode).text, "Content");
      row = Row.render({
        props: { stretched: true }
      });
      assert.equal(row.children.length, 0);
      assert.equal(row.data.props.className, "ui stretched row");
    });
    it("should support setting the width in columns", function () {
      let row = Row.render({ width: 4 });
      assert.equal(row.data.props.className, "ui four column row");
    });
    it("should support the stretched variation", function () {
      let row = Row.render({ stretched: true });
      assert.equal(row.data.props.className, "ui stretched row");
    });
    it("should support the centered variation", function () {
      let row = Row.render({ centered: true });
      assert.equal(row.data.props.className, "ui centered row");
    });
    it("should support the mobile only variation", function () {
      let row = Row.render({ mobileOnly: true });
      assert.equal(row.data.props.className, "ui mobile only row");
    });
    it("should support the tablet only variation", function () {
      let row = Row.render({ tabletOnly: true });
      assert.equal(row.data.props.className, "ui tablet only row");
    });
    it("should support the computer only variation", function () {
      let row = Row.render({ computerOnly: true });
      assert.equal(row.data.props.className, "ui computer only row");
    });
    it("should support the largescreen only variation", function () {
      let row = Row.render({ largescreenOnly: true });
      assert.equal(row.data.props.className, "ui large screen only row");
    });
    it("should support the equal width variation", function () {
      let row = Row.render({ equalWidth: true });
      assert.equal(row.data.props.className, "ui equal width row");
    });
    it("should support the doubling variation", function () {
      let row = Row.render({ doubling: true });
      assert.equal(row.data.props.className, "ui doubling row");
    });
    it("should support the text alignment enum", function () {
      let row = Row.render({ textAlignment: "center" });
      assert.equal(row.data.props.className, "ui center aligned row");
    });
    it("should support the vertical alignment enum", function () {
      let row = Row.render({ alignment: "middle" });
      assert.equal(row.data.props.className, "ui middle aligned row");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___row": {
        ".row": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a row stream", function (done) {
      let row = Row.run({ DOM: dom });
      row.DOM.addListener({
        next: (x) => {
          assert.equal("ui row", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let row = Row.run({ DOM: dom }, "row");
      row.DOM.addListener({
        next: (x) => {
          assert.equal("div.___row", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let row = Row.run({ DOM: dom }, "row");
      row.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
