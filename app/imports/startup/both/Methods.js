import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Email } from 'meteor/email'; // Use Meteor's email package
import { check } from 'meteor/check';

const verificationCodes = new Map(); // Store codes temporarily in memory

// Method to send the verification code to the user's email
Meteor.methods({
  sendVerificationCode(email) {
    check(email, String);

    // Generate a random verification code
    const code = Random.hexString(6);
    verificationCodes.set(email, code); // Store the code with the email key

    // Send the email with the verification code
    Email.send({
      to: email,
      from: 'no-reply@example.com', // Configure sender address
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
    });
  },

  // Method to verify the code
  verifyCode({ email, code }) {
    check(email, String);
    check(code, String);

    const storedCode = verificationCodes.get(email);
    if (storedCode === code) {
      verificationCodes.delete(email); // Remove the code after verification
      return true; // Success, correct code entered
    }

    // Throw an error if the code is invalid
    throw new Meteor.Error('invalid-code', 'The verification code is incorrect');
  },
});
