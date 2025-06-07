# expressBookReviews

expressBookReviews is a project focused on managing book reviews through RESTful API endpoints, allowing users to register, log in, add reviews, and retrieve book information based on ISBN, author, or title.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [License](#license)

## Installation

1. Clone the repository.
2. Install dependencies by running `npm install`.

## Usage

1. Start the server by running `npm start`.
2. Access the endpoints using a REST client or a web browser.

## Routes

### Customer Routes

- **POST /customer/register**: Register a new user.
- **POST /customer/login**: Log in as a registered user.
- **PUT /customer/auth/review/:isbn**: Add a review for a book (authentication required).

### General Routes

- **POST /register**: Register a new user (public).
- **POST /login**: Log in as a registered user (public).
- **GET /**: Get the list of available books (public).
- **GET /isbn/:isbn**: Get book details based on ISBN (public).
- **GET /author/:author**: Get book details based on author (public).
- **GET /title/:title**: Get all books based on title (public).
- **GET /review/:isbn**: Get book review based on ISBN (public).
