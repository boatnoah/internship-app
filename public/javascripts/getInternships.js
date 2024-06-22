import axios from "axios";

// Function to fetch and decode the README content
export async function getInternships(owner, repo) {
  try {
    // GitHub API URL for the README endpoint
    const url = `https://api.github.com/repos/${owner}/${repo}/readme`;

    // Make a GET request to the GitHub API
    const response = await axios.get(url);

    // Decode the base64 encoded content
    const readmeContent = atob(response.data.content);

    return readmeContent;
  } catch (error) {
    // Handle the case where the repository or README is not found
    if (error.response && error.response.status === 404) {
      throw new Error("Repository or README not found");
    } else {
      throw new Error("An error occurred while fetching the README");
    }
  }
}
