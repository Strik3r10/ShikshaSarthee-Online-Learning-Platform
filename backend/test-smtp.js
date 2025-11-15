import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function testSMTP() {
    console.log("🧪 Testing SMTP Configuration...\n");
    
    console.log("📧 SMTP Email:", process.env.SMTP_EMAIL);
    console.log("🔑 SMTP Pass:", process.env.SMTP_PASS ? "✓ Set (hidden)" : "✗ Not set");
    
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS,
            },
        });
        
        // Verify connection
        await transporter.verify();
        console.log("\n✅ SMTP Connection Successful!");
        console.log("✅ Email service is ready to send emails");
        
        return true;
    } catch (error) {
        console.log("\n❌ SMTP Connection Failed!");
        console.error("Error:", error.message);
        
        if (error.code === "EAUTH") {
            console.log("\n💡 Troubleshooting:");
            console.log("  - Check if app password is correct (16 chars, no spaces)");
            console.log("  - Verify 2-Step Verification is enabled");
            console.log("  - Try generating a new app password");
        }
        
        return false;
    }
}

testSMTP().then(success => {
    process.exit(success ? 0 : 1);
});
