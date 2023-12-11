import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_APP_PASS,
    },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method != 'POST') {
        res.status(405).send()
        return
    }
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
        }).then(() => {
            res.status(200).send()
        }).catch(() => {
            res.status(500).send()
            return
        });
}
