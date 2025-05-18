# Discuss Forum App Testing Documentation

This document provides information about the testing configuration and setup for the Discuss Forum App.

## Testing Setup

This project has been configured with the following testing tools:

1. **Vitest** - For unit and component testing
2. **React Testing Library** - For component testing
3. **Cypress** - For end-to-end testing
4. **Storybook** - For component development and visual testing

## Running Tests

### Unit and Component Tests

To run all unit and component tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

To check test coverage:

```bash
npm run test:coverage
```

### E2E Tests

To run Cypress E2E tests in headless mode:

```bash
npm run e2e
```

To open Cypress Test Runner:

```bash
npm run e2e:open
```

### Storybook

To start Storybook:

```bash
npm run storybook
```

## Test Structure

### Unit Tests (Reducers and Thunks)

- `src/tests/states/authUser/` - Tests for authentication reducers and thunks
- `src/tests/states/threads/` - Tests for threads reducers and thunks
- `src/tests/states/threadDetail/` - Tests for thread detail reducers and thunks
- `src/tests/states/users/` - Tests for users reducers and thunks

### Component Tests

- `src/tests/components/` - Tests for React components

### Storybook Stories

- `src/stories/components/` - Stories for React components

### E2E Tests

- `cypress/e2e/` - End-to-end test scenarios

## Test Coverage

The tests cover the following areas:

1. **Reducers** - Testing state changes for different actions
2. **Thunks** - Testing asynchronous operations and API interactions
3. **Components** - Testing rendering and behavior of UI components
4. **E2E** - Testing complete user flows across the application

## Adding New Tests

When adding new tests, follow these guidelines:

1. Place unit tests in the appropriate directory under `src/tests/states/`
2. Place component tests in `src/tests/components/`
3. Place E2E tests in `cypress/e2e/`
4. Use descriptive test names and follow the AAA pattern (Arrange, Act, Assert)

## Continuous Integration

Integration with CI pipelines can be done by running the following commands:

```bash
npm test
npm run e2e
```
