/**
 * Component test for the one interactive client boundary that owns state.
 * Tests behaviour through the accessibility tree (roles, aria attributes) —
 * the RTL philosophy: assert what a user perceives, not implementation details.
 */
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Disclosure } from "@/components/Disclosure";

describe("Disclosure", () => {
  it("starts closed: content in the DOM (server-rendered) but hidden", () => {
    render(
      <Disclosure label="Quanto é isto?">
        <p>84× a cidade de Lisboa</p>
      </Disclosure>,
    );
    const button = screen.getByRole("button", { name: /quanto é isto\?/i });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    // The children are ALWAYS rendered (they come from the server; only the
    // toggle is client) — closed just means the panel carries `hidden`.
    const content = screen.getByText("84× a cidade de Lisboa");
    expect(content.closest("[hidden]")).not.toBeNull();
  });

  it("opens on click and wires aria-controls to the revealed panel", () => {
    render(
      <Disclosure label="Quanto é isto?">
        <p>84× a cidade de Lisboa</p>
      </Disclosure>,
    );
    const button = screen.getByRole("button", { name: /quanto é isto\?/i });
    fireEvent.click(button);

    expect(button.getAttribute("aria-expanded")).toBe("true");
    const revealed = screen.getByText("84× a cidade de Lisboa");
    expect(revealed.closest("[hidden]")).toBeNull();
    // The button must point at the exact element it toggles.
    const panel = document.getElementById(button.getAttribute("aria-controls")!);
    expect(panel?.contains(revealed)).toBe(true);
  });

  it("closes again on a second click", () => {
    render(
      <Disclosure label="Quanto é isto?">
        <p>84× a cidade de Lisboa</p>
      </Disclosure>,
    );
    const button = screen.getByRole("button", { name: /quanto é isto\?/i });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(
      screen.getByText("84× a cidade de Lisboa").closest("[hidden]"),
    ).not.toBeNull();
  });
});
