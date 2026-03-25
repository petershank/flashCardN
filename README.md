# flashCardN

A flashcard app that supports cards with N sides (arbitrary fields).

## Features

- Display flashcards with any number of fields
- Navigate forward/backward through cards
- Shuffle and reset deck order
- Hide/show individual field values for self-testing
- Keyboard shortcuts for all actions

## Usage

### Controls

- **Next card**: Click "Next" button, press `n`, or press `→` (right arrow)
- **Previous card**: Click "Previous" button, press `p`, or press `←` (left arrow)
- **Shuffle**: Click "Shuffle" button or press `s`
- **Reset**: Click "Reset" button or press `r`
- **Toggle field visibility**: Click a field or press its number (1, 2, 3, etc.)

### Deck Format

Place deck files in `decks/[deck-name]/deck.json`:

```json
{
  "name": "Deck Name",
  "description": "Deck description",
  "cards": [
    {
      "field1": "value1",
      "field2": "value2",
      "field3": "value3"
    }
  ]
}
```

Each card can have any number of fields with any field names.

## Development

This is a vanilla JavaScript/HTML/CSS application with no build step required.

To run locally:
1. Serve the directory with any static file server
2. Navigate to `index.html`

For deployment:
- **GitHub Pages**: Push to gh-pages branch
- **Deno Deploy**: Deploy as static site

## MVP Version

Current version is completely unstyled and includes:
- Basic card navigation
- Field visibility toggling
- Shuffle/reset functionality
- Sample US States deck

Future versions will add styling and additional features.
