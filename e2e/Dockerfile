# E2E Testing Dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY playwright.config.ts ./

# Install dependencies
RUN npm ci

# Copy test files
COPY tests/ ./tests/

# Set environment variables
ENV CI=true
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Expose port for HTML report
EXPOSE 9323

# Default command
CMD ["npx", "playwright", "test", "--reporter=html"]
