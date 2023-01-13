/**
 * Testing Checklist:
 * - Common use cases snapshotted
 * - Common use cases run through axe/toHaveNoViolations
 * - role/aria/data attributes tested
 * - Component behaviors tested (reacts to events, handles callbacks appropriately, updates state correctly, etc.)
 * - Controlled/uncontrolled use cases tested
 * - Associated utils/helpers/etc. tested
 */
import { renderHook } from "@infinum/test-utils";
import * as React from "react";
import { useScrollSync } from "../src";

describe("useScrollSync", () => {
  test("it works", () => {
    expect(true).toBeTruthy();
  });
});
