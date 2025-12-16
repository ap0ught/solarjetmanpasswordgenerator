# GitHub Copilot Guide

This guide provides practical GitHub Copilot prompts and coding patterns for working with the Solar Jetman Password Generator project.

## 🎯 Overview

This project uses vanilla JavaScript, HTML, and CSS with no build tools or frameworks. Copilot can help you:
- Implement new features quickly
- Refactor code safely
- Write validation logic
- Create tests
- Update documentation

## 🚀 Quick Start Prompts

### Understanding the Code

```
# Show me how the password generation algorithm works
# Explain the checksum calculation in password-generator.js
# What does the handleScore method do?
# Walk me through the data flow from form submission to password display
```

### Navigation

```
# Where is the password validation logic?
# Show me all the event listeners in the app
# Find where the modal is implemented
# Which file handles the UI interactions?
```

## 🔧 Common Coding Patterns

### 1. Adding a New Game Parameter

**Scenario**: Add support for a new game feature (e.g., "Fuel Level")

**Copilot Prompt**:
```
// Add a fuel level parameter (0-100) to the password generator
// 1. Add a dropdown in index.html after the Lives field
// 2. Add handleFuel(level) method to PasswordGenerator class
// 3. Update the password array at position [X] based on fuel value
// 4. Call handleFuel in the generatePassword function
```

**Expected Pattern**:

In `index.html`:
```html
<div class="form-group">
    <label for="fuel">Fuel Level:</label>
    <select id="fuel" name="fuel">
        <option value="0">Empty</option>
        <option value="50">Half</option>
        <option value="100">Full</option>
    </select>
</div>
```

In `password-generator.js`:
```javascript
/**
 * Handle the fuel level portion of the password
 * @param {number} fuelLevel - Fuel level 0-100
 */
handleFuel(fuelLevel) {
    // Determine which password array position to modify
    this.passwordArray[X] += Math.floor(fuelLevel / Y);
}
```

In `app.js`:
```javascript
const fuel = parseInt(document.getElementById('fuel').value, 10);
generator.handleFuel(fuel);
```

### 2. Adding Input Validation

**Copilot Prompt**:
```
// Add validation to ensure the level selection is within valid range
// Return an error message if invalid
// Display the error using the existing showError function
```

**Expected Pattern**:
```javascript
function validateLevel(level) {
    if (level < 0 || level > 63) {
        showError('Level must be between 1 and 64');
        return false;
    }
    return true;
}
```

### 3. Adding a New UI Feature

**Scenario**: Add a "Copy Password" button

**Copilot Prompt**:
```
// Add a "Copy to Clipboard" button next to the password field
// When clicked, copy the password to clipboard
// Show a temporary success message
// Style it to match existing buttons
```

**Expected Implementation**:

HTML:
```html
<div class="password-output-group">
    <input type="text" id="password" name="password" readonly>
    <button type="button" id="copyBtn" class="btn btn-icon">📋</button>
</div>
```

JavaScript:
```javascript
document.getElementById('copyBtn').addEventListener('click', async function() {
    const password = document.getElementById('password').value;
    try {
        await navigator.clipboard.writeText(password);
        showSuccess('Password copied to clipboard!');
    } catch (err) {
        showError('Failed to copy password');
    }
});
```

### 4. Refactoring for Maintainability

**Copilot Prompt**:
```
// Refactor the generatePassword function to separate concerns
// Extract form data collection into getFormData()
// Extract generator configuration into configureGenerator()
// Make the code more testable
```

**Expected Pattern**:
```javascript
function getFormData() {
    return {
        score: document.getElementById('score').value,
        lives: parseInt(document.getElementById('lives').value, 10),
        level: parseInt(document.getElementById('level').value, 10),
        mapType: parseInt(document.getElementById('mapType').value, 10),
        pod: parseInt(document.getElementById('pod').value, 10),
        hasShields: document.getElementById('shields').checked,
        hasThrusters: document.getElementById('thrusters').checked
    };
}

function configureGenerator(generator, data) {
    generator.reset();
    generator.handleLives(data.lives);
    generator.handleScore(data.score);
    generator.handlePod(data.pod);
    generator.handleShields(data.hasShields);
    generator.handleThrusters(data.hasThrusters);
    generator.handleLevel(data.level);
    generator.handleMap(data.mapType);
}

function generatePassword() {
    const data = getFormData();
    const generator = new PasswordGenerator();
    
    if (!generator.isValidScore(data.score)) {
        showError('Score should be between 0 and 999999.');
        return;
    }
    
    configureGenerator(generator, data);
    const password = generator.generateCode();
    document.getElementById('password').value = password;
}
```

### 5. Writing Tests

