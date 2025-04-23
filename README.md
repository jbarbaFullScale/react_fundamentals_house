# House Listing Application

This is a React application for listing houses, viewing details of each house, and creating new house listings.

## Features

- **List View**: Displays a list of houses with a summary for each.
- **House Details**: Click on a house to view detailed information.
- **Create House**: A form to add new houses to the listing.

## Project Structure

```
house-listing-app
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── HouseCard.tsx
│   │   ├── HouseDetails.tsx
│   │   └── CreateHouseForm.tsx
│   ├── pages
│   │   ├── HomePage.tsx
│   │   ├── HouseDetailsPage.tsx
│   │   └── CreateHousePage.tsx
│   ├── services
│   │   └── houseService.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── styles
│       └── global.css
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd house-listing-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Usage

- On the home page, you will see a list of houses.
- Click on a house card to view its details.
- Use the "Create House" page to add a new house listing.

## Technologies Used

- React
- TypeScript
- CSS
- React Router

## License

This project is licensed under the MIT License.