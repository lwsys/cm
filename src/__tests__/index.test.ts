import { pon, psend } from "..";

describe("test", () => {
  test("test", () => {
    const target = window;
    pon(target, "test", (d) => {
      console.log(d);
    });
    psend(target, "test", "test");
    expect(1).toBe(1);
  });
});
