import React, { useState } from "react";

function App() {
  // Track user inputs and form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Available interest options
  const allInterests = ["Tech", "Art", "Sports"];

  // Toggle an interest when checkbox changes
  const handleCheckboxChange = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <h1>Hi, I'm (Jeremy)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />

      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua...
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <section>
        <h2>Newsletter Signup</h2>

        {/* Show form if not submitted */}
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Name input */}
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                aria-label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email input */}
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Interest checkboxes */}
            <fieldset>
              <legend>Select your interests:</legend>
              {allInterests.map((interest) => (
                <label key={interest}>
                  <input
                    type="checkbox"
                    aria-label={interest}
                    checked={interests.includes(interest)}
                    onChange={() => handleCheckboxChange(interest)}
                  />
                  {interest}
                </label>
              ))}
            </fieldset>

            <button type="submit">Submit</button>
          </form>
        ) : (
          // Thank-you message after submission
          <div>
            <p>
              Thank you, {name}! You've signed up with {email}.
              {interests.length > 0 && (
                <> Your interests: {interests.join(", ")}.</>
              )}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
