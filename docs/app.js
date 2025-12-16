/**
 * Application JavaScript for Solar Jetman Password Generator
 * Handles UI interactions and form submission
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('passwordForm');
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeModal = document.querySelector('.close');
    const errorMessage = document.getElementById('errorMessage');

    // Form submission handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        generatePassword();
    });

    // About button handler
    aboutBtn.addEventListener('click', function() {
        aboutModal.style.display = 'flex';
    });

    // Close modal handlers
    closeModal.addEventListener('click', function() {
        aboutModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && aboutModal.style.display === 'flex') {
            aboutModal.style.display = 'none';
        }
    });

    // Score input validation - only allow digits
    const scoreInput = document.getElementById('score');
    scoreInput.addEventListener('input', function(event) {
        // Remove non-digit characters
        this.value = this.value.replace(/[^\d]/g, '');
    });

    /**
     * Generate the password based on form inputs
     */
    function generatePassword() {
        // Hide any previous error messages
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        // Get form values
        const score = document.getElementById('score').value;
        const lives = parseInt(document.getElementById('lives').value, 10);
        const level = parseInt(document.getElementById('level').value, 10);
        const mapType = parseInt(document.getElementById('mapType').value, 10);
        const pod = parseInt(document.getElementById('pod').value, 10);
        const hasShields = document.getElementById('shields').checked;
        const hasThrusters = document.getElementById('thrusters').checked;

        // Create password generator instance
        const generator = new PasswordGenerator();

        // Validate score
        if (!generator.isValidScore(score)) {
            showError('Score should be between 0 and 999999.');
            return;
        }

        // Reset the generator
        generator.reset();

        // Process all inputs
        generator.handleLives(lives);
        generator.handleScore(score);
        generator.handlePod(pod);
        generator.handleShields(hasShields);
        generator.handleThrusters(hasThrusters);
        generator.handleLevel(level);
        generator.handleMap(mapType);

        // Generate and display password
        const password = generator.generateCode();
        document.getElementById('password').value = password;
    }

    /**
     * Display an error message
     * @param {string} message - The error message to display
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        document.getElementById('password').value = '';
    }

    // Generate initial password on page load
    generatePassword();
});
