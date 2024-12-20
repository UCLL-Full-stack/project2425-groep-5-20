import React from "react";
import { render, screen } from "@testing-library/react";
import UserOverview from "../components/users/UserOverview";
import { User } from "@/types";


window.React = React;

const users: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "parent" },
  { id: 3, name: "JohnJr Doe", email: "johnJr.doe@example.com", role: "child" },
];

test('Given UserOverview component, when rendered, then it should display the table headers', () => {
    // given
    render(<UserOverview users={users} />);
    
    // then
    expect(screen.getByText("Name"));
    expect(screen.getByText("Email"));
    expect(screen.getByText("Role"));
});

test('Given UserOverview component, when rendered, then it should display the user rows', () => {
    // given
    render(<UserOverview users={users} />);
    
    // then
    expect(screen.getByText("John Doe"));
    expect(screen.getByText("john.doe@example.com"));
    expect(screen.getByText("admin"));

    expect(screen.getByText("Jane Smith"));
    expect(screen.getByText("jane.smith@example.com"));
    expect(screen.getByText("parent"));

    expect(screen.getByText("JohnJr Doe"));
    expect(screen.getByText("johnJr.doe@example.com"));
    expect(screen.getByText("child"));

});