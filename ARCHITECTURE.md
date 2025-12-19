# Architecture Documentation

## Overview

Solar Jetman Password Generator is a client-side web application that generates valid passwords for the NES game Solar Jetman. The application is built with vanilla JavaScript, HTML, and CSS—no frameworks or build tools required.

## Design Principles

1. **Zero Dependencies**: No external libraries or frameworks
2. **Client-Side Only**: All logic runs in the browser
3. **Progressive Enhancement**: Works with JavaScript, gracefully handles errors
4. **Responsive Design**: Mobile-first, works on all screen sizes
5. **Static Hosting**: Can be served from any web server or opened directly

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    index.html                          │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   Form UI    │  │    Modal     │  │   Footer    │ │ │
│  │  │   Inputs     │  │  (About)     │  │  Copyright  │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                           ↓                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                     app.js                             │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Event Handlers & UI Logic                       │ │ │
│  │  │  - Form submission                                │ │ │
│  │  │  - Input validation                               │ │ │
│  │  │  - Modal management                               │ │ │
│  │  │  - Error display                                  │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                           ↓                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              password-generator.js                     │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  PasswordGenerator Class                         │ │ │
│  │  │  - Password array management                      │ │ │
│  │  │  - Score processing                               │ │ │
│  │  │  - Equipment handling                             │ │ │
│  │  │  - Checksum calculation                           │ │ │
│  │  │  - Character encoding                             │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                           ↓                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   styles.css                           │ │
│  │  - Responsive layout (mobile-first)                    │ │
│  │  - Modern, clean design                                │ │
│  │  - Modal styling                                       │ │
│  │  - Print styles                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. HTML Layer (`index.html`)

**Purpose**: Document structure and semantic markup

**Key Elements**:
- **Form** (`#passwordForm`): Contains all input controls
- **Dropdowns**: Level, Map Type, Pod, Lives
- **Text Input**: Score (0-999999)
- **Checkboxes**: Shields, Thrusters
- **Output Field**: Generated password (read-only)
- **Modal**: About dialog
- **Buttons**: Generate, About

**Design Decisions**:
- Semantic HTML5 elements for accessibility
- Form-based interaction (works without JS for basic functionality)
- Read-only output field prevents accidental editing
- Modal overlay for non-intrusive information

### 2. Password Generator (`password-generator.js`)

**Purpose**: Core password generation algorithm

**Class**: `PasswordGenerator`

**Data Structures**:
```javascript
passwordCharArray = ['B', 'D', 'G', 'H', 'K', 'L', 'M', 'N', 
                     'P', 'Q', 'R', 'T', 'V', 'W', 'X', 'Z']
passwordArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 12 elements
```

**Key Methods**:

1. **`isValidScore(score)`**
   - Validates score is 0-999999
   - Checks for numeric input only
   - Returns boolean

2. **`handleScore(score)`**
   - Pads score to 6 digits
   - Distributes digits to password array indices: [1, 5, 4, 6, 7, 11]
   - Algorithm: Each digit contributes to specific array positions

3. **`handleLives(lives)`**
   - Adds lives count directly to position [0]
   - Range: 0-15

4. **`handleLevel(levelIndex)`**
   - Position [2] = floor(levelIndex / 4)
   - Position [8] = (levelIndex % 4) * 4
   - Supports 64 levels (0-63)

5. **`handlePod(index)`**
   - Adds to position [10]:
     - Standard: 0
     - Nippon Sports: +4
     - Italian Racing: +8
     - Invalid: +12

6. **`handleShields(hasShields)`**
   - If true, adds 2 to position [10]

7. **`handleThrusters(hasThrusters)`**
   - If true, adds 1 to position [10]

8. **`handleMap(mapIndex)`**
   - Adds to position [8]:
     - None: 0
     - Mapping Device: +1
     - Super Mapping: +2
     - Invalid: +3

