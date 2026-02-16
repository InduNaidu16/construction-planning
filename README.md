# Construction Planning to 3D Image & Budget Generator

A comprehensive application that converts 1-dimensional construction building planning files into interactive 3D visualizations and generates detailed budget estimates.

## Features

- **File Upload**: Support for CSV, TXT, Excel, and JSON construction planning formats
- **3D Visualization**: Automatic generation of 3D building models from 1D planning data
- **Budget Planning**: Smart budget calculation based on materials and labor estimates
- **Interactive Dashboard**: Real-time project overview and cost tracking
- **Export Options**: Download 3D models and budget reports

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: React.js with Three.js for 3D visualization
- **Database**: MongoDB for project storage
- **3D Engine**: Three.js
- **File Processing**: Multer, ExcelJS, CSV-parser

## Project Structure

```
construction-planning/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.js
│   └── package.json
├── docs/
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Backend setup:
   ```bash
   cd backend
   npm install
   npm start
   ```
3. Frontend setup:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## API Endpoints

- `POST /api/projects/upload` - Upload construction planning file
- `GET /api/projects/:id` - Retrieve project details
- `POST /api/projects/:id/generate-3d` - Generate 3D model
- `POST /api/projects/:id/calculate-budget` - Calculate budget
- `GET /api/projects/:id/download` - Download files