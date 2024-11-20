import emailjs from 'emailjs-com';
import './ContactUsComponent.css';

const sendEmail = (e) => {
    e.preventDefault(); // Prevent form refresh

    const form = e.target; // Reference to the form element
    const toName = form.name.value; // Get the value of the "name" input
    const replyTo = form.email.value; // Get the value of the "email" input
    const message = form.message.value; // Get the value of the "message" textarea

    // Sending email using emailjs.send
    emailjs
        .send("service_i19x4ln", "template_jv3neup", {
            from_name: "Isha", // Static value
            to_name: toName, // Dynamic value from form
            reply_to: replyTo, // Dynamic value from form
            user_message: message, // Dynamic message content
        }, '-EJcj8U8XwGP3JJoh') // Public key
        .then((result) => {
            console.log('Email sent successfully:', result.text);
            alert('Your message has been sent successfully!');
            form.reset(); // Optional: Reset the form after submission
        })
        .catch((error) => {
            console.error('Error sending email:', error.text);
            alert('There was an error sending your message. Please try again.');
        });
};

const ContactUsComponent = () => {
    return (
        <form onSubmit={sendEmail}>
            <h2>Contact Us</h2>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required />
            <button type="submit">Send</button>
        </form>
    );
};

export default ContactUsComponent;
