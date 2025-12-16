/**
 * Solar Jetman Password Generator
 * JavaScript implementation of the password generation algorithm
 * 
 * Copyright (c) Shawn M. Crawford
 * Licensed under MIT License
 */

class PasswordGenerator {
    constructor() {
        // Character array used for password generation
        this.passwordCharArray = ['B', 'D', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'V', 'W', 'X', 'Z'];
        // Initialize password array with 12 elements
        this.passwordArray = new Array(12).fill(0);
    }

    /**
     * Reset the password array to zeros
     */
    reset() {
        this.passwordArray = new Array(12).fill(0);
    }

    /**
     * Check if the passed in score is a valid score
     * @param {string} score - The score to validate
     * @returns {boolean} true if valid, false otherwise
     */
    isValidScore(score) {
        // Check if score is null, empty, or not a whole number
        if (!score || score.trim() === '' || !this.isWholeNumber(score) || score.length > 6) {
            return false;
        }
        
        const scoreAsInt = parseInt(score, 10);
        return scoreAsInt >= 0 && scoreAsInt <= 999999;
    }

    /**
     * Check if a string represents a whole number
     * @param {string} str - The string to check
     * @returns {boolean} true if string represents a whole number
     */
    isWholeNumber(str) {
        const pattern = /^-?\d+$/;
        return pattern.test(str);
    }

    /**
     * Handle the score portion of the password
     * @param {string} score - The inputted score
     */
    handleScore(score) {
        // Pad the string to 6 places with 0's
        const fixedScore = score.padStart(6, '0');
        
        this.passwordArray[1] += this.getCharNumericValueFromString(fixedScore, 1);
        this.passwordArray[5] += this.getCharNumericValueFromString(fixedScore, 2);
        this.passwordArray[4] += this.getCharNumericValueFromString(fixedScore, 3);
        this.passwordArray[6] += this.getCharNumericValueFromString(fixedScore, 4);
        this.passwordArray[7] += this.getCharNumericValueFromString(fixedScore, 5);
        this.passwordArray[11] += this.getCharNumericValueFromString(fixedScore, 6);
    }

    /**
     * Get the numeric value of a char in a passed in string
     * @param {string} str - The passed in string
     * @param {number} lengthModifier - The int value to subtract from the string length
     * @returns {number} The numeric value of a char
     */
    getCharNumericValueFromString(str, lengthModifier) {
        const char = str.charAt(str.length - lengthModifier);
        return parseInt(char, 10);
    }

    /**
     * Handle the pod portion of the password
     * @param {number} index - The index the pod was located at in the form
     */
    handlePod(index) {
        if (index === 1) {
            // Nippon Sports Jetpod
            this.passwordArray[10] += 4;
        } else if (index === 2) {
            // Italian Racing Jetpod
            this.passwordArray[10] += 8;
        } else if (index === 3) {
            // Invalid Jetpod
            this.passwordArray[10] += 12;
        }
    }

    /**
     * Handle the shields portion of the password
     * @param {boolean} hasShields - true if shields, false if not
     */
    handleShields(hasShields) {
        if (hasShields) {
            this.passwordArray[10] += 2;
        }
    }

    /**
     * Handle the thrusters portion of the password
     * @param {boolean} hasThrusters - true if thrusters, false if not
     */
    handleThrusters(hasThrusters) {
        if (hasThrusters) {
            this.passwordArray[10] += 1;
        }
    }

    /**
     * Handle the lives portion of the password
     * @param {number} lives - The number of lives 0-15
     */
    handleLives(lives) {
        this.passwordArray[0] += lives;
    }

    /**
     * Handle the level portion of the password
     * @param {number} levelIndex - The index of the level selected from the form
     */
    handleLevel(levelIndex) {
        this.passwordArray[2] = Math.floor(levelIndex / 4);
        this.passwordArray[8] = (levelIndex % 4) * 4;
    }

    /**
     * Handle the map portion of the password
     * @param {number} mapIndex - The map type index
     */
    handleMap(mapIndex) {
        if (mapIndex === 1) {
            this.passwordArray[8] += 1;
        } else if (mapIndex === 2) {
            this.passwordArray[8] += 2;
        } else if (mapIndex === 3) {
            this.passwordArray[8] += 3;
        }
    }

    /**
     * Calculate the checksum for the password
     */
    calculateChecksum() {
        this.passwordArray[9] = (((this.passwordArray[6] ^ this.passwordArray[7]) + this.passwordArray[8]) ^ this.passwordArray[10]) + this.passwordArray[11];
        this.passwordArray[3] = ((((this.passwordArray[0] ^ this.passwordArray[1]) + this.passwordArray[2]) ^ this.passwordArray[4]) + this.passwordArray[5] + Math.floor(this.passwordArray[9] / 16));
        this.passwordArray[9] += (this.passwordArray[3] >= 16) ? 1 : 0;
        this.passwordArray[3] %= 16;
        this.passwordArray[9] %= 16;
    }

    /**
     * Generate the password
     * @returns {string} The generated password
     */
    generateCode() {
        this.calculateChecksum();
        
        let passcode = '';
        for (let i = 0; i < this.passwordArray.length; i++) {
            passcode += this.passwordCharArray[this.passwordArray[i]];
        }
        return passcode;
    }
}
