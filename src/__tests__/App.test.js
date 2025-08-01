import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Structure
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const techCheckbox = screen.getByLabelText(/tech/i);
  const artCheckbox = screen.getByLabelText(/art/i);
  const sportsCheckbox = screen.getByLabelText(/sports/i);

  expect(techCheckbox).toBeInTheDocument();
  expect(artCheckbox).toBeInTheDocument();
  expect(sportsCheckbox).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  expect(screen.getByLabelText(/tech/i)).not.toBeChecked();
  expect(screen.getByLabelText(/art/i)).not.toBeChecked();
  expect(screen.getByLabelText(/sports/i)).not.toBeChecked();
});

// Newsletter Form - User Interaction
test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  await userEvent.type(nameInput, "Alice");
  await userEvent.type(emailInput, "alice@example.com");

  expect(nameInput).toHaveValue("Alice");
  expect(emailInput).toHaveValue("alice@example.com");
});

test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />);

  const techCheckbox = screen.getByLabelText(/tech/i);
  expect(techCheckbox).not.toBeChecked();

  await userEvent.click(techCheckbox);
  expect(techCheckbox).toBeChecked();

  await userEvent.click(techCheckbox);
  expect(techCheckbox).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);

  await userEvent.type(screen.getByLabelText(/name/i), "Alice");
  await userEvent.type(screen.getByLabelText(/email/i), "alice@example.com");
  await userEvent.click(screen.getByLabelText(/tech/i));
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText(/thank you, Alice/i)).toBeInTheDocument();
  expect(screen.getByText(/tech/i)).toBeInTheDocument();
});
