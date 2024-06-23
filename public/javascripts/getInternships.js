import axios from "axios";
import { marked } from "marked";
import { JSDOM } from "jsdom";

// Function to fetch and decode the README content
export async function getInternships(owner, repo) {
  try {
    // GitHub API URL for the README endpoint
    const url = `https://api.github.com/repos/${owner}/${repo}/readme`;

    // Make a GET request to the GitHub API
    const response = await axios.get(url);

    // Decode the base64 encoded content
    const readmeContent = atob(response.data.content);

    const parsedtoHTML = marked(readmeContent);

    // find the table that holds the internships
    const startPoint = parsedtoHTML.indexOf("<table>");
    const endPoint = parsedtoHTML.indexOf("</table>") + 8;

    const internshipTable = parsedtoHTML.slice(startPoint, endPoint);

    console.log(internshipTable);

    const internships = htmlTableToObjects(internshipTable);
    console.log(internships);

    return internshipTable;
  } catch (error) {
    // Handle the case where the repository or README is not found
    if (error.response && error.response.status === 404) {
      throw new Error("Repository or README not found");
    } else {
      throw new Error("An error occurred while fetching the README");
    }
  }
}

// TODO: redo this function

function htmlTableToObjects(htmlString) {
  // Parse the HTML string into a document object
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  // Get the table element from the document
  const table = document.querySelector("table");

  if (!table) {
    console.error("No table found in the provided HTML string.");
    return [];
  }

  // Initialize an array to hold the objects
  const result = [];

  // Get the headers from the table
  const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
    th.textContent.trim(),
  );
  if (headers.length === 0) {
    console.error("No headers found in the table.");
    return [];
  }

  // Get the rows from the table body
  const rows = table.querySelectorAll("tbody tr");

  // Iterate over the rows and convert each to an object
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const obj = {};

    cells.forEach((cell, index) => {
      obj[headers[index]] = cell.textContent.trim();
    });

    result.push(obj);
  });

  return result;
}
