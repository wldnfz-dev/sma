import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

var fs = require('fs');
var axios = require('axios');


@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    public sendVerificationEmail(name: string, email: string, role: string, password: string, verification_code: string): void {
        this.mailerService.sendMail({
            to: `${name} <${email}>`,
            subject: `[${process.env.APP_NAME}] - Login Information`,
            template: 'verification', 
            context: {
                name: name,
                email: email,
                role: role,
                password: password,
                verification_code: verification_code,
                urlBase : process.env.DOMAIN_WEBSITE
            },
        })
        .then((success) => {
            console.log(success)
        })
        .catch((err) => {
            console.log(err)
        });
    }

    public sendApprovedMail(name: string, email: string, submission: any, noSp: any): void {
        this.mailerService.sendMail({
            to: `${name} <${email}>`,
            subject: 'Status Pengajuan Anggaran Perjalanan Dinas',
            template: __dirname + './mail/template/approved', 
            context: {
                name: name,
                submission: submission,
                noSp,
                urlBase : process.env.BEOFFICE_FE_URL
            },
        })
        .then((success) => {
            console.log(success)
        })
        .catch((err) => {
            console.log(err)
        });
    }

    public sendPaidMail(name: string, email: string, submission: any, noSp: any, paymentDate: string, paymentReceiptName: string, paymentReceipt): void {
        this.mailerService.sendMail({
            to: `${name} <${email}>`,
            subject: 'Status Pencairan Anggaran Perjalanan Dinas',
            template: __dirname + './mail/template/paid', 
            context: {
                name,
                submission,
                noSp,
                urlBase : process.env.BEOFFICE_FE_URL,
                paymentDate,
            },
            attachments: [{
                filename: paymentReceiptName,
                content: paymentReceipt
            }]
        })
        .then((success) => {
            console.log(success)
        })
        .catch((err) => {
            console.log(err)
        });
    }
}
