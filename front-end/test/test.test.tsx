import React from "react";
import {render, screen} from "@testing-library/react";
import TestComponent from "../components/reactdingen";

window.React = React;

test ('Test Hello', () => {
    render(<TestComponent />);
    
    expect(screen.getByText('Hello'))
});