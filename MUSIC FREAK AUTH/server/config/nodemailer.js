import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"sreenathreddyannareddy@gmail.com",
        pass:"Sreen7201"
    }
})


export default transporter;