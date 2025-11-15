# Lifely - Life Simulator

A modern, text-based life simulation game built with Next.js, React, TypeScript, and cutting-edge web technologies.

## Features

- **Dynamic Life Simulation**: Start as an 18-year-old and make decisions that shape your character's life
- **Multiple Stats**: Manage Health, Morale, Intellect, and Looks
- **Career System**: Apply for jobs ranging from entry-level positions to high-paying careers
- **Activities**: Improve your stats through various activities like gym, library, restaurants, and more
- **Financial System**: Manage cash and bank accounts, take loans, and build wealth
- **Random Events**: Experience life's unpredictability with random events each month
- **Beautiful UI**: Modern, dark-themed interface with smooth animations
- **Persistent State**: Your progress is automatically saved to localStorage

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Jotai
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts (for future stats visualization)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lifely
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

1. **Start Your Life**: Click "Begin Your Life" to start with a random character
2. **Age Up**: Click "Age 1 Month" to progress time
3. **Actions**: Access jobs, bank, education, and profile
4. **Activities**: Do activities to improve your stats
5. **Manage Stats**: Keep your stats balanced to avoid negative events

## Game Mechanics

### Stats
- **Health** (0-100): Your physical well-being
- **Morale** (0-100): Your mental happiness
- **Intellect** (0-100): Your intelligence and knowledge
- **Looks** (0-100): Your physical appearance

### Jobs
- Apply for various jobs based on your education
- Earn monthly salary
- Get promoted with salary increases
- Build your career over time

### Activities
- **Gym**: Improves health and looks
- **Library**: Increases intellect
- **Hospital**: Restores health
- **Restaurant**: Boosts morale
- **Vacation**: Major morale boost
- **Gambling**: Risk money for potential rewards

### Banking
- Deposit cash into your bank account
- Withdraw money when needed
- Track your net worth

## Project Structure

```
lifely/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main game page
├── components/
│   ├── game/                # Game-specific components
│   │   ├── GameLayout.tsx   # Main game layout
│   │   ├── TopPanel.tsx     # Money and age display
│   │   ├── Console.tsx      # Activity feed
│   │   ├── StatsPanel.tsx   # Stats display
│   │   ├── BottomPanel.tsx  # Action buttons
│   │   └── dialogs/         # Game dialogs
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── atoms/               # Jotai state atoms
│   ├── data/                # Game data (jobs, names, countries)
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
└── old_code/                # Original codebase (for reference)
```

## Future Enhancements

- [ ] Education system with colleges and degrees
- [ ] Asset ownership (houses, cars)
- [ ] Relationships and family
- [ ] More random events and storylines
- [ ] Achievement system
- [ ] Statistics and life timeline visualization
- [ ] Multiple save slots
- [ ] Sound effects and music
- [ ] Mobile responsiveness improvements

## Development History

This project is a complete revamp of the original Lifely game, which was built with vanilla JavaScript, HTML, and CSS. The new version uses modern web technologies for better performance, maintainability, and user experience.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Credits

Original concept and game design: CarboxyDev
Modern revamp: Claude AI + CarboxyDev

---

**Note**: This is a game in active development. Features and gameplay may change.
