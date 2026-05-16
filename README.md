# SwiftRoute CRM — Parcel Operations Portal

SwiftRoute CRM is a demo logistics operations portal built with **Vite + React**. It simulates a parcel delivery workflow where dispatchers, drivers, and merchants interact through role-based dashboards.

The app is designed to demonstrate the core business flow of a small courier, delivery, or parcel-handling operation.

---

## Screenshot

![SwiftRoute CRM Homepage](docs/screenshots/homepage.png)


---

## Business Logic Overview

SwiftRoute CRM models a parcel operations system with three main users:

1. **Dispatcher**
2. **Driver**
3. **Merchant**

Each role has a different responsibility inside the delivery lifecycle.

---

## Core Workflow

### 1. Merchant Creates or Reviews Shipments

The merchant represents a business or seller that needs parcels delivered to customers.

Merchant users can:

- View their shipment history
- Create or manage parcel bookings
- Review delivery statuses
- Access billing or payment-related details
- Track parcel progress from booking to delivery

Example merchant:

```txt
TechGadgets PH
```

---

### 2. Dispatcher Manages Operations

The dispatcher controls the parcel operation from the admin side.

Dispatcher users can:

- View all incoming parcel bookings
- Assign available drivers to pending parcels
- Monitor all parcel statuses
- Search and filter deliveries
- Track driver workload
- Handle parcel exceptions
- Review operational metrics

The dispatcher is the main control center of the system.

---

### 3. Driver Handles Assigned Deliveries

The driver receives assigned pickups and deliveries.

Driver users can:

- View assigned parcels
- Check pickup and drop-off information
- Update parcel status at each delivery stage
- Report delivery exceptions
- Track today’s workload

Drivers move parcels through the delivery pipeline.

---

## Parcel Status Flow

Each parcel moves through a controlled status lifecycle:

```txt
Pending
  ↓
Assigned
  ↓
Picked Up
  ↓
In Transit
  ↓
Delivered
```

If a delivery problem happens, the parcel can be marked as:

```txt
Exception
```

### Status Meaning

| Status | Meaning |
|---|---|
| Pending | Parcel has been created but no driver has been assigned yet. |
| Assigned | A dispatcher has assigned the parcel to a driver. |
| Picked Up | Driver has collected the parcel. |
| In Transit | Parcel is currently being delivered. |
| Delivered | Parcel has successfully reached the recipient. |
| Exception | Delivery has an issue, such as unavailable customer or failed attempt. |

---

## Demo Roles

The homepage allows users to enter the demo environment using predefined roles.

### Dispatcher

```txt
user: dispatch@swiftroute.ph
pass: demo2024
```

Responsibilities:

- Manage all bookings
- Assign drivers
- Monitor deliveries
- Resolve exceptions

### Driver

```txt
user: marco@swiftroute.ph
pass: demo2024
```

Responsibilities:

- View assigned pickups and drops
- Update parcel statuses
- Handle delivery progress

### Merchant

```txt
user: ops@techgadgets.ph
pass: demo2024
```

Responsibilities:

- Create bookings
- Review shipment history
- Check billing details

---

## Main App Features

### Role-Based Portal

The app separates access by user role. Each role has its own dashboard and business purpose.

### Parcel Management

The system stores sample parcel data including:

- Tracking number
- Merchant name
- Recipient name
- Recipient phone
- Delivery address
- Parcel weight
- Delivery amount
- Assigned driver
- Delivery status
- Notes or special instructions

### Driver Assignment

Dispatchers can assign available drivers to pending parcels.

Driver data includes:

- Driver name
- Phone number
- Vehicle type
- Plate number
- Current load
- Maximum capacity
- Current status

### Merchant Records

The app includes sample merchant records with:

- Merchant name
- Balance
- Spending history
- Total shipments

### Operational Dashboard

The dispatcher dashboard is designed to show the current health of the operation, including delivery activity, pending parcels, assigned parcels, and exceptions.

### Debug Border Mode

The app includes a temporary debug mode for checking layout boundaries.

Open:

```txt
http://localhost:5173/?debugBorders=1
```

This injects temporary red outlines around elements without changing the layout.

Use the normal URL to disable it:

```txt
http://localhost:5173/
```

---

## Tech Stack

- React
- Vite
- JavaScript
- Lucide React icons
- Inline React styling
- Demo/static data

---

## Project Structure

Important files:

```txt
package.json
vite.config.js
index.html
src/main.jsx
src/App.jsx
src/index.css
docs/screenshots/homepage.png
```

---

## Quick Start

### 1. Install dependencies

Using npm:

```bash
npm install
```

Using pnpm:

```bash
pnpm install
```

---

### 2. Run the development server

Using npm:

```bash
npm run dev
```

Using pnpm:

```bash
pnpm run dev
```

Then open:

```txt
http://localhost:5173/
```

---

### 3. Build for production

Using npm:

```bash
npm run build
npm run preview
```

Using pnpm:

```bash
pnpm run build
pnpm run preview
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the app for production. |
| `npm run preview` | Previews the production build locally. |
| `npm run build:direct` | Runs the direct Vite build command. |

---

## Notes

This is currently a front-end demo. The data is simulated inside the app and is not connected to a production backend.

A production version would require:

- Real authentication
- Database-backed parcel records
- Driver accounts
- Merchant accounts
- Dispatcher/admin permissions
- Real-time delivery updates
- Audit logs
- Billing records
- API validation
- Secure role-based access control
- Deployment pipeline

---

## Recommended Next Improvements

- Add real login authentication
- Connect parcel data to a database
- Add merchant booking form validation
- Add dispatcher assignment rules
- Add driver status update history
- Add delivery proof upload
- Add real-time parcel tracking
- Add printable delivery reports
- Add billing and invoice module
- Add mobile responsive driver view

---

## License

This project is for demo and learning purposes.
