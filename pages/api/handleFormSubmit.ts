import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_APP_PASS,
    },
});

const sendEmail = (req: any) => {
    transporter.sendMail(
        {
            from: process.env.SENDER_EMAIL,
            to: process.env.RECIPIANT_EMAIL,
            subject: req.body.email + ' has submitted a form',
            html: `<table style="border: 1px solid black; border-collapse: collapse; padding: 10px;">
        <tr style="border: 1px solid black; border-collapse: collapse; padding: 10px;">
            <td style="border: 1px solid black; border-collapse: collapse; padding: 10px;">DateTime</td>
            <td style="border: 1px solid black; border-collapse: collapse; padding: 10px;">Email</td>
            <td style="border: 1px solid black; border-collapse: collapse; padding: 10px;">Tel</td>
            <td style="border: 1px solid black; border-collapse: collapse; padding: 10px;">Message</td>
        </tr>
        <tr style="border: 1px solid black; border-collapse: collapse; padding: 10px;">
            <td style="border: 1px solid black; border-collapse: collapse; padding: 10px;">${new Date()
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')}</td>
            <td style="border: 1px solid black; border-collapse: collapse; padding: 10px;">${
                req.body.email
            }</td>
            <td style="border: 1px solid black; border-collapse: collapse; padding: 10px;">${
                req.body.number
            }</td>
            <td style="border: 1px solid black; border-collapse: collapse; padding: 10px;">${
                req.body.message
            }</td>
        </tr>
    </table>`,
        },
        (error: any, info: any) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }
    );
};
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    sendEmail(req);

    res.status(200).json({ message: 'Form submitted successfully' });
}
