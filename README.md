# publicrecord.fyi

A seizure-proof, decentralized archive of verified public records. Protecting transparency through permanent architecture.

## Tech Stack

- **Core**: Next.js 15+ (App Router)
- **Database**: Supabase
- **Styling**: Tailwind CSS 4+ (Neo-Brutalist Aesthetic)
- **Resilience**: Integrated IPFS pinning & BitTorrent metadata

## Architecture

This registry is designed to outlive any single domain or central server:
1. **Mirrors**: Accessible via Tor and common IPFS gateways.
2. **Persistence**: Evidence is pinned to IPFS upon submission.
3. **Redundancy**: "Fork & Eject" tools allow anyone to dump the entire archive into a static, offline-browsable version.

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase Account (for database & storage)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd publicrecord.fyi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env.local` and fill in your Supabase credentials.

4. Run the development server:
   ```bash
   npm run dev
   ```

## Ejecting the Archive

To create an offline backup of all metadata and files:
```bash
npm run eject -- --download
```
This generates an `eject_archive/` directory with a standalone `index.html`.

## Legal Disclaimer

This project aggregates public records obtained via official FOIA/state transparency laws. Information is provided "as is".
