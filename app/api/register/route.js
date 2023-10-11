import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';


const prisma = new PrismaClient();

export async function POST(req){
    const body = await req.json();
    const { email, password, name, phoneNumber } = body;
    console.log(body);

    if(!email || !password || !name || !phoneNumber){ 
        return new NextResponse('Please enter your email and password', {status: 400});}

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(exist) return new NextResponse('User already exists with that email.', { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name:name,
            email:email,
            hashedPassword:hashedPassword,
            phoneNumber:phoneNumber
        }
    });

    return NextResponse.json(user);

}