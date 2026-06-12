const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Email credentials missing in environment variables!");
    return null;
  }

  console.log("📨 Initializing Email Transporter with:", process.env.EMAIL_USER);
  
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
};

const sendOrderNotification = async (orderDetails) => {
  try {
    const adminEmail = process.env.EMAIL_USER;
    const customerEmail = orderDetails.email;
    
    const mailTransporter = getTransporter();
    
    if (!mailTransporter || !adminEmail) {
      console.warn("⚠️ Nodemailer is not configured. Skipping emails.");
      return false;
    }

    const htmlContent = `
      <h2>New Order Received!</h2>
      <p><strong>Customer Name:</strong> ${orderDetails.customerName}</p>
      <p><strong>Email:</strong> ${orderDetails.email}</p>
      <p><strong>Phone:</strong> ${orderDetails.phone}</p>
      <p><strong>Address:</strong> ${orderDetails.address}</p>
      <hr />
      <h3>Order Details:</h3>
      <p><strong>Product:</strong> ${orderDetails.productName}</p>
      <p><strong>Weight:</strong> ${orderDetails.weight}</p>
      <p><strong>Quantity:</strong> ${orderDetails.quantity}</p>
      <p><strong>Price per unit:</strong> ₹${orderDetails.price}</p>
      <p><strong>Notes:</strong> ${orderDetails.notes || 'None'}</p>
      <h2><strong>Total: ₹${orderDetails.totalPrice}</strong></h2>
    `;

    const adminInfo = await transporter.sendMail({
      from: `"Cashew Store" <${adminEmail}>`, // sender address
      to: "mathiyazhagan907@gmail.com", // list of receivers (Admin)
      subject: `New Order! [₹${orderDetails.totalPrice}] - ${orderDetails.customerName}`, // Subject line
      html: htmlContent, 
    });

    console.log("Admin notification email sent: %s", adminInfo.messageId);

    if (customerEmail) {
      const customerHtmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #c98a2c;">Thank You for Your Order, ${orderDetails.customerName}! 🌟</h2>
          <p>We are delighted to receive your order for our delicious, premium cashews. Your order is currently being processed with care.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">Order Summary</h3>
            <p><strong>Item:</strong> ${orderDetails.productName} (${orderDetails.weight})</p>
            <p><strong>Quantity:</strong> ${orderDetails.quantity}</p>
            <p><strong>Total Price:</strong> ₹${orderDetails.totalPrice}</p>
          </div>

          <p>We will deliver your fresh cashews to:</p>
          <p style="background-color: #f0f0f0; padding: 10px; border-radius: 4px;"><em>${orderDetails.address}</em></p>

          <p>If you have any questions or need to make changes to your order, simply reply to this email!</p>
          
          <p style="margin-top: 30px;">Warmest Regards,<br><strong>The Cashew Store Team</strong> 🌰</p>
        </div>
      `;

      const customerInfo = await transporter.sendMail({
        from: `"The Cashew Store" <${adminEmail}>`,
        to: customerEmail,
        subject: `Your Cashew Store Order Confirmation! 🌰`,
        html: customerHtmlContent, 
      });

      console.log("Customer notification email sent: %s", customerInfo.messageId);
    }

    return true;
  } catch (error) {
    console.error("Error sending order notification email:", error);
    return false;
  }
};

module.exports = { sendOrderNotification };
