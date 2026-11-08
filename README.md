# SheGuard — Smart Women Safety & Emergency Response System

<p align="center">
  <strong>Your Safety, Our Priority</strong><br/>
  A women-safety web application prototype designed to make emergency actions, location sharing, and trusted-contact management easier to access.
</p>

<p align="center">
  <img src="src/assets/hero-woman.png" alt="SheGuard illustration" width="260" />
</p>

## Project Overview

**SheGuard** is a B.Tech CSE mini-project frontend prototype for a women-safety and emergency-response platform. It brings essential safety tools together in a single interface, including an SOS flow, location display and sharing controls, trusted contacts, a rule-based risk check, and an emergency activity history.

The interface is designed around a clear, accessible dashboard with a pink-and-white visual theme, prominent emergency actions, and simple navigation.

> **Prototype notice:** This repository currently contains a frontend demonstration. The app uses illustrative/demo user information, contacts, history, and location coordinates. It does not currently provide a production emergency-alert service or guarantee that an SOS message is delivered to real contacts. Do not rely on this prototype during an actual emergency.

## Website Screenshots

Screenshots are not currently included in this repository. Add the images to `assets/screenshots/` and update this section with their exact filenames when they are available.

## Key Features

- **SOS interface:** A prominent SOS action and emergency-flow interface.
- **Location view:** Displays latitude, longitude, accuracy, location status, and map placeholder information.
- **Live location sharing UI:** Includes a sharing toggle, duration selection, and a start-sharing action.
- **Trusted contacts:** View, add, edit, delete, and designate a primary contact through the contacts interface.
- **Risk assessment:** A short questionnaire evaluates answers and displays a LOW, MEDIUM, or HIGH risk level with suggested safety actions.
- **Emergency history:** Displays a history of demo SOS alerts, location-sharing events, and risk checks.
- **Profile and settings:** Includes profile and preference screens such as notifications, location, shake alert, theme, and language settings.
- **Responsive application shell:** Sidebar navigation and a consistent dashboard layout.

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| TypeScript | Type-safe application code |
| TanStack Start | Application framework and routing |
| TanStack Router | File-based route navigation |
| Vite | Development server and build tooling |
| Tailwind CSS 4 | Styling |
| shadcn/ui and Radix UI | Reusable interface components |
| Lucide React | Icons |
| Recharts | Data visualization components |
| Vitest | Unit and application tests |

## Project Structure

```text
pixel-perfect-pixels-main/
├── public/                  # Public static files
├── assets/
│   └── screenshots/         # README website screenshots
├── src/
│   ├── assets/              # App illustrations and visual assets
│   ├── components/
│   │   ├── sheguard/        # SheGuard-specific UI components
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── app-store.tsx    # Shared app state
│   │   ├── mock-data.ts     # Demonstration data
│   │   └── risk.ts          # Rule-based risk assessment
│   ├── routes/              # Landing, auth, and dashboard pages
│   ├── test/                # Automated tests
│   ├── router.tsx
│   ├── server.ts
│   └── styles.css
├── package.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) (use a current LTS version)
- npm (included with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   ```

2. Move into the project directory:

   ```bash
   cd YOUR-REPOSITORY
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in your terminal (Vite commonly uses `http://localhost:5173`).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run format` | Format project files with Prettier |

## Risk Assessment Logic

The current risk checker is an **illustrative rule-based assessment**, not an AI/ML prediction model. It asks whether the user is travelling alone, it is late at night, the area is unfamiliar, the user feels unsafe, or someone may be following them.

The current scoring logic is:

- **HIGH:** Someone may be following the user, or at least four risk conditions are selected.
- **MEDIUM:** Two or three risk conditions are selected.
- **LOW:** Zero or one risk condition is selected.

The interface then presents general safety suggestions for the resulting level. This should not be treated as a validated safety assessment.

## Demo Data & Current Limitations

- Demo profile and contact details are defined in the frontend source.
- The displayed coordinates are sample values, not a user's verified live position.
- Contact and history state is maintained in the client-side application state.
- No production backend, authentication provider, SMS gateway, or emergency-service integration is configured in this project snapshot.
- The shake-to-alert setting is represented in the interface; device-level motion detection and a production alert workflow require further implementation and testing.
- Map presentation is currently a placeholder rather than a full map integration.

## Future Improvements

- Add secure backend authentication and persistent user accounts.
- Store trusted contacts and emergency history in a database.
- Integrate browser/device geolocation with clear permission handling.
- Implement reliable live-location updates and sharing controls.
- Connect SOS alerts to a verified notification service with delivery status.
- Implement and test shake-to-alert using supported device sensors.
- Replace the map placeholder with a real map provider.
- Add privacy controls, consent flows, and security testing.
- Conduct usability and safety testing before any real-world deployment.

## Contributing

Contributions and suggestions are welcome. For substantial changes, open an issue first to discuss the proposed update.

## Disclaimer

SheGuard is an academic frontend prototype created for learning and demonstration. It is **not a substitute for local emergency services, personal safety planning, or a tested emergency-response system**. Features shown with demo data must not be interpreted as live or operational emergency services.

## Author

Developed as a **B.Tech Computer Science mini-project**.

---

<p align="center">Made with care for safer, more connected communities.</p>
