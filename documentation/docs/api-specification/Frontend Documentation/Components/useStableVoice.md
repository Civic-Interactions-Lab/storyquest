---
sidebar_position: 6
---

# useStableVoice Hook

`useStableVoice.ts`:  
This custom React hook provides a stable, consistent voice selection for the browser's `speechSynthesis` API. It ensures that the same preferred voice is used across multiple playback sessions, preventing the browser from automatically switching to other available voices during gameplay.

---

## Purpose

Modern browsers can dynamically change which voices are available during gameplay or session reloads. This hook ensures that a single, stable voice is selected and used throughout the session, improving continuity and user experience in voice driven interactions.

---

## API

### Returns

| Name    | Type                           | Description                                                                                              |
| ------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `ready` | `boolean`                      | Indicates whether the speech synthesis voices are loaded and a preferred voice has been selected.        |
| `speak` | `(text: string) => void`       | Speaks the given text using the selected stable voice. Cancels any ongoing speech before speaking again. |
| `voice` | `SpeechSynthesisVoice \| null` | The currently selected stable voice. May be `null` if voices have not finished loading.                  |

---

## Internal Logic / Example Usage

### Voice Selection

The hook maintains a prioritized list of preferred voice names:

```ts
const PREFERRED_NAMES = [
  "Samantha",
  "Ava",
  "Karen",
  "Google US English",
  "Microsoft Aria Online (Natural)",
  "Microsoft Zira Desktop",
];
```