**Copilot Prompt**:
```
// Create a test function that verifies password generation
// Test case 1: Default values should generate "BBBBBBBBBBBB"
// Test case 2: Level 1, 5 lives, score 12345 should generate specific password
// Test case 3: All maximum values
// Return true if all tests pass
```

**Expected Pattern**:
```javascript
function runTests() {
    const tests = [];
    
    // Test 1: Default values
    tests.push({
        name: 'Default values',
        input: { lives: 0, score: '0', level: 0, map: 0, pod: 0, shields: false, thrusters: false },
        expected: 'BBBBBBBBBBBB'
    });
    
    // Test 2: Custom values
    tests.push({
        name: 'Level 1, 5 lives, score 12345',
        input: { lives: 5, score: '12345', level: 0, map: 0, pod: 0, shields: false, thrusters: false },
        expected: 'LLBNHKGDBHBB'
    });
    
    let passed = 0;
    tests.forEach(test => {
        const generator = new PasswordGenerator();
        generator.handleLives(test.input.lives);
        generator.handleScore(test.input.score);
        generator.handleLevel(test.input.level);
        generator.handleMap(test.input.map);
        generator.handlePod(test.input.pod);
        generator.handleShields(test.input.shields);
        generator.handleThrusters(test.input.thrusters);
        
        const result = generator.generateCode();
        const success = result === test.expected;
        
        console.log(`${success ? '✓' : '✗'} ${test.name}: ${result} ${success ? '==' : '!='} ${test.expected}`);
        if (success) passed++;
    });
    
    console.log(`\n${passed}/${tests.length} tests passed`);
    return passed === tests.length;
}
```

## 🎨 Styling Patterns

### Adding Responsive Styles

**Copilot Prompt**:
```
// Add a new form section with responsive layout
// Should be full-width on mobile, side-by-side on desktop
// Match existing color scheme and spacing
```

**Expected Pattern**:
```css
.new-form-section {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.new-form-section > * {
    flex: 1;
    min-width: 200px;
}

@media (max-width: 600px) {
    .new-form-section {
        flex-direction: column;
    }
}
```

### Dark Mode Support

**Copilot Prompt**:
```
// Add dark mode support using CSS custom properties
// Toggle with a button in the header
// Persist preference in localStorage
```

**Expected Pattern**:
```css
:root {
    --bg-color: #ffffff;
    --text-color: #2c3e50;
}

[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
```

## 🐛 Debugging Patterns

### Logging Password Array State

**Copilot Prompt**:
```
// Add a debug mode that logs the password array state after each operation
// Show which positions are modified by each handler
// Make it toggleable with a query parameter ?debug=true
```

**Expected Pattern**:
```javascript
const DEBUG = new URLSearchParams(window.location.search).get('debug') === 'true';

function debugLog(method, array) {
    if (DEBUG) {
        console.log(`After ${method}:`, array.join(','));
    }
}

// In PasswordGenerator methods:
handleLives(lives) {
    this.passwordArray[0] += lives;
    debugLog('handleLives', this.passwordArray);
}
```

### Validating Against Original

**Copilot Prompt**:
```
// Create a function that compares output with known-good passwords from the original Java version
// Load test cases from a JSON file
// Report any mismatches
```

## 📝 Documentation Patterns

### Adding JSDoc Comments

**Copilot Prompt**:
```
// Add comprehensive JSDoc comments to the PasswordGenerator class
// Include parameter types, return types, and examples
// Document the algorithm for each method
```

**Expected Pattern**:
```javascript
/**
 * Handles the score portion of the password generation
 * 
 * The score is padded to 6 digits and each digit is added to specific
 * positions in the password array according to the game's algorithm.
 * 
 * @param {string} score - The player's score (0-999999)
 * @throws {Error} If score is invalid (checked by isValidScore first)
 * @example
 * generator.handleScore('12345');
 * // Adds: 1->arr[1], 2->arr[5], 3->arr[4], 4->arr[6], 5->arr[7], 0->arr[11]
 */
handleScore(score) {
    // Implementation
}
```

### Updating README

**Copilot Prompt**:
```
// Update README.md to document the new fuel level feature
// Add it to the feature list
// Include usage instructions
// Update the example screenshot description
```

## 🔄 Migration Patterns

### Converting from jQuery to Vanilla JS

If you're familiar with jQuery patterns:

**Copilot Prompt**:
```
// Convert this jQuery code to vanilla JavaScript:
// $('#myButton').on('click', function() { ... });
// $('.myClass').hide();
// $('#myInput').val('text');
```

