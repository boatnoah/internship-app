const axios = require("axios");
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

    const internships = htmlTableToObjects(internshipTable);
    console.log(internships);
    return internships;
  } catch (error) {
    // Handle the case where the repository or README is not found
    if (error.response && error.response.status === 404) {
      throw new Error("Repository or README not found");
    } else {
      throw new Error("An error occurred while fetching the README");
    }
  }
}

// Santizes the data into array of js objects

function htmlTableToObjects(htmlString) {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;
  const table = document.querySelector("table");
  if (!table) {
    console.error("No table found in the provided HTML string.");
    return [];
  }

  const result = [];
  const customKeys = ["company", "role", "location", "link", "date_posted"];

  let lastCompany = "";
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const obj = {};
    cells.forEach((cell, index) => {
      if (index === 0) {
        // Company name
        const companyName = cell.textContent.trim().replace(/[^\w\s,]/gi, "");
        if (companyName) {
          lastCompany = companyName;
        }
        obj[customKeys[index]] = lastCompany;
      } else if (index === cells.length - 2) {
        // Link
        const link = cell.querySelector("a");
        obj[customKeys[index]] = link ? link.href : "closed";
      } else {
        obj[customKeys[index]] = cell.textContent
          .trim()
          .replace(/[^\w\s,]/gi, "");
      }
    });
    result.push(obj);
  });

  return result;
}
