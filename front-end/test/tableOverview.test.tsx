import React from "react";
import {render, screen} from "@testing-library/react";
import TableOverview from "../components/home/TableOverview";

window.React = React;

test('Given TableOverview component, when rendered, then it should display the table headers', () => {
    // given
    render(<TableOverview />);
    
    // then
    expect(screen.getByText("Name"));
    expect(screen.getByText("Email"));
    expect(screen.getByText("Password"));
    expect(screen.getByText("Role"));
});

test('Given TableOverview component, when rendered, then it should display the table rows', () => {
    // given
    render(<TableOverview />);
    
    // then
    expect(screen.getByText("Admin"));
    expect(screen.getByText("admin@email.com"));
    expect(screen.getByText("admin123"));
    expect(screen.getByText("admin"));

    expect(screen.getByText("Parent"));
    expect(screen.getByText("parent@email.com"));
    expect(screen.getByText("parent123"));
    expect(screen.getByText("parent"));

    expect(screen.getByText("Child"));
    expect(screen.getByText("child@email.com"));
    expect(screen.getByText("child123"));
    expect(screen.getByText("child"));
});