9. **`calculateChecksum()`**
   - Position [9] = (((arr[6] ^ arr[7]) + arr[8]) ^ arr[10]) + arr[11]
   - Position [3] = ((((arr[0] ^ arr[1]) + arr[2]) ^ arr[4]) + arr[5] + floor(arr[9] / 16))
   - Position [9] += (arr[3] >= 16) ? 1 : 0
   - Position [3] %= 16
   - Position [9] %= 16
   - **Critical**: Checksum ensures password validity in game

10. **`generateCode()`**
    - Calculates checksum
    - Maps each array index to character using passwordCharArray
    - Returns 12-character string

**Algorithm Flow**:
```
Input Parameters
    ↓
Initialize Array [0,0,0,0,0,0,0,0,0,0,0,0]
    ↓
Apply Lives → arr[0]
    ↓
Apply Score → arr[1,4,5,6,7,11]
    ↓
Apply Level → arr[2,8]
    ↓
Apply Map → arr[8]
    ↓
Apply Pod/Shields/Thrusters → arr[10]
    ↓
Calculate Checksum → arr[3,9]
    ↓
Map to Characters → 12-char password
```

### 3. Application Logic (`app.js`)

**Purpose**: UI event handling and form management

**Key Functions**:

1. **`generatePassword()`**
   - Collects form values
   - Creates PasswordGenerator instance
   - Validates score
   - Calls generator methods in correct order
   - Displays result or error

2. **Event Listeners**:
   - Form submit: Prevents default, generates password
   - About button: Opens modal
   - Modal close: Click X, click outside, press Escape
   - Score input: Filters non-numeric characters

**Initialization**:
- DOMContentLoaded event ensures DOM is ready
- Generates initial password on page load
- Sets up all event listeners

### 4. Styling (`styles.css`)

**Purpose**: Visual design and responsive layout

**CSS Architecture**:
- CSS Custom Properties (variables) for theming
- Mobile-first responsive design
- Flexbox layout for form rows
- Modal overlay with centered content
- Print-friendly styles

**Responsive Breakpoints**:
- Desktop: Default (600px+)
- Mobile: < 600px (stacked layout, full-width buttons)

**Design Features**:
- Gradient background
- Card-based container
- Hover effects on buttons
- Focus states for accessibility
- Error message styling
- Modal animations

## Data Flow

### User Interaction Flow

```
1. User enters parameters in form
   ↓
2. User clicks "Generate" button
   ↓
3. app.js captures submit event
   ↓
4. app.js validates score input
   ↓
5. app.js creates PasswordGenerator instance
   ↓
6. app.js calls generator methods in sequence
   ↓
7. PasswordGenerator processes each parameter
   ↓
8. PasswordGenerator calculates checksum
   ↓
9. PasswordGenerator encodes to characters
   ↓
10. app.js displays password in output field
```

### Password Generation Sequence

```javascript
generator.reset()                    // Clear array
generator.handleLives(lives)         // Position [0]
generator.handleScore(score)         // Positions [1,4,5,6,7,11]
generator.handlePod(pod)            // Position [10]
generator.handleShields(shields)    // Position [10]
generator.handleThrusters(thrusters)// Position [10]
generator.handleLevel(level)        // Positions [2,8]
generator.handleMap(map)            // Position [8]
password = generator.generateCode() // Calculate checksum, encode
```

**Note**: Order matters! Each method modifies the password array, and the checksum depends on final values.

## Key Design Decisions

### 1. Why Vanilla JavaScript?

**Pros**:
- Zero dependencies = smaller footprint
- No build process = simpler deployment
- Direct browser compatibility
- Easier to understand and maintain
- Works offline immediately

**Cons Considered**:
- More verbose code
- Manual DOM manipulation
- No reactivity framework

**Decision**: Given the small scope and static nature, vanilla JS is ideal.

### 2. Why Client-Side Only?

**Pros**:
- No server costs
- Works on GitHub Pages for free
- Instant response (no network latency)
- User privacy (no data sent to server)
- Can work offline

