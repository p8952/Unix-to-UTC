var assert = require("assert");
let rewire = require("rewire");

let contentScript = rewire("./content_script.js");

let replaceTimestamps = contentScript.__get__("replaceTimestamps");
describe("replaceTimestamps", () => {
  it("should not append to 9 digits at the start of a string", () => {
    assert.equal(replaceTimestamps("123456789bar"), "123456789bar");
  });

  it("should not append to 11 digits at the start of a string", () => {
    assert.equal(replaceTimestamps("12345678901bar"), "12345678901bar");
  });

  it("should not append to 12 digits at the start of a string", () => {
    assert.equal(replaceTimestamps("123456789012bar"), "123456789012bar");
  });

  it("should not append to 14 digits at the start of a string", () => {
    assert.equal(replaceTimestamps("12345678901234bar"), "12345678901234bar");
  });

  it("should append to 10 digits at the start of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890bar"),
      "1234567890(2009-02-13 23:31:30)bar"
    );
  });

  it("should append to 13 digits at the start of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890123bar"),
      "1234567890123(2009-02-13 23:31:30)bar"
    );
  });

  it("should not append to 9 digits in the middle of a string", () => {
    assert.equal(replaceTimestamps("foo123456789bar"), "foo123456789bar");
  });

  it("should not append to 11 digits in the middle of a string", () => {
    assert.equal(replaceTimestamps("foo12345678901bar"), "foo12345678901bar");
  });

  it("should not append to 12 digits in the middle of a string", () => {
    assert.equal(replaceTimestamps("foo123456789012bar"), "foo123456789012bar");
  });

  it("should not append to 14 digits in the middle of a string", () => {
    assert.equal(
      replaceTimestamps("foo12345678901234bar"),
      "foo12345678901234bar"
    );
  });

  it("should append to 10 digits in the middle of a string", () => {
    assert.equal(
      replaceTimestamps("foo1234567890bar"),
      "foo1234567890(2009-02-13 23:31:30)bar"
    );
  });

  it("should append to 13 digits in the middle of a string", () => {
    assert.equal(
      replaceTimestamps("foo1234567890123bar"),
      "foo1234567890123(2009-02-13 23:31:30)bar"
    );
  });

  it("should not append to 9 digits at the end of a string", () => {
    assert.equal(replaceTimestamps("foo123456789"), "foo123456789");
  });

  it("should not append to 11 digits at the end of a string", () => {
    assert.equal(replaceTimestamps("foo12345678901"), "foo12345678901");
  });

  it("should not append to 12 digits at the end of a string", () => {
    assert.equal(replaceTimestamps("foo123456789012"), "foo123456789012");
  });

  it("should not append to 14 digits at the end of a string", () => {
    assert.equal(replaceTimestamps("foo12345678901234"), "foo12345678901234");
  });

  it("should append to 10 digits at the end of a string", () => {
    assert.equal(
      replaceTimestamps("foo1234567890"),
      "foo1234567890(2009-02-13 23:31:30)"
    );
  });

  it("should append to 13 digits at the end of a string", () => {
    assert.equal(
      replaceTimestamps("foo1234567890123"),
      "foo1234567890123(2009-02-13 23:31:30)"
    );
  });

  it("should append to 10 digits at the start of a string and 10 digits in the middle of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890foo1234567890bar"),
      "1234567890(2009-02-13 23:31:30)foo1234567890(2009-02-13 23:31:30)bar"
    );
  });

  it("should append to 10 digits at the start of a string and 10 digits at the end of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890foo1234567890"),
      "1234567890(2009-02-13 23:31:30)foo1234567890(2009-02-13 23:31:30)"
    );
  });

  it("should append to 10 digits at the start of a string and 13 digits in the middle of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890foo1234567890123bar"),
      "1234567890(2009-02-13 23:31:30)foo1234567890123(2009-02-13 23:31:30)bar"
    );
  });

  it("should append to 10 digits at the start of a string and 13 digits at the end of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890foo1234567890123"),
      "1234567890(2009-02-13 23:31:30)foo1234567890123(2009-02-13 23:31:30)"
    );
  });

  it("should append to 13 digits at the start of a string and 13 digits in the middle of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890123foo1234567890123bar"),
      "1234567890123(2009-02-13 23:31:30)foo1234567890123(2009-02-13 23:31:30)bar"
    );
  });

  it("should append to 13 digits at the start of a string and 13 digits at the end of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890123foo1234567890123"),
      "1234567890123(2009-02-13 23:31:30)foo1234567890123(2009-02-13 23:31:30)"
    );
  });

  it("should append to 13 digits at the start of a string and 10 digits in the middle of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890123foo1234567890bar"),
      "1234567890123(2009-02-13 23:31:30)foo1234567890(2009-02-13 23:31:30)bar"
    );
  });

  it("should append to 13 digits at the start of a string and 10 digits at the end of a string", () => {
    assert.equal(
      replaceTimestamps("1234567890123foo1234567890"),
      "1234567890123(2009-02-13 23:31:30)foo1234567890(2009-02-13 23:31:30)"
    );
  });
});
