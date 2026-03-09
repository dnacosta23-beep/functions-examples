"use strict";

const mainEL = document.getElementById("main");

//* example of Helper Functions
// you can use helper functions to break down your code into smaller, reusable pieces. This can make your code more organized and easier to read. For example, if you have a function that builds an email address from a first name and last name, you can create a helper function to do that as seen here.
function buildEmail(firstName, lastName) {
  // you can also add any logic you want to your helper functions, for example you can convert the first name and last name to lowercase before building the email address
  const firstNameLower = firstName.toLowerCase();
  const lastNameLower = lastName.toLowerCase();
  const domain = "@gmail.com";
  const username = firstNameLower.charAt(0) + lastNameLower;
  const email = username + domain;
  return email;
}

buildEmail("Nichole", "Acosta"); // returns "nichole.acosta@gmail.com on its own."

//* example  GET request function
// you can use the same structure for any API, just change the URL and the data we want to send
async function getSpells(id) {
  try {
    const res = await fetch("https://www.dnd5eapi.co/api/spells/" + id);
    if (!res.ok) {
      throw new Error("Something broke with fetching spells");
    }
    const data = await res.json();
    return data;
    // you can also handle specific status codes if you want, for example if the API returns a 404 status code you can throw a different error
  } catch (error) {
    console.error(error);
  }
}

//* example POST request function
// you can use the same structure for any API, just change the URL and the data we want to send
async function createSpell(spellData) {
  try {
    /// you can send any data you want, just make sure to stringify it and set the correct headers
    const res = await fetch("https://www.dnd5eapi.co/api/spells/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spellData),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Something broke with creating a spell");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//* Example of Render function
// you can use the same structure for any data, just change the way we create and append elements to the DOM
function renderSpells(spell) {
  // you can create as many elements as you want and append them to the DOM
  // you can also add any logic you want to your render functions, for example you can check if the spell has a certain property before rendering it
  console.log(mainEL);
  const h2 = document.createElement("h2");
  h2.textContent = spell.name;
  mainEL.appendChild(h2);
  const desc = document.createElement("p");
  desc.textContent = spell.desc[0];
  mainEL.appendChild(desc);
}

//* Main function to run them all together
//using the main function to run all of our functions together and handle any errors that may occur is a good way to keep your code organized and easy to read. It also allows you to easily see the flow of your code and how the different functions interact with each other.
async function main() {
  try {
    // you can fetch a spell and render it to the DOM
    // you can also fetch a spell and log it to the console without rendering it to the DOM
    const spell = await getSpells("acid-arrow");
    console.log(spell);
    renderSpells(spell);
    // you can also create a new spell and log the response to the console
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
// always call the main function at the end of your file to run your code
main();