**Cons Considered**:
- Can't protect algorithm (not a concern here)
- No server-side validation (not needed)

**Decision**: Client-side perfectly suits this use case.

### 3. File Organization

**Single Directory** (`docs/`):
- Simpler GitHub Pages configuration
- All assets in one place
- No complex routing
- Easy to deploy anywhere

### 4. Character Encoding

The password uses a 16-character alphabet (base-16), avoiding vowels and potentially confusing characters:
- Included: B, D, G, H, K, L, M, N, P, Q, R, T, V, W, X, Z
- Excluded: A, C, E, F, I, J, O, S, U, Y (vowels, similar shapes)

This matches the original NES game's design for clear password entry.

## Security Considerations

1. **Input Validation**: Score is validated client-side
2. **XSS Prevention**: No user input is rendered as HTML
3. **No External Requests**: Fully self-contained
4. **No Sensitive Data**: Password generation algorithm is public knowledge

## Performance

- **Initial Load**: < 50KB total (HTML + CSS + JS)
- **Password Generation**: < 1ms
- **No Backend Calls**: Instant response
- **Memory Usage**: Minimal (single small array)

## Extensibility

### Adding New Features

**New Game Parameter**:
1. Add HTML form element to `index.html`
2. Add corresponding handler method to `PasswordGenerator`
3. Call method in `generatePassword()` function
4. Update password array logic
5. Test checksum calculation

**UI Enhancements**:
1. Update `styles.css` for visual changes
2. Add event listeners in `app.js` for interactions
3. Ensure responsive design is maintained

**Validation Rules**:
1. Add validation function to `PasswordGenerator`
2. Call from `generatePassword()` before processing
3. Display appropriate error message

## Testing Strategy

### Manual Testing Checklist
- [ ] Default values generate correct password
- [ ] All dropdowns change password correctly
- [ ] Score validation accepts 0-999999
- [ ] Score validation rejects invalid input
- [ ] Checkboxes toggle correctly
- [ ] About modal opens and closes
- [ ] Responsive design works on mobile
- [ ] Password is selectable/copyable

### Automated Testing
- Create `test.html` with known input/output pairs
- Use assertions to verify algorithm accuracy
- Compare with original Java implementation results

## Browser Compatibility

**Required Features**:
- ES6 Classes
- Array methods (fill, padStart)
- DOM APIs (querySelector, addEventListener)
- CSS Grid/Flexbox
- CSS Custom Properties

**Minimum Versions**:
- Chrome 49+
- Firefox 45+
- Safari 10+
- Edge 14+

## Deployment

### GitHub Pages Setup
1. Push to repository
2. Enable GitHub Pages from Settings
3. Select source: `/docs` directory
4. Access at `https://[user].github.io/[repo]/`

### Alternative Hosting
- Any static web host (Netlify, Vercel, etc.)
- File:// protocol (local filesystem)
- Python/Node.js local server for development

## Future Enhancements

Potential improvements (not currently implemented):

1. **Password Decoding**: Reverse-engineer a password to show what it unlocks
2. **Share URL**: Encode parameters in URL query string
3. **Local Storage**: Remember last-used values
4. **Copy Button**: One-click password copying
5. **Dark Mode**: Alternative color scheme
6. **Keyboard Shortcuts**: Quick access to generate button
7. **PWA**: Add manifest for "install" capability
8. **Accessibility**: Enhanced ARIA labels and keyboard navigation

## Maintenance

### Updating the Algorithm
If the password generation algorithm changes:
1. Update `PasswordGenerator` class methods
2. Verify checksum calculation logic
3. Test with known good passwords from the game
4. Update documentation and test cases

### CSS Updates
- Maintain mobile-first approach
- Test on multiple screen sizes
- Preserve print styles
- Keep accessibility features

### Documentation
- Keep README.md synchronized with features
- Update this ARCHITECTURE.md for structural changes
- Maintain COPILOT.md with new coding patterns

---

**Last Updated**: 2025-12-16
