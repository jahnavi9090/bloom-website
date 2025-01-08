// Initialize EmailJS
(function() {
    // Replace with your EmailJS user ID
    emailjs.init("PWP6NJliFBEiirczR");
})();

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    emailjs.send('gmail', 'template_ehxgfsa', formData)
        .then(function(response) {
            // Show success message
            showAlert('success', 'Message sent successfully! We\'ll get back to you soon.');
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            // Show error message
            showAlert('danger', 'Oops! Something went wrong. Please try again later.');
        })
        .finally(function() {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
});

// Newsletter Form Handling
document.querySelector('.newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    // Here you would typically send this to your backend or email service
    // For demo, we'll just show a success message
    setTimeout(() => {
        showAlert('success', 'Thank you for subscribing to our newsletter!');
        this.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }, 1000);
});

// Alert Helper Function
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.contact-section .container');
    container.insertBefore(alertDiv, container.firstChild);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}
