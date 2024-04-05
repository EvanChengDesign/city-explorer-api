# City Explorer API

**Author**: Evan Cheng  
**Version**: 1.3.0

## Overviews

The objective of this lab assignment is to develop a foundation for a comprehensive City Explorer application by constructing a custom API server. This server will act as a central hub, interfacing with various third-party APIs to aggregate and supply pertinent data about different urban locales to the City Explorer front-end.

Custom API Server Development: The primary task is to develop an API server from scratch. This server will manage requests from the City Explorer front-end, process these requests by interacting with multiple third-party APIs, and then compile the responses to be sent back to the user interface.

Integration with Third-Party APIs: A key feature of this project is the integration with various third-party APIs. These APIs will provide a range of data, specifically, weather forecasts.

Weather API Introduction: A significant addition to this project is the integration of a Weather API. This feature will allow users to view current weather conditions, forecasts, and other meteorological data for their city of interest directly within the City Explorer application. By incorporating real-time weather information, the application aims to deliver a more dynamic and useful service to its users, catering to travelers, researchers, and locals alike.

## Getting Started

## Architecture

React.js: A JavaScript library for building user interfaces, chosen for its efficiency and community support.  

Bootstrap: Utilized for styling and responsive design, allowing for a clean and modern user interface.  

LocationIQ API: Provides the geo-location data used to fetch and display information about the cities.
  
Vite: Serves as the build tool and development environment, known for its fast hot module replacement.

Axios: Used in React applications to make HTTP requests to external resources, such as APIs, enabling developers to easily fetch, post, and manage data from within their React components.

WeatherbitIO API: Provides real time weather forecast data for locations.

The Movie Database API: Provides movie information based off location data.

## Change Log

## Credit and Collaborations
LocationIQ: Geo-location API that powers the primary functionality of this application.  

LocationIQ Bootstrap Documentation: For references on implementing responsive design elements.  

Bootstrap React Documentation: For best practices and guidance on React component structure.  

ChatGPT by OpenAI: For assistance in debugging, architectural decisions, and code optimization strategies.