**Cheat Sheet**:
```javascript
// jQuery -> Vanilla JS
$('#id')                  -> document.getElementById('id')
$('.class')               -> document.querySelectorAll('.class')
$el.on('click', fn)       -> el.addEventListener('click', fn)
$el.val()                 -> el.value
$el.text()                -> el.textContent
$el.hide()                -> el.style.display = 'none'
$el.show()                -> el.style.display = 'block'
```

## 🧪 Testing with Copilot

### Creating Test Files

**Copilot Prompt**:
```
// Create a test.html file that runs automated tests
// Include the password-generator.js file
// Display test results in a table
// Color-code pass/fail results
// Add a button to re-run tests
```

### Edge Case Testing

**Copilot Prompt**:
```
// Generate test cases for edge conditions:
// - Minimum values (all zeros)
// - Maximum values (15 lives, 999999 score, level 64, all equipment)
// - Boundary values (1 life, 1 score, level 1)
// - Invalid inputs (negative score, text in score field)
```

## 🚀 Performance Optimization

**Copilot Prompt**:
```
// Optimize the password generation for multiple consecutive calls
// Cache the character array
// Reuse the generator instance
// Measure and log performance
```

## 📱 Mobile Enhancements

**Copilot Prompt**:
```
// Add touch-friendly improvements for mobile
// Increase button touch targets to 44px
// Add haptic feedback on button press (if supported)
// Optimize form layout for mobile keyboards
```

## ♿ Accessibility Improvements

**Copilot Prompt**:
```
// Improve accessibility for screen readers
// Add ARIA labels to all form controls
// Ensure keyboard navigation works throughout
// Add focus indicators for all interactive elements
// Test with axe-core accessibility checker
```

## 🎓 Learning Resources

When working with this codebase, useful Copilot queries:

```
# How does XOR work in JavaScript?
# Explain the modulo operator in the checksum calculation
# What is the difference between == and === in JavaScript?
# How do I use Array.fill() to initialize an array?
# What's the best way to validate numeric input in JavaScript?
# How can I make my CSS more maintainable?
# What are CSS custom properties and how do I use them?
```

## 💡 Best Practices

### When Using Copilot on This Project

1. **Be Specific**: "Add a fuel parameter that modifies passwordArray[5]" is better than "add fuel"
2. **Provide Context**: Include the class name and method you're working in
3. **Reference Existing Code**: "Following the pattern of handleLives, create handleFuel"
4. **Request Tests**: Always ask for test cases with new features
5. **Ask for Documentation**: Request JSDoc comments and README updates
6. **Consider Edge Cases**: Prompt Copilot to think about validation and error handling

### Code Style Consistency

When prompting Copilot, include:
```
// Follow the existing code style:
// - Use const/let, not var
// - Use template literals for strings with variables
// - Add JSDoc comments for all public methods
// - Use descriptive variable names
// - Handle errors gracefully
```

## 🎯 Project-Specific Patterns

### Password Array Indices

Remember when prompting Copilot about password array modifications:
```
// Password array positions:
// [0]  = Lives
// [1]  = Score digit 6
// [2]  = Level (floor(index/4))
// [3]  = Checksum part 1
// [4]  = Score digit 4
// [5]  = Score digit 5
// [6]  = Score digit 3
// [7]  = Score digit 2
// [8]  = Level (index%4)*4 + Map
// [9]  = Checksum part 2
// [10] = Pod + Shields + Thrusters
// [11] = Score digit 1
```

### Character Mapping

```
// Character array indices 0-15 map to:
// B(0), D(1), G(2), H(3), K(4), L(5), M(6), N(7),
// P(8), Q(9), R(10), T(11), V(12), W(13), X(14), Z(15)
```

## 📚 Additional Prompts by Task

### Bug Fixing
```
# Find why the password doesn't change when I update the score
# Debug why the modal doesn't close on mobile
# Fix the validation that allows negative scores
# Investigate why the generated password is always the same
```

### Feature Requests
```
# Add URL sharing feature to share password configurations
# Implement password decoding (reverse engineering)
# Add a history of recently generated passwords
# Create an export feature to save passwords as CSV
```

### Refactoring
```
# Separate concerns in app.js - split UI and business logic
# Extract magic numbers into named constants
# Reduce code duplication in the handler methods
# Make the code more functional and less imperative
```

### Documentation
```
# Document the password algorithm in plain English
# Create a flowchart of the password generation process
# Write a beginner's guide to contributing
# Add inline comments explaining the checksum calculation
```

---

**Pro Tip**: When in doubt, ask Copilot to explain existing code before making changes. Use prompts like "Explain this function" or "What does this code do?" to understand before modifying.

**Remember**: Copilot is a tool to help you code faster, but always review and test its suggestions. The patterns above are proven to work well with this codebase.

---

**Last Updated**: 2025-12-16
