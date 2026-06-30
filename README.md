# Project Usage Notes

## Direction of Use

This project is an influencer discovery interface with a saved list flow.

1. Start the app with `npm run dev`.
2. Choose a platform using the platform buttons.
3. Search by username or full name.
4. Open a profile to inspect details.
5. Use **Add to List** to save a profile to the persistent shortlist.
6. Review the saved list in the centered list section.
7. Remove items individually or clear the list when needed.

## Assumptions

- Persistence is handled locally in the browser through Zustand and `localStorage`.
- Duplicate entries are prevented for the same profile on the same platform.
- The app is designed around the provided JSON data and does not require a backend.

## What changed

- Fixed a startup `ENOENT` (-4058) by adding a root-level npm shim that forwards scripts into the app folder.
- Installed and validated dependencies for the nested app and removed `react-beautiful-dnd` (peer-conflict with React 19) to ensure CI/hosting builds succeed.
- Replaced React Context usage with a small persistent Zustand store (`src/store/selectedListStore.ts`) to manage the saved shortlist.
- Implemented `Add to List` (duplicate-safe) and persistent shortlist UI (`SelectedListPanel`) with remove/clear actions.
- Hardened profile loading (`src/utils/profileLoader.ts`) and fixed engagement-rate math in `src/utils/formatters.ts`.
- Extracted presentational components for the profile detail view and added a resilient NotFound route.
- Performance improvements: memoized list/card components and used shallow selectors to reduce re-renders.
- Removed unused components and dead dependencies (e.g., `SearchBar` and `react-beautiful-dnd`).
- Updated styling and layout (subdued purple→blue theme, centered shortlist) and cleaned up header UI.
- Verified `npm run build`, `npm run lint`, and `npm run dev` locally; pushed these changes to the project remote.


## Remaining improvements & Libraries used

- **Remaining improvements:**
	- No functional regressions or required fixes remain.
	- Optional future improvements: add unit/integration tests, enable reordering of the shortlist, add backend sync/auth, and run an accessibility audit.

- **Libraries used (high level):**
	- Core: React 19, react-dom
	- Routing: `react-router-dom` (v7)
	- State: `zustand` (with `persist` middleware)
	- Build/tooling: `vite`, `typescript`, `eslint`
	- Styling: `tailwindcss`
	- Dev / tooling helpers: ESLint plugins and TypeScript type packages (see `package.json` for exact versions)
	- Removed due to incompatibility: `react-beautiful-dnd` (peer conflict with React 19)


## Trade-offs

- The list is kept in the middle of the page to preserve visual balance, even though the interaction is intentionally simple.
- Local persistence keeps the implementation simple and fast, but it does not sync across devices or browsers.
- The UI uses a restrained purple-to-blue gradient and simpler surfaces instead of a highly decorative design, to keep the experience more standard and readable.
- Profile details are loaded from static JSON files, which keeps the app lightweight but limits dynamic data updates.
- The current architecture favors clear component boundaries and smaller presentational pieces over a more abstract shared UI layer.

## Notes

- `npm run build` passes successfully.
- If you run commands from the workspace root, use the root npm shim that forwards into `vibe-coder-assignment/`.
