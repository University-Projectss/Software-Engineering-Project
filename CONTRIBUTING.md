# Contributing to MinnieHealth

Welcome to MinnieHealth! We're thrilled that you are considering contributing. Before you get started, please take a moment to read and understand our contribution guidelines.

## Table of Contents

1. [How to Contribute](#how-to-contribute)
2. [Patterns Used](#patterns-used)
3. [Setting Up Your Development Environment](#setting-up-your-development-environment)
4. [Submitting a Contribution](#submitting-a-contribution)
5. [Testing](#testing)

## How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, concise commit messages.
4. Push your branch to your fork.
5. Open a pull request to the `main` branch of the original repository.

## Patterns Used

### Frontend

We use *Higher Order Component* (HOC) which is a component that receives another component. The HOC contains certain logic that we want to apply to the component that we pass as a parameter. After applying that logic, the HOC returns the element with the additional logic.

### Backend

We use the *Model View Controller* (MVC) design pattern which specifies that an application consists of a data model, presentation information, and control information. The pattern requires that each of these be separated into different objects.

## Setting Up Your Development Environment

To contribute to MinnieHealth, you'll need to set up your local development environment. Follow the steps outlined in [ARCHITECTURE.md](ARCHITECTURE.md) for detailed instructions.

## Submitting a Contribution

Before submitting your contribution, ensure that you have:

- Followed our coding conventions.
- Tested your changes thoroughly.
- Updated the documentation if necessary.

Describe your changes in detail when opening a pull request, and provide context for your contribution.

## Testing

To maintain high code quality, we require tests for all new features and bug fixes. Follow the guidelines in [ARCHITECTURE.md](ARCHITECTURE.md) for testing your contributions